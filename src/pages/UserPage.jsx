import { useAuth0 } from "@auth0/auth0-react";
import useAxiosFetch from "../helpers/useAxiosFetch";
import { useEffect, useState } from "react";
import axios from "axios";

const corrUrl = process.env.REACT_APP_API_URL;

function UserPage() {
  const { user } = useAuth0();
  const { data: fetchData, isLoading } = useAxiosFetch(
    `${corrUrl}users/email/${user?.email}`,
  );
  const [userData, setUserData] = useState();

  useEffect(() => {
    async function registerUserToApi() {
      return await axios
        .post(`${corrUrl}users/add/user`, {
          name: user?.name,
          email: user?.email,
          photoURL: user?.picture,
        })
        .then((response) => {
          return response.data;
        })
        .catch((err) => console.log(err));
    }

    if (!fetchData?.id && !isLoading)
      registerUserToApi().then((data) => {
        setUserData(data);
      });
  }, [user?.name, user?.picture, user?.email, isLoading, fetchData?.id]);

  return <div>USER PAGE</div>;
}

export default UserPage;
