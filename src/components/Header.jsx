import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useUserContext } from "../helpers/Context";

function Header() {
  const { setUser, user } = useUserContext();
  console.log(user);

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          { headers: { Authorization: `Bearer ${response.access_token}` } }
        );
        setUser(res.data);
        console.log(res);
      } catch (error) {
        console.error(error.message);
      }
    },
    onError: () => {
      console.log("Login failed");
    },
  });
  return (
    <header className="flex justify-between px-4 py-2">
      <h2>SOMETHING IN HEADER</h2>
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
