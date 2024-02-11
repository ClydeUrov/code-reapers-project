import main from "../icons/main.png";
import image1 from "../icons/image1.png";
import { MdOutlineUpdate, MdFilterList, MdSearch, MdSort } from "react-icons/md";
// import auctions from "../helpers/auctions.json";
import AuctionList from "../components/AuctionList";
import { useCallback, useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import CreateAuction from "../components/CreateAuction/CreateAuction";
import { useAuth0 } from "@auth0/auth0-react";
import { getAllAuctions } from "../helpers/api";
import { RotatingLines } from "react-loader-spinner";

function Homepage() {
  const [auctions, setAuctions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { loginWithRedirect, user } = useAuth0();
  const [loading, setLoading] = useState(false);
  const [sortedAuctions, setSortedAuctions] = useState([]);
  const [filteredAuctions, setFilteredAuctions] = useState([]);

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/profile",
      },
    });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllAuctions();
      setAuctions(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  function scrollTo(id) {
    if (document.querySelector(id)) {
      document
        .querySelector(id)
        .scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  const sortAuctionsByPrice = () => {
    if (sortedAuctions) {
      setSortedAuctions([]);
    } else {
      const sorted = [...auctions].sort((a, b) => a.startPrice - b.startPrice);
      setSortedAuctions(sorted);
    }
  };

  const filterAuctionsByStatus = () => {
    if (filteredAuctions) {
      setFilteredAuctions([]);
    } else {
      const filtered = auctions.filter((auction) => auction.status === "OPEN");
      setFilteredAuctions(filtered);
    }
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
              onClick={user ? openModal : handleLogin}
            >
              Створити аукціон
            </button>
            <button
              className="h-[70px] w-[280px] rounded-3xl border bg-gray-300 text-2xl hover:bg-gray-400"
              onClick={() => scrollTo("#auctions")}
            >
              Перейти до лотів
            </button>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-[1440px]" id="aboutUS">
        <div
          id="aboutUs"
          className="mt-32 flex w-full flex-col items-center justify-center "
        >
          <h2 className="m-2 text-4xl">Про нас</h2>
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
        <h2 id="auctions" className="mt-12 text-center text-5xl">
          Аукціони
        </h2>
        <div className="mt-16 flex justify-around">
          <ul className="flex w-1/5 flex-col gap-5">
            <li className="flex items-center text-lg">
              <MdSearch className="text-3xl" />
              <button className="ml-2 w-40 rounded-full border border-gray-400 px-2 py-1 text-gray-400">
                ПОШУК
              </button>
            </li>
            <li className="flex items-center text-lg">
              <MdOutlineUpdate className="text-3xl" />
              <button
                className="ml-2 w-40 rounded-full border border-gray-400 px-2 py-1 text-gray-400"
                onClick={() => { setSortedAuctions([]); setFilteredAuctions([]); fetchData(); }}
              >
                ОНОВИТИ
              </button>
            </li>
            <li className="flex items-center text-lg">
              <MdFilterList className="text-3xl" />
              <button
                className="ml-2 w-40 rounded-full border border-gray-400 px-2 py-1 text-gray-400"
                onClick={filterAuctionsByStatus}
                title="Фільтрувати аукціони за статусом OPEN"
              >
                ФІЛЬТР
              </button>
            </li>
            <li className="flex items-center text-lg">
              <MdSort className="text-3xl" />
              <button
                className="ml-2 w-40 rounded-full border border-gray-400 px-2 py-1 text-gray-400"
                onClick={sortAuctionsByPrice}
                title="Сортувати аукціони за ціною"
              >
                СОРТУВАТИ
              </button>
            </li>
          </ul>
          {loading ? (
            <div className="ml-[400px] w-4/5">
              <div className="text-center">
                <RotatingLines
                  strokeColor="#696969"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="96"
                  visible={true}
                />
              </div>
            </div>
          ) : (
            <AuctionList
              auctions={
                filteredAuctions.length
                  ? filteredAuctions
                  : sortedAuctions.length
                    ? sortedAuctions
                    : auctions
              }
            />
          )}
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed left-0 top-12 flex h-full w-full items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="relative h-[500px] w-[800px] rounded-lg bg-white px-16">
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
