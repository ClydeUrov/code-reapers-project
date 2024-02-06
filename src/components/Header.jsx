import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useUserContext } from "../helpers/Context";
import { setUserLS } from "../helpers/localStorage";

function Header() {
  const { setUser, user } = useUserContext();
  // console.log(user);

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          { headers: { Authorization: `Bearer ${response.access_token}` } }
        );
        setUser(res.data);
        setUserLS(res.data);
      } catch (error) {
        console.error(error.message);
      }
    },
    onError: () => {
      console.log("Login failed");
    },
  });
  return (
    <header className="flex justify-between px-4 py-2 m-3">
      <h2>Picture</h2>
      {user ? (
        <img src={user.picture} alt={user.name[0]} className="h-12" />
      ) : (
        <button
          onClick={login}
          className="rounded-full border-blue-400 border-2 px-4 py-2 border-solid"
        >
          Login with google😜
        </button>
      )}
    </header>
  );
}

export default Header;
