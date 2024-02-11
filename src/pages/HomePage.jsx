import main from "../icons/main.png";
import image1 from "../icons/image1.png";
import { MdOutlineUpdate, MdFilterList, MdSort } from "react-icons/md";
// import auctions from "../helpers/auctions.json";
import AuctionList from "../components/AuctionList";
import { useCallback, useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import CreateAuction from "../components/CreateAuction/CreateAuction";
import { useAuth0 } from "@auth0/auth0-react";
import { getAllAuctions } from "../helpers/api";
import { RotatingLines } from "react-loader-spinner";

const initialActive = {
  nowOpen: false,
  ended: false,
  beginSoon: false,
  sortByCheap: false,
  sortByRich: false,
};

function Homepage() {
  const [auctions, setAuctions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { loginWithRedirect, user } = useAuth0();
  const [loading, setLoading] = useState(false);
  const [sortedAuctions, setSortedAuctions] = useState([]);
  const [activeFilters, setActiveFilters] = useState(initialActive);

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
      setSortedAuctions(data);
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

  function sortByTime() {
    setSortedAuctions(
      auctions
        .filter((e) => e.state === "PREPARING")
        .sort((a, b) => new Date(a.startTime) - new Date(b.startTime)),
    );
    setActiveFilters(() => ({
      ...initialActive,
      beginSoon: true,
    }));
  }

  function sortEnded() {
    setSortedAuctions(auctions.filter((el) => el.state === "CLOSED"));
    setActiveFilters(() => ({
      ...initialActive,
      ended: true,
    }));
  }

  const sortAuctionsByPriceMax = () => {
    setSortedAuctions(
      auctions.slice().sort((a, b) => b.startPrice - a.startPrice),
    );
    setActiveFilters(() => ({
      ...initialActive,
      sortByRich: true,
    }));
  };
  const sortAuctionsByPriceMin = () => {
    setSortedAuctions(
      auctions.slice().sort((a, b) => a.startPrice - b.startPrice),
    );
    setActiveFilters(() => ({
      ...initialActive,
      sortByCheap: true,
    }));
  };

  const filterAuctionsByStatus = () => {
    setSortedAuctions(auctions.filter((e) => e.state === "OPEN"));
    setActiveFilters(() => ({ ...initialActive, nowOpen: true }));
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
          {loading ? (
            <div className="mt-16 flex w-full items-center justify-center">
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
            <>
              <ul className="flex w-1/5 flex-col gap-5">
                <li className="flex items-center text-lg">
                  <MdOutlineUpdate className="text-3xl" />
                  <button
                    className="ml-2 w-40 rounded-full border border-gray-400 px-2 py-1 text-gray-400 hover:border-gray-600 hover:bg-gray-100 hover:text-gray-600"
                    onClick={() => {
                      setSortedAuctions([]);
                      setActiveFilters(initialActive);
                      fetchData();
                    }}
                  >
                    ОНОВИТИ
                  </button>
                </li>
                <li className="flex items-center text-lg">
                  <MdOutlineUpdate className="text-3xl" />
                  <button
                    className="ml-2 w-40 rounded-full border border-gray-400 px-2 py-1 text-gray-400 hover:border-gray-600 hover:bg-gray-100 hover:text-gray-600"
                    onClick={() => {
                      setSortedAuctions(auctions);
                      setActiveFilters(initialActive);
                    }}
                  >
                    СКАСУВАТИ
                  </button>
                </li>

                <li className="flex items-center text-lg">
                  <MdFilterList className="text-3xl" />
                  <button
                    className={`ml-2 w-40 rounded-full border px-2  py-1 hover:bg-gray-100 ${activeFilters.nowOpen ? "border-2 border-gray-600 bg-gray-100 text-gray-600" : "border-gray-400 text-gray-400"}`}
                    onClick={filterAuctionsByStatus}
                  >
                    ВІДКРИТІ
                  </button>
                </li>
                <li className="flex items-center text-lg">
                  <MdFilterList className="text-3xl" />
                  <button
                    className={`ml-2 w-40 rounded-full border  px-2  py-1 hover:bg-gray-100 ${activeFilters.ended ? "border-2 border-gray-600 bg-gray-100 text-gray-600" : "border-gray-400 text-gray-400"}`}
                    onClick={sortEnded}
                  >
                    ЗАВЕРШЕНІ
                  </button>
                </li>
                <li className="flex items-center text-lg">
                  <MdFilterList className="text-3xl" />
                  <button
                    className={`ml-2 w-40 rounded-full border  px-2  py-1 hover:bg-gray-100 ${activeFilters.beginSoon ? "border-2 border-gray-600 bg-gray-100 text-gray-600" : "border-gray-400 text-gray-400"}`}
                    onClick={sortByTime}
                  >
                    НЕЗАБАРОМ
                  </button>
                </li>
                <li className="flex items-center text-lg">
                  <MdSort className="text-3xl" />
                  <button
                    className={`ml-2 w-40 rounded-full border  px-2  py-1 hover:bg-gray-100 ${activeFilters.sortByCheap ? "border-2 border-gray-600 bg-gray-100 text-gray-600" : "border-gray-400 text-gray-400"}`}
                    onClick={sortAuctionsByPriceMin}
                    title="Сортувати аукціони за зростанням ціни"
                  >
                    ЦІНА min/max
                  </button>
                </li>
                <li className="flex items-center text-lg">
                  <MdSort className="text-3xl" />
                  <button
                    className={`ml-2 w-40 rounded-full border  px-2  py-1 hover:bg-gray-100 ${activeFilters.sortByRich ? "border-2 border-gray-600 bg-gray-100 text-gray-600" : "border-gray-400 text-gray-400"}`}
                    onClick={sortAuctionsByPriceMax}
                    title="Сортувати аукціони за спаданням ціни"
                  >
                    ЦІНА max/min
                  </button>
                </li>
              </ul>

              <AuctionList auctions={sortedAuctions} />
            </>
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
