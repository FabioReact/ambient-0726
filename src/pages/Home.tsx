import { useAppSelector } from "../redux/hooks";

const Home = () => {
  const accessToken = useAppSelector((state) => state.user.accessToken);
  return (
    <section>
      <h1>Home</h1>
      <p>Access token from redux: {accessToken}</p>
    </section>
  );
};

export default Home;
