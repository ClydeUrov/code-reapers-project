import { useParams } from "react-router-dom";
import auctions from "../helpers/auctions.json";
import SwiperAuctions from "../components/SwiperAuctions";

function AuctionPage() {
  const { auctionId } = useParams();
  const auction = auctions[0];
  const images = auctions.slice(0, 4).map((el) => el.url);
  console.log(images);
  console.log(auction);

  return (
    <main className="mx-8 grid auto-rows-min gap-x-14">
      <header className="col-span-2 mb-12 mt-14 h-fit text-center text-3xl font-medium">
        <h1>
          {auction.title} {auction.title}
        </h1>
      </header>
      <section className="col-span-1">
        <SwiperAuctions mainImage={auction.url} images={images} />
        <p>Стартова ціна: {auction.price} грн</p>
        <p>Дата проведення аукціону: {auction.data}</p>
        <button className="rounded-full bg-gray-600 px-6 py-2 text-2xl text-gray-50">
          Зробити ставку
        </button>
      </section>
      <section className="col-span-1 space-y-8">
        <p>
          Фраза, якою захисники острова Зміїний відповіли військовому кораблю
          окупантів, стала квінтесенцією рішучості українців обороняти свою
          землю.
        </p>
        <p>
          Укрпошта прагнула зафіксувати цей момент по-поштовому — випуском
          поштової марки й проведенням спеціального погашення.
        </p>
        <article className="mt-10 space-y-4">
          <h3 className="mb-4 text-center font-bold">Лот включає:</h3>
          <p>
            1. Марковий аркуш «Русскій воєнний корабль, іді … ! Героям слава!»
            (6 марок) з номіналом F; 
          </p>
          <p>
            2. Марковий аркуш «Русскій воєнний корабль, іді … ! Слава Україні!»
            (6 марок) з номіналом W; 
          </p>
          <p>
            3. Конверт «Перший день» зі спецпогашенням з поштовою маркою
            «Русскій воєнний корабль, іді … ! Героям слава!» з номіналом F та
            підписами автора фрази, морського піхотинця Романа Грибова, й
            генерального директора Укрпошти Ігоря Смілянського; 
          </p>
          <p>
            4. Конверт «Перший день» зі спецпогашенням з поштовою маркою
            «Русскій воєнний корабль, іді … ! Героям слава!» з номіналом W та
            підписами автора фрази, морського піхотинця Романа Грибова, й
            генерального директора Укрпошти Ігоря Смілянського; 
          </p>
        </article>
      </section>
    </main>
  );
}

export default AuctionPage;
