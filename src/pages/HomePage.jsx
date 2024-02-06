import main from "../icons/main.png";

function Homepage() {
  return (
    <main className='mx-auto'>
      <div
        id="main"
        className="w-full h-[1024px] bg-cover"
        style={{ backgroundImage: `url(${main})` }}
      >
        <div className="flex flex-col w-[850px] h-full justify-start items-start gap-20">
          <div
            className="flex flex-col items-center justify-center w-[850px] h-[680px] rounded-full"
            style={{
              background: "radial-gradient(#fff 1%, transparent 65%)",
            }}
          >
            <h1 className="text-6xl w-[520px]">Благодійний онлайн-аукціон</h1>
            <h2 className="text-2xl mt-10 w-[520px]">
              Всі виручені кошти будуть передані на потреби ЗСУ
            </h2>

          </div>
          <div className="flex justify-self-end space-x-20 ml-40">
            <button className="border w-[280px] h-[70px] text-2xl rounded-3xl bg-gray-300 flex justify-center items-center">
              Створити аукціон
            </button>
            <button className="border w-[280px] h-[70px] text-2xl rounded-3xl bg-gray-300 flex justify-center items-center">
              Перейти до лотів
            </button>
          </div>
        </div>
      </div>
      <div id="aboutUs"></div>
      <div id="auctions"></div>
    </main>
  );
}

export default Homepage;
