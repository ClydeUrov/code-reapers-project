import { useEffect, useState } from "react";
import getImage from "../../helpers/bitToImg";
import { getUserLS } from "../../helpers/localStorage";
import useAxiosFetch from "../../helpers/useAxiosFetch";
import { useNavigate } from "react-router";
import { RxCross1 } from "react-icons/rx";
import CreateAuction from "../CreateAuction/CreateAuction";
import Loader from "../Loader";

function UserAuctionsList({ type }) {
  const user = getUserLS();
  const navigate = useNavigate();
  const { data: dataFromApi, isLoading } = useAxiosFetch(
    `auctions/createdBy/${user?.email}`,
  );
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateAuction, setUpdateAuction] = useState({});

  useEffect(() => {
    setData(dataFromApi);
  }, [dataFromApi]);

  const openModal = (el) => {
    setUpdateAuction(el);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="grid w-full grid-cols-3 gap-y-8 px-8 py-6">
      {data.map((el) => {
        return (
          <div
            className=" relative flex w-full items-center justify-center "
            key={el.id}
          >
            <section className="group relative flex h-80 w-80 flex-col items-center gap-2  rounded-lg border-solid border-gray-300  bg-gray-100 px-4 py-6  hover:backdrop-blur-md [&>p]:break-normal [&>p]:text-sm [&>p]:font-normal">
              <div className="invisible absolute left-0 top-0 z-10 flex h-full w-full flex-col items-center justify-center gap-6 rounded-lg bg-gray-500/70 backdrop-blur-[2px] group-hover:visible">
                <button 
                  className="w-3/5 rounded-full bg-slate-900/80 py-2 text-slate-50 hover:bg-slate-800/90"
                  onClick={() => openModal(el)}
                >
                  Редагувати лот
                </button>
                <button
                  className="w-3/5 rounded-full  bg-gray-300/80 py-2 text-slate-50 hover:bg-gray-400/90"
                  onClick={() => navigate(`../auction/${el.id}`)}
                >
                  Переглянути лот
                </button>
              </div>
              <h4 className="text-l mb-2 font-medium peer-hover:bg-gray-900">
                {el.title}
              </h4>
              {el.photos.length > 0 && (
                <img
                  src={getImage(el.photos[0].image)}
                  alt=""
                  className="h-32 w-52 rounded-lg border-2 border-solid object-fill"
                />
              )}
              <p>Стартова ціна: {el.startPrice} грн</p>
              <p>Дата проведення аукціону: {el.startTime}</p>
              <p>Кількість учасників</p>
            </section>
          </div>
        );
      })}
      {isModalOpen && (
        <div className="fixed left-0 top-12 flex h-full w-full items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="relative h-[500px] w-[800px] rounded-lg bg-white px-16">
            <button
              onClick={closeModal}
              className="absolute right-3 top-3 rounded-full p-2 text-slate-600 hover:text-black"
            >
              <RxCross1 className="text-2xl" />
            </button>
            <CreateAuction closeModal={closeModal} auction={updateAuction} />
          </div>
        </div>
      )}
    </div>
  );
}

export default UserAuctionsList;
