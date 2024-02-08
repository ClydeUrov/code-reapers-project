import { useAuth0 } from "@auth0/auth0-react";
import useAxiosFetch from "../helpers/useAxiosFetch";
import { useEffect, useState } from "react";
import axios from "axios";
import { setUserLS } from "../helpers/localStorage";

const corrUrl =
  "http://ec2-16-170-239-71.eu-north-1.compute.amazonaws.com/auction/api/";

function UserPage() {
  const { user: userAuth0 } = useAuth0();
  const [userData, setUserData] = useState();
  function setUser(data) {
    setUserLS(data);
    setUserData(data);
  }
  const { data: fetchData, isLoading } = useAxiosFetch(
    `users/email/${userAuth0?.email}`,
    setUser,
  );

  useEffect(() => {
    async function registerUserToApi() {
      return await axios
        .post(`${corrUrl}add/user`, {
          name: userAuth0?.name,
          email: userAuth0?.email,
          photoURL: userAuth0?.picture,
        })
        .then((response) => {
          return response.data;
        })
        .catch((err) => console.log(err));
    }

    if (!fetchData?.id && !isLoading)
      registerUserToApi().then((data) => {
        setUser(data);
      });
  }, [
    userAuth0?.name,
    userAuth0?.picture,
    userAuth0?.email,
    isLoading,
    fetchData?.id,
  ]);

  return <div>USER PAGE</div>;
}

export default UserPage;
