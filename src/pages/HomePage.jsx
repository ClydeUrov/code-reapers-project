import main from "../icons/main.png";
import image1 from "../icons/image1.png";
import { MdOutlineUpdate, MdFilterList, MdSearch } from "react-icons/md";
import auctions from "../helpers/auctions.json";
import AuctionList from "../components/AuctionList";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import CreateAuction from "../components/CreateAuction";

function Homepage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main className="mx-auto">
      <div
        id="main"
        className="h-[1024px] w-full bg-cover"
        style={{ backgroundImage: `url(${main})` }}
      >
        <div className="flex h-full w-[850px] flex-col items-start justify-start gap-20">
          <div
            className="flex h-[680px] w-[850px] flex-col items-center justify-center rounded-full"
            style={{
              background: "radial-gradient(#fff 1%, transparent 65%)",
            }}
          >
            <h1 className="w-[520px] text-6xl">Благодійний онлайн-аукціон</h1>
            <h2 className="mt-10 w-[520px] text-2xl">
              Всі виручені кошти будуть передані на потреби ЗСУ
            </h2>
          </div>
          <div className="ml-40 flex space-x-20 justify-self-end">
            <button
              className="h-[70px] w-[280px] rounded-3xl border bg-gray-300 text-2xl hover:bg-gray-400"
              onClick={openModal}
            >
              Створити аукціон
            </button>
            <button className="h-[70px] w-[280px] rounded-3xl border bg-gray-300 text-2xl hover:bg-gray-400">
              Перейти до лотів
            </button>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-[1440px]">
        <div
          id="aboutUs"
          className="mt-32 flex w-full flex-col items-center justify-center "
        >
          <h2 className="m-2 text-4xl" id="aboutUS">
            Про нас
          </h2>
          <p className="my-10 text-2xl">
            Ласкаво просимо на благодійний онлайн-аукціон! <br />
            Наша місія полягає в підтримці соціальних проектів та благочестивих
            ініціатив.
          </p>
          <div className="flex">
            <div className="mr-16 flex flex-col justify-center gap-8">
              <p className="text-2xl">
                Ми створили цей аукціон, щоб збирати кошти для допомоги ЗСУ.
              </p>
              <p className="text-2xl">
                Участь у наших аукціонах - це не тільки можливість отримати
                чудові товари та послуги, але й можливість змінити світ
                назавжди. Долучайтеся до нас у цьому благородному шляху допомоги
                та разом ми зможемо зробити більше для тих, хто потребує нашої
                підтримки.
              </p>
              <p className="ml-10 text-3xl">Дякуємо, що обрали наш аукціон!</p>
            </div>
            <img className="h-[293px] w-[442px]" src={image1} alt="image1" />
          </div>
        </div>
        <h2 className="mt-12 text-center text-5xl">Аукціони</h2>
        <div id="auctions" className="mt-16 flex justify-around">
          <ul className="flex w-1/5 flex-col gap-5">
            <li className="flex items-center text-lg">
              <MdSearch className="text-3xl" />
              <button className="ml-2 w-40 rounded-full border border-gray-400 px-2 py-1 text-gray-400">
                ПОШУК
              </button>
            </li>
            <li className="flex items-center text-lg">
              <MdOutlineUpdate className="text-3xl" />
              <button className="ml-2 w-40 rounded-full border border-gray-400 px-2 py-1 text-gray-400">
                ОНОВИТИ
              </button>
            </li>
            <li className="flex items-center text-lg">
              <MdFilterList className="text-3xl" />
              <button className="ml-2 w-40 rounded-full border border-gray-400 px-2 py-1 text-gray-400">
                ФІЛЬТР
              </button>
            </li>
          </ul>
          <AuctionList auctions={auctions} />
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="relative min-h-[595px] max-h-[700px] w-[1000px] rounded-lg bg-white px-16 py-3">
            <button
              onClick={closeModal}
              className="absolute right-3 top-3 rounded-full p-2 text-slate-600 hover:text-black"
            >
              <RxCross1 className="text-2xl" />
            </button>
            <CreateAuction closeModal={closeModal} />
          </div>
        </div>
      )}
    </main>
  );
}

export default Homepage;
