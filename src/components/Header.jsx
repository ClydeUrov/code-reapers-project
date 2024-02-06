import { useAuth0 } from "@auth0/auth0-react";

function Header() {
  const { loginWithRedirect, logout, user, isLoading } = useAuth0();

  return (
    <header className="flex justify-between px-4 py-2">
      <h2>Picture</h2>
      {!isLoading && !user && (
        <button
          onClick={() => {
            loginWithRedirect();
          }}
          className="rounded-full border-blue-400 border-2 px-4 py-2 border-solid"
        >
          Login
        </button>
      )}
      {!isLoading && user && (
        <button
          onClick={() => logout()}
          className="rounded-full border-blue-400 border-2 px-4 py-2 border-solid"
        >
          Logout
        </button>
      )}
    </header>
  );
}

export default Header;
