import getImage from "../helpers/bitToImg";

const AuctionList = ({auctions}) => {
  return (
    <div className="grid w-4/5 grid-cols-2 gap-8 " id="auctions-section">
      {auctions.map((item) => (
        <div
          key={item.id}
          className="rounded-lg border border-gray-300 bg-gray-100 p-4 flex flex-col justify-center items-center cursor-pointer"
        >
          <h3 className="text-2xl font-semibold mb-2">
            {item.title.length > 25 ? `${item.title.substring(0, 25)}...` : item.title}
          </h3>
          {item.photos.length > 0 && (
            <img
              src={getImage(item.photos[0].image)}
              alt={item.id}
              className="mt-2 h-52 w-80 object-cover mx-auto rounded-lg"
            />
          )}
          <p className="mt-2">Стартова ціна: {item.startPrice} грн</p>
          <p>Дата проведення аукціону: {item.startTime}</p>
          <p>Статус: <span className={item.state === "PREPARING" ? 'bg-lime-300' : 'bg-slate-300'}>{item.state}</span></p>
        </div>
      ))}
    </div>
  )
}

export default AuctionList;
