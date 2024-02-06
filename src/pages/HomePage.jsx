import main from '../icons/main.png';
import image1 from '../icons/image1.png';


function Homepage() {
  // const byteImageArray = JSON.parse(byteArr.image);

  // // Преобразование массива байтов в Blob
  // const blob = new Blob([new Uint8Array(byteImageArray)], { type: 'image/png' });

  // // Создание URL-адреса из Blob
  // const imageUrl = URL.createObjectURL(blob);

  return (
    <main className='mx-auto'>
      {/* <img src={imageUrl} alt="Изображение" /> */}
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
            <button className="border w-[280px] h-[70px] text-2xl rounded-3xl bg-gray-300 hover:bg-gray-400">
              Створити аукціон
            </button>
            <button className="border w-[280px] h-[70px] text-2xl rounded-3xl bg-gray-300 hover:bg-gray-400">
              Перейти до лотів
            </button>
          </div>
        </div>
      </div>
      <div id="aboutUs" className="flex flex-col w-full items-center justify-center mt-32 ">
        <h2 className="text-4xl m-2">Про нас</h2>
        <p className="text-2xl my-10">
          Ласкаво просимо на благодійний онлайн-аукціон! <br/>
          Наша місія полягає в підтримці соціальних проектів та благочестивих ініціатив. 
        </p>
        <div className='flex'>
          <div className='flex flex-col gap-8 mr-16 justify-center'>
            <p className="text-2xl">
              Ми створили цей аукціон, щоб збирати кошти для допомоги ЗСУ.
            </p>
            <p className="text-2xl">
              Участь у наших аукціонах - це не тільки можливість отримати чудові товари 
              та послуги, але й можливість змінити світ назавжди. Долучайтеся до нас у 
              цьому благородному шляху допомоги та разом ми зможемо зробити більше для 
              тих, хто потребує нашої підтримки. 
            </p>
            <p className='text-3xl ml-10'>Дякуємо, що обрали наш аукціон!</p>
          </div>
          <img className='w-[442px] h-[293px]' src={image1} alt="image1"/>
        </div>
      </div>
      <div id="auctions"></div>
    </main>
  );
}

export default Homepage;
