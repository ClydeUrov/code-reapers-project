import { useNavigate } from "react-router";
import getImage from "../helpers/bitToImg";

const AuctionList = ({ auctions }) => {
  const navigate = useNavigate();
  return (
    <>
      {auctions ? (
        <div className="grid w-4/5 grid-cols-2 gap-8 " id="auctions-section">
          {auctions.map((item) => (
            <div
              key={item.id}
              className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-gray-300 bg-gray-100 p-4"
              onClick={() => navigate(`../auction/${item.id}`)}
            >
              <h3 className="mb-2 text-2xl font-semibold">
                {item.title.length > 25
                  ? `${item.title.substring(0, 25)}...`
                  : item.title}
              </h3>
              {item.photos.length > 0 && (
                <img
                  src={getImage(item.photos[0].image)}
                  alt={item.id}
                  className="mx-auto mt-2 h-52 w-80 rounded-lg object-cover"
                />
              )}
              <p className="mt-2">Стартова ціна: {item.startPrice} грн</p>
              <p>
                Дата проведення аукціону:{" "}
                {new Date(item.startTime).toLocaleString("ua-UK")}
              </p>
              <p>
                Статус:{" "}
                <span
                  className={`rounded-e border-double ${
                    item.state === "PREPARING"
                      ? "bg-orange-300"
                      : item.state === "OPEN"
                        ? "bg-lime-300"
                        : item.state === "CLOSED"
                          ? "bg-red-300"
                          : ""
                  }`}
                >
                  {item.state}
                </span>
              </p>
            </div>
          ))}
        </div>
      ) : (
        <h3 className="mb-2 w-full text-center text-2xl font-semibold">
          Нажаль зараз список аукціонів порожній.
        </h3>
      )}
    </>
  );
};

export default AuctionList;
