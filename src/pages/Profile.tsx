
import { useAppSelector } from "../redux/hooks";

const Profile = () => {
  const { email, accessToken } = useAppSelector(state => state.user)

  return (
    <section>
      <h1>Profile</h1>
      <p>Email: {email}</p>
      <p>AccessToken: {accessToken}</p>
    </section>
  );
};

export default Profile;
