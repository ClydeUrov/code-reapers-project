import { useState } from "react";
import CreateAuction from "../CreateAuction/CreateAuction";
import { RxCross1 } from "react-icons/rx";

function BtnCreateAuction() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <button
        className="mr-6 mt-8 rounded-full bg-gray-900/[0.5] px-6 py-2 text-2xl text-gray-50 hover:bg-gray-900/[0.65] "
        onClick={openModal}
      >
        Створити аукціон
      </button>
      {isModalOpen && (
        <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="relative max-h-[700px] min-h-[595px] w-[1000px] rounded-lg bg-white px-16 py-3">
            <button
              onClick={closeModal}
              className="absolute right-3 top-3 rounded-full p-2 text-slate-600 hover:text-black"
            >
              <RxCross1 className="text-2xl" />
            </button>
            <CreateAuction closeModal={closeModal} />
          </div>
        </div>
      )}
    </>
  );
}

export default BtnCreateAuction;
