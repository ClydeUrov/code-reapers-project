import main from '../icons/main.png';

function Homepage() {
  return (
    <main>
      <div id="main" className="w-full h-[1024px] bg-cover" style={{backgroundImage: `url(${main})` }}>
        <div className='flex flex-col space-y-10 w-[650px] h-[700px] ml-40 place-content-around' >
          <div>
            <h1 className='text-6xl'>Благодійний онлайн аукціон</h1>
            <h2 className='text-2xl mt-5'>Всі виручені кошти будуть передані на потреби ЗСУ</h2>
          </div>
          <div className='flex space-x-36 '>
            <button className='px-10 py-2 border border-black rounded-3xl bg-slate-300'>Створити аукціон</button>
            <button className='px-10 py-2 border border-black rounded-3xl bg-slate-300'>Перейти до лотів</button>
          </div>
        </div>
      </div>
      <div id="aboutUs">

      </div>
      <div id="auctions">

      </div>

    </main>
  );
}

export default Homepage;
