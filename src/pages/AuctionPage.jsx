import { useParams } from "react-router-dom";
import auctions from "../helpers/auctions.json";
import SwiperAuctions from "../components/SwiperAuctions";
import useAxiosFetch from "../helpers/useAxiosFetch";
import getImage from "../helpers/bitToImg";
import { useEffect, useMemo, useState } from "react";

function AuctionPage() {
  const { auctionId } = useParams();
  const { data, isLoading } = useAxiosFetch(`auctions/${auctionId}`);
  const [auctionData, setAuctionData] = useState([]);

  useEffect(() => {
    setAuctionData(data);
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

  console.log(auctionData);

  if (isLoading) return <h2>Loading...</h2>;
  return (
    <main className="mx-8 gap-x-14">
      <header className="mb-12 mt-14 h-fit text-center text-3xl font-medium">
        <h1>{auctionData.title}</h1>
      </header>
      <section className="flex w-full justify-center gap-x-8">
        <section className="ml-6 w-2/5 space-y-3 px-6">
          <SwiperAuctions images={memoImg} />
        </section>

        <article className="mt-10 space-y-4">
          <p>Стасус аукціону: {auctionData.state}</p>
          <h3 className="ml-4 text-2xl font-semibold">
            Стартова ціна: {auctionData.startPrice} грн
          </h3>
          <p className="ml-4">
            Дата проведення аукціону: {auctionData.startTime}
          </p>

          {auctionData.description}
        </article>
        <div className=" flex w-full items-center justify-center">
          <button className="mt-8 rounded-full bg-gray-600 px-6 py-2 text-2xl text-gray-50 hover:bg-gray-600/[0.75]">
            Зробити ставку
          </button>
        </div>
      </section>
    </main>
  );
}

export default AuctionPage;
