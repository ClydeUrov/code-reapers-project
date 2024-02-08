import LoginLogoutBtnHeader from "./LoginLogoutBtnHeader";
import Logo from "../Logo";
import NavigationHeader from "./NavigationHeader";

function Header() {
  return (
    <header
      className="sticky top-0 z-20 flex h-24  w-full items-center
     justify-between bg-gray-50 px-8 py-6 shadow-2xl"
    >
      <Logo />
      <NavigationHeader />
      <LoginLogoutBtnHeader />
    </header>
  );
}

export default Header;
