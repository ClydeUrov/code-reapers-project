import { useAuth0 } from "@auth0/auth0-react";
import useAxiosFetch from "../helpers/useAxiosFetch";
import { useEffect, useState } from "react";
import axios from "axios";
import { removeUserLS, setUserLS } from "../helpers/localStorage";
import { IoMdArrowBack } from "react-icons/io";
import { styledLi } from "../helpers/tailwindClasses";
import UserAuctionsList from "../components/UserPage/UserAuctionsList";
import BtnCreateAuction from "../components/UserPage/BtnCreateAuction";

const corrUrl = process.env.REACT_APP_API_URL;
const corrWSUrl = process.env.REACT_APP_WS_URL;

function UserPage() {
  const { user: userAuth0, logout } = useAuth0();
  const [userData, setUserData] = useState([]);
  const [{ myBetsOpen, myLotsOpen }, setOpenPage] = useState({
    myLotsOpen: true,
    myBetsOpen: false,
  });
  const { data: userDataApi, isLoading } = useAxiosFetch(
    `users/email/${userAuth0?.email}`,
  );

  console.log(userAuth0);

  useEffect(() => {
    async function registerUserToApi() {
      return await axios
        .post(`${corrUrl}users/add/user`, {
          name: userAuth0?.name,
          email: userAuth0?.email,
          photoURL: userAuth0?.picture,
        })
        .then((response) => {
          return response.data;
        })
        .then((data) => {
          setUser(data);
        })
        .catch((err) => console.log(err));
    }

    setUserData(userDataApi);
    setUserLS(userDataApi);

    if (userData === "") registerUserToApi();
  }, [
    userAuth0?.name,
    userAuth0?.picture,
    userAuth0?.email,
    userData,
    userDataApi,
  ]);

  const handleLogout = () => {
    removeUserLS();
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };
  function setUser(data) {
    setUserLS(data);
    setUserData(data);
  }

  if (!userData || isLoading) return <h2>Loading...</h2>;

  return (
    <main>
      <article>
        <header className="mb-12 ml-12 mt-14 flex items-center justify-between px-8 pt-6">
          <h1 className="text-3xl font-normal">Особисті дані</h1>
          <span
            className={`${styledLi} mb-4 mr-6 flex items-center gap-2 self-end`}
            onClick={handleLogout}
          >
            <i>
              <IoMdArrowBack size={20} />
            </i>
            <span>ВИХІД</span>
          </span>
        </header>

        <section className="flex gap-12 bg-gray-200 py-4 pl-16">
          <img
            src={userData.photoURL}
            alt=""
            className="h-40 min-w-32 rounded-md border-solid object-fill shadow-lg"
          />
          <div className="flex flex-col justify-center gap-6 ">
            <span className="rounded-full border-solid bg-gray-50 px-6 py-2">
              {userData.name}
            </span>

            <span className="rounded-full bg-gray-50 px-6 py-2">
              {userData.email}
            </span>
          </div>
        </section>
      </article>
      <div className="mt-6 flex justify-end">
        <BtnCreateAuction />
      </div>

      <section>
        <div className="mt-6 flex w-3/5 justify-around">
          <button
            className={`cursor-default border-b-2 border-b-transparent text-3xl font-normal ${myBetsOpen && " text-gray-300 duration-200 ease-in hover:cursor-pointer hover:border-b-2 hover:border-b-gray-600 hover:text-gray-900"}`}
            onClick={() =>
              setOpenPage(() => ({ myLotsOpen: true, myBetsOpen: false }))
            }
            disabled={myLotsOpen}
          >
            Мої лоти
          </button>
          <button
            className={`cursor-default border-b-2 border-b-transparent text-3xl font-normal ${myLotsOpen && " text-gray-300 duration-200 ease-in hover:cursor-pointer hover:border-b-2 hover:border-b-gray-600 hover:text-gray-900"}`}
            disabled={myBetsOpen}
            onClick={() =>
              setOpenPage(() => ({ myLotsOpen: false, myBetsOpen: true }))
            }
          >
            Мої ставки
          </button>
        </div>
      </section>
      <section className="flex w-full justify-center">
        <UserAuctionsList type={"lots"} />
      </section>
    </main>
  );
}

export default UserPage;
