import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef, useState } from "react";
import { FaRegUser } from "react-icons/fa6";
import ModalUserHeader from "./ModalUserHeader";

function LoginLogoutBtnHeader() {
  const { loginWithRedirect, logout, user, isLoading } = useAuth0();
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        if (
          event.target.id !== "account_show_modal_btn" &&
          event.target.parentElement.id !== "account_show_modal_btn"
        ) {
          setShowModal(() => false);
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/profile",
      },
    });
  };

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  if (!isLoading && !user) {
    return (
      <button
        onClick={() => {
          handleLogin();
        }}
        className="hover:shadow-l hover: rounded-2xl border-2 border-solid border-gray-300 px-10  py-2 text-sm   duration-200 ease-in hover:border-gray-600 hover:bg-gray-50"
      >
        ВХІД
      </button>
    );
  } else if (!isLoading && user)
    return (
      <>
        <button
          onClick={() => {
            setShowModal((bol) => !bol);
          }}
          id="account_show_modal_btn"
          className={`hover:shadow-l hover: flex gap-4 rounded-2xl border-2 border-solid ${showModal ? "border-gray-600 bg-gray-50 hover:border-gray-800 hover:bg-gray-100" : "border-gray-300 hover:border-gray-600 hover:bg-gray-50"} px-6  py-2 text-sm   font-semibold text-gray-600 duration-200 ease-in `}
        >
          <FaRegUser size={20} className="text-gray-600" />

          <span>АКАУНТ</span>
        </button>

        <ModalUserHeader
          modalRef={modalRef}
          onShowModal={setShowModal}
          showModal={showModal}
          onLogout={handleLogout}
        />
      </>
    );
}

export default LoginLogoutBtnHeader;
