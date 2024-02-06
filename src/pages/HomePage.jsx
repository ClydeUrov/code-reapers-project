import main from "../icons/main.png";

function Homepage() {
  return (
    <main className="h-[2000px]">
      <div
        id="main"
        className="h-full"
        style={{ backgroundImage: `url(${main})` }}
      >
        <div>
          <div>
            <h1>Благодійний онлайн аукціон</h1>
            <h2>Всі виручені кошти будуть передані на потреби ЗСУ</h2>
          </div>
          <div>
            <button>Створити аукціон</button>
            <button>Перейти до лотів</button>
          </div>
        </div>
      </div>
      <div id="aboutUs"></div>
      <div id="auctions"></div>
    </main>
  );
}

export default Homepage;
