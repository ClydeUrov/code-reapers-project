const AuctionList = ({auctions}) => {
  return (
    <div className="grid w-4/5 grid-cols-2 gap-8 " id="auctions-section">
      {auctions.map((item) => (
        <div
          key={item.id}
          className="rounded-lg border border-gray-300 bg-gray-100 p-4 flex flex-col justify-center items-center cursor-pointer"
        >
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <img
            src={item.url}
            alt={item.id}
            className="mt-2 h-56 w-96 object-cover mx-auto rounded-lg"
          />
          <p className="mt-2">Стартова ціна: {item.price} грн</p>
          <p>Дата проведення аукціону: {item.data}</p>
          <p>Статус: <span className={item.status === "Активний" ? 'bg-lime-300' : 'bg-slate-300'}>{item.status}</span></p>
        </div>
      ))}
    </div>
  )
}

export default AuctionList;
