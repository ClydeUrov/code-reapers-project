import { IoMdArrowBack } from "react-icons/io";
import React from "react";
import { styledLi } from "../../helpers/tailwindClasses";
import { useNavigate } from "react-router-dom";

function ModalUserHeader({ setShowModal, showModal, modalRef, onLogout }) {
  const navigate = useNavigate();
  function navigateTo(url) {
    setShowModal(false);
    navigate(url);
  }
  return (
    <section
      ref={modalRef}
      className={`absolute right-0 top-24  h-32 ${showModal ? " w-80" : "w-0"} rounded-bl-3xl bg-[#D9D9D9]   duration-300 ease-out ${!showModal && "translate-x-full"} flex justify-between transition-all `}
    >
      {showModal && (
        <>
          <nav>
            <ul className="ml-4 mt-8 space-y-4">
              <li className={styledLi} onClick={() => navigateTo("/profile")}>
                Особисті дані
              </li>
            </ul>
          </nav>
          <span
            className={`${styledLi} mb-4 mr-6 flex items-center gap-2 self-end`}
            onClick={onLogout}
          >
            <i>
              <IoMdArrowBack size={20} />
            </i>
            <span>ВИХІД</span>
          </span>
        </>
      )}
    </section>
  );
}

export default ModalUserHeader;
