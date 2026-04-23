import { useContext } from "react";
import UserContext from "../context/user-context";

const Profile = () => {
  const { email, accessToken } = useContext(UserContext);

  return (
    <section>
      <h1>Profile</h1>
      <p>Email: {email}</p>
      <p>AccessToken: {accessToken}</p>
    </section>
  );
};

export default Profile;
