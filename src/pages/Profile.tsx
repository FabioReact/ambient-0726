import { useContext } from "react";
import UserContext from "../context/user-context";

const Profile = () => {
  const { email, accessToken, loginUser } = useContext(UserContext);

  return (
    <section>
      <h1>Profile</h1>
      <p>Email: {email}</p>
      <p>AccessToken: {accessToken}</p>
      <button onClick={() => loginUser("fabio@email.com")}>Update email</button>
    </section>
  );
};

export default Profile;
