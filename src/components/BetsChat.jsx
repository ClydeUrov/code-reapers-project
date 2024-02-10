import React, { useEffect, useState } from "react";
import { Stomp } from "@stomp/stompjs";
import { getUserLS } from "../helpers/localStorage";

function BetsChat({ prevMess, auction }) {
  const user = getUserLS();
  const [messages, setMessages] = useState(prevMess);
  const [message, setMessage] = useState("");
  const [stompClient, setStompClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);
  const [isFinish, setIsFinish] = useState(() => {
    let dateEnd = new Date(auction.startTime);
    dateEnd.setHours(dateEnd.getHours() + 1);
    const date = new Date();
    return date >= dateEnd;
  });

  useEffect(() => {
    const checkTime = () => {
      let dateEnd = new Date(auction.startTime);
      dateEnd.setHours(dateEnd.getHours() + 1);
      const date = new Date();

      if (date >= dateEnd) {
        setIsFinish(true);
      }
    };

    // Перевіряємо час кожні 10секунд
    const intervalId = setInterval(checkTime, 10000);

    // Повертаємо функцію для очищення setInterval, коли компонент демонтується
    return () => {
      clearInterval(intervalId);
    };
  }, [auction.startTime]);

  useEffect(() => {
    const socket = new WebSocket(
      "ws://ec2-16-170-239-71.eu-north-1.compute.amazonaws.com/auction/api/websocket",
    );
    const client = Stomp.over(socket);

    client.connect({}, (frame) => {
      client.subscribe(`/bids/auction/${auction.id}`, (message) => {
        setIsConnected(true);
        const recievedMessage = JSON.parse(message.body);

        setMessages((prev) => [recievedMessage, ...prev]);
      });
    });

    setStompClient(client);

    return () => {
      client.disconnect();
    };
  }, [auction.id]);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = () => {
    if (message.trim()) {
      const chatMessage = {
        userEmail: user.email,
        bid: message,
        auctionId: auction.id,
      };

      setMessage("");
      if (chatMessage.bid >= 10000) {
        setError("Sorry, max bet 9999.99");
        return;
      } else if (+chatMessage.bid < auction.startPrice) {
        setError("Your bid must be bigger than start price");
      } else if (
        +chatMessage.bid > +messages[0]?.bid ||
        (messages.length === 0 && +chatMessage.bid >= auction.startPrice)
      ) {
        stompClient.send(
          `/app/websocket/${auction.id}`,
          {},
          JSON.stringify(chatMessage),
        );
        setError("");
      } else {
        setError("Your bid must be bigger than previous");
      }
    }
  };

  console.log(messages);

  if (!isConnected) <h2>Loading...</h2>;

  if (!messages.length && auction.state === "CLOSED") {
    return (
      <h2 className="text-center text-2xl font-semibold">
        AUCTION WAS FINISHED WITHOUT WINNER
      </h2>
    );
  }

  if (
    (isFinish && messages.length) ||
    (auction.status === "CLOSED" && messages.length)
  ) {
    return (
      <div>
        <h2 className="text-center text-2xl font-semibold">
          This auction finished
        </h2>
        <p className="text-center text-lg font-medium">
          Winner: {messages[0].userEmail}
        </p>
        <p className="text-center text-lg font-medium">
          Winning bid: {messages[0].bid}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-20">
      <h2 className="mb-4 h-4 text-center text-red-500"> {error}</h2>
      <div className="mb-12 flex items-center justify-center gap-12">
        <div className="flex items-center justify-center gap-4">
          <label htmlFor="bidInput">Ставка:</label>
          <input
            type="number"
            name="bidInput"
            placeholder="0,00"
            id="bidInput"
            className={`rounded-xl border border-gray-300 px-4 py-2 text-gray-300 focus:border-gray-500 focus:text-gray-500 `}
            value={message}
            onChange={handleMessageChange}
          />
          <span>грн.</span>
        </div>
        <div className=" flex items-center justify-center">
          <button
            className="rounded-full bg-gray-600 px-6 py-2 text-2xl text-gray-50 hover:bg-gray-600/[0.75]"
            onClick={sendMessage}
          >
            Зробити ставку
          </button>
        </div>
      </div>
      <h2 className="text-center text-2xl font-semibold">Історія ставок</h2>
      <ul className="mt-8 w-full  [&>li:nth-child(even)]:bg-gray-100 [&>li:nth-child(odd)]:bg-gray-300 [&>li]:py-6">
        <li className="grid grid-cols-3 text-xl font-medium [&>*]:text-center ">
          <span>Дата</span>
          <span>Учасник</span>
          <span>Ставка</span>
        </li>
        {messages.map((msg) => {
          return (
            <li key={msg.id} className="grid grid-cols-3 [&>*]:text-center">
              <span>{new Date(msg.betTime).toLocaleString("uk-UA")}</span>
              <span>{msg.userEmail}</span>
              <span>{msg.bid}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default BetsChat;
