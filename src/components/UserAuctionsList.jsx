import { getUserLS } from "../helpers/localStorage";
import useAxiosFetch from "../helpers/useAxiosFetch";

function UserAuctionsList({ type }) {
  const user = getUserLS();
  console.log(user);
  const { data, isLoading } = useAxiosFetch(
    type === "lots" && `auctions/2`,
    // type === "lots" && `auctions/createdBy/${user.email}`,
  );
  console.log(data);

  if (isLoading) return <h3>Loading...</h3>;

  return (
    <div className="grid w-full grid-cols-3 px-8 py-6">
      <section className="flex w-80 flex-col items-center gap-4 border-2 border-solid px-4 py-6">
        <h4 className="mb-4 font-medium">Поштові марки ''Русскій...</h4>
        <img
          src=""
          alt=""
          className="h-32 w-52 rounded-lg border-2 border-solid object-fill"
        />
        <p className="text-sm font-normal">Стартова ціна: 25 000 грн</p>
        <p className="text-sm font-normal">
          Дата проведення аукціону: 22лютого, 14:00
        </p>
        <p className="text-sm font-normal">Кількість учасників</p>
      </section>
      <section className="flex w-80 flex-col items-center gap-4 border-2 border-solid px-4 py-6">
        <h4 className="mb-4 font-medium">Поштові марки ''Русскій...</h4>
        <img
          src=""
          alt=""
          className="h-32 w-52 rounded-lg border-2 border-solid object-fill"
        />
        <p className="text-sm font-normal">Стартова ціна: 25 000 грн</p>
        <p className="text-sm font-normal">
          Дата проведення аукціону: 22лютого, 14:00
        </p>
        <p className="text-sm font-normal">Кількість учасників</p>
      </section>
      <section className="flex w-80 flex-col items-center gap-4 border-2 border-solid px-4 py-6">
        <h4 className="mb-4 font-medium">Поштові марки ''Русскій...</h4>
        <img
          src=""
          alt=""
          className="h-32 w-52 rounded-lg border-2 border-solid object-fill"
        />
        <p className="text-sm font-normal">Стартова ціна: 25 000 грн</p>
        <p className="text-sm font-normal">
          Дата проведення аукціону: 22лютого, 14:00
        </p>
        <p className="text-sm font-normal">Кількість учасників</p>
      </section>
    </div>
  );
}

export default UserAuctionsList;
