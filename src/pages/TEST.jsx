import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { Stomp } from "@stomp/stompjs";
import { getUserLS } from "../helpers/localStorage";

function TEST() {
  const user = getUserLS();

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [nickname, setNickname] = useState("");
  const [stompClient, setStompClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  useEffect(() => {
    const socket = new WebSocket(
      "ws://ec2-16-170-239-71.eu-north-1.compute.amazonaws.com/auction/api/websocket",
    );
    const client = Stomp.over(socket);

    console.log(client);

    client.connect({}, (frame) => {
      console.log("CONECTED", frame);
      client.subscribe(`/bids/auction/20`, (message) => {
        console.log("SUBSCRIBE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ");
        setIsConnected(true);
        const recievedMessage = JSON.parse(message.body);
        console.log(recievedMessage);
        setMessages((prev) => [...prev, recievedMessage]);
      });
      client.send(
        `/app/websocket/20`,
        {},
        JSON.stringify({
          userEmail: user.email,
          bid: 0,
          auctionId: 20,
        }),
      );

      // client.send(`/app/websocket/20`, {}, JSON.stringify(123));
    });

    setStompClient(client);

    return () => {
      client.disconnect();
    };
  }, []);

  const handleNickNameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = () => {
    if (message.trim()) {
      const chatMessage = {
        userEmail: user.email,
        bid: message,
        auctionId: 20,
      };
      console.log(chatMessage);

      // const chatMessage = message;

      stompClient.send(`/app/websocket/20`, {}, JSON.stringify(chatMessage));
      setMessage("");
    }
  };

  console.log(messages);
  if (!isConnected) <h2>Loading...</h2>;

  return (
    <div>
      <ul>
        {messages.map((msg, index) => {
          // console.log(msg, "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

          return (
            <>
              <li key={index}>
                <span>bid:{msg.bid}</span>
                email:{msg.userEmail}
              </li>
            </>
          );
        })}
      </ul>
      <label htmlFor="">NICKNAME</label>
      <input value={nickname} onChange={handleNickNameChange}></input>
      <label htmlFor="">Message</label>

      <input value={message} onChange={handleMessageChange}></input>
      <button onClick={sendMessage}>send</button>
    </div>
  );

  //   let source = new EventSource(
  //     "ws://ec2-16-170-239-71.eu-north-1.compute.amazonaws.com/auction/api/ws-connection",
  //   );

  //   console.log(source);
  //   let socket = new WebSocket(
  //     "ws://ec2-16-170-239-71.eu-north-1.compute.amazonaws.com/auction/api/ws-connection",
  //   );

  //   console.log(socket);

  //   socket.onopen = function (e) {
  //     alert("[open] З’єднання встановлено");
  //     alert("Відправка на сервер");
  //     socket.send("Мене звати Джон");
  //   };

  //   socket.onmessage = function (event) {
  //     alert(`[message] Дані отримані із сервера: ${event.data}`);
  //   };

  //   socket.onclose = function (event) {
  //     if (event.wasClean) {
  //       alert(
  //         `[close] З’єднання закрите чисто, код=${event.code} причина=${event.reason}`,
  //       );
  //     } else {
  //       // наприклад сервер завершив процес або мережа не працює
  //       // у цьому випадку event.code зазвичай дорівнює 1006
  //       alert("[close] З’єднання перервано");
  //     }
  //   };

  //   socket.onerror = function (error) {
  //     alert(`[error]`);
  //   };

  //   const socket = io(
  //     "ws://ec2-16-170-239-71.eu-north-1.compute.amazonaws.com/auction/api/ws-connection",
  //   );

  //   useEffect(() => {
  //     const socket = io(
  //       "ws://ec2-16-170-239-71.eu-north-1.compute.amazonaws.com/auction/api/ws-connection",
  //     );

  //     // Підписка на подію
  //     socket.on(
  //       "ws://ec2-16-170-239-71.eu-north-1.compute.amazonaws.com/auction/api/ws-connection/bids/all",
  //       (data) => {
  //         console.log(data);
  //       },
  //     );

  //     // Надсилання данихбо
  //     socket.emit(
  //       "ws://ec2-16-170-239-71.eu-north-1.compute.amazonaws.com/auction/api/ws-connection/create/bet",
  //       { my: "data" },
  //     );

  //     // Роз'єднання при розмонтуванні компонента
  //     return () => socket.disconnect();
  //   }, []);

  return <div>Мій компонент</div>;
}

export default TEST;
