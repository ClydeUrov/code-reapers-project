import { useParams } from "react-router-dom";
import SwiperAuctions from "../components/SwiperAuctions";
import useAxiosFetch from "../helpers/useAxiosFetch";
import getImage from "../helpers/bitToImg";
import { useEffect, useMemo, useRef, useState } from "react";
import BetsChat from "../components/BetsChat";

function AuctionPage() {
  const { auctionId } = useParams();
  const { data, isLoading } = useAxiosFetch(`auctions/${auctionId}`);
  const [auctionData, setAuctionData] = useState([]);
  const { data: chatData } = useAxiosFetch(`bets/${auctionId}/all`);
  let dateStart, dateEnd;
  const date = useRef({ dateStart, dateEnd });

  useEffect(() => {
    setAuctionData(data);
    date.current.dateStart = new Date(data.startTime);
    date.current.dateStart = date.current.dateStart.toLocaleString("uk-UA");

    date.current.dateEnd = new Date(data.startTime);
    date.current.dateEnd.setHours(date.current.dateEnd.getHours() + 1);
    date.current.dateEnd = date.current.dateEnd.toLocaleString("uk-UA");
  }, [data]);

  const memoImg = useMemo(() => {
    if (!auctionData.length && !auctionData?.id) return;
    return auctionData.photos.map((el) => {
      if (!el) return el;
      return {
        id: el?.id,
        image: getImage(el?.image),
      };
    });
  }, [auctionData]);

  if (isLoading) return <h2>Loading...</h2>;
  if (!auctionData?.id) return <h2>error</h2>;
  return (
    <main className="mx-8 gap-x-14">
      <header className="mb-12 mt-14 h-fit text-center text-3xl font-medium">
        <h1>{auctionData.title}</h1>
      </header>
      <section className="flex w-full justify-center gap-x-8">

        <section className="ml-6 w-2/5 space-y-3 px-6 ">
          {!!memoImg?.length && <SwiperAuctions images={memoImg} />}
        </section>

        <article className="relative flex flex-col items-stretch justify-center space-y-8 ">
          <p className="absolute left-6 top-2">
            Стасус аукціону: {auctionData.state}
          </p>
          <h3 className="text-center text-2xl font-semibold">
            Стартова ціна: {auctionData.startPrice} грн
          </h3>
          <p className="text-center text-sm">
            Дата проведення аукціону: {date.current.dateStart}
          </p>
          <p className="text-center text-sm">
            Ставки приймаються до: {date.current.dateEnd}
          </p>

          <p className="text-lg">
            <span className="font-medium">Опис: </span>
            {auctionData.description}
          </p>
          <p className="text-lg ">
            <span className="font-medium">Умови отримання лота:</span>
             лот надсилається поштою після повної оплати переможцем вартості,
            визначеної за результатами аукціону. 
          </p>
        </article>
      </section>

      <section className="mt-8">
        {auctionData?.id && auctionData.state !== "PREPARING" && (
          <BetsChat prevMess={chatData} auction={auctionData} />
        )}
      </section>
    </main>
  );
}

export default AuctionPage;
