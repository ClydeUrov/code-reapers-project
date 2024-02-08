import getImage from "../helpers/bitToImg";

function UserAuctionsList({ type, data = [], isLoading }) {
  return (
    <div className="grid w-full grid-cols-3 gap-y-8 px-8 py-6">
      {data.map((el) => (
        <div className="flex w-full items-center justify-center" key={el.id}>
          <section className="flex h-80 w-80 flex-col items-center gap-2 border-2 border-solid px-4 py-6 [&>p]:break-normal [&>p]:text-sm [&>p]:font-normal ">
            <h4 className="text-l mb-2 font-medium">{el.title}</h4>
            {el.photos.length > 0 && (
              <img
                src={getImage(el.photos[0].image)}
                alt=""
                className="h-32 w-52 rounded-lg border-2 border-solid object-fill"
              />
            )}
            <p>Стартова ціна: {el.startPrice} грн</p>
            <p>Дата проведення аукціону: 22лютого, 14:00</p>
            <p>Кількість учасників</p>
          </section>
        </div>
      ))}
    </div>
  );
}

export default UserAuctionsList;
