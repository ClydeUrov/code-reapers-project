import main from "../icons/main.png";
import image1 from "../icons/image1.png";

function Homepage() {
  // const byteImageArray = JSON.parse(byteArr.image);

  // // Преобразование массива байтов в Blob
  // const blob = new Blob([new Uint8Array(byteImageArray)], { type: 'image/png' });

  // // Создание URL-адреса из Blob
  // const imageUrl = URL.createObjectURL(blob);

  return (
    <main className="mx-auto">
      {/* <img src={imageUrl} alt="Изображение" /> */}
      <div
        id="main"
        className="h-[1024px] w-full bg-cover"
        style={{ backgroundImage: `url(${main})` }}
      >
        <div className="flex h-full w-[850px] flex-col items-start justify-start gap-20">
          <div
            className="flex h-[680px] w-[850px] flex-col items-center justify-center rounded-full"
            style={{
              background: "radial-gradient(#fff 1%, transparent 65%)",
            }}
          >
            <h1 className="w-[520px] text-6xl">Благодійний онлайн-аукціон</h1>
            <h2 className="mt-10 w-[520px] text-2xl">
              Всі виручені кошти будуть передані на потреби ЗСУ
            </h2>
          </div>
          <div className="ml-40 flex space-x-20 justify-self-end">
            <button className="h-[70px] w-[280px] rounded-3xl border bg-gray-300 text-2xl hover:bg-gray-400">
              Створити аукціон
            </button>
            <button className="h-[70px] w-[280px] rounded-3xl border bg-gray-300 text-2xl hover:bg-gray-400">
              Перейти до лотів
            </button>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-[1440px]">
        <div
          id="aboutUs"
          className="mt-32 flex w-full flex-col items-center justify-center "
        >
          <h2 className="m-2 text-4xl" id="aboutUS">
            Про нас
          </h2>
          <p className="my-10 text-2xl">
            Ласкаво просимо на благодійний онлайн-аукціон! <br />
            Наша місія полягає в підтримці соціальних проектів та благочестивих
            ініціатив.
          </p>
          <div className="flex">
            <div className="mr-16 flex flex-col justify-center gap-8">
              <p className="text-2xl">
                Ми створили цей аукціон, щоб збирати кошти для допомоги ЗСУ.
              </p>
              <p className="text-2xl">
                Участь у наших аукціонах - це не тільки можливість отримати
                чудові товари та послуги, але й можливість змінити світ
                назавжди. Долучайтеся до нас у цьому благородному шляху допомоги
                та разом ми зможемо зробити більше для тих, хто потребує нашої
                підтримки.
              </p>
              <p className="ml-10 text-3xl">Дякуємо, що обрали наш аукціон!</p>
            </div>
            <img className="h-[293px] w-[442px]" src={image1} alt="image1" />
          </div>
        </div>
        <div id="auctions"></div>
      </div>
    </main>
  );
}

export default Homepage;
