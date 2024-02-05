import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="flex flex-col gap-2 text-[3rem] items-center">
      <h3>404 NOT FOUND</h3>
      <Link to="/" className="border-solid border-4 px-2 py-1">
        Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
