import { BrowserRouter, Routes, Route } from "react-router";
// import HeroesList from "./pages/HeroesList/HeroesList";
import Home from "./pages/Home";
import MainLayout from "./layout/MainLayout";
import Lifecycle from "./pages/Lifecycle";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchHeroes from "./pages/SearchHeroes";
import Register from "./pages/Register/Register";
import ShareData from "./pages/Learning/ShareData";
import UserContext from "./context/user-context";
import Profile from "./pages/Profile";
import { lazy, Suspense, useState } from "react";
import Login from "./pages/Login/Login";
import PrivateRoute from "./hoc/PrivateRoute";
import Battle from "./pages/Battle/Battle";

const queryClient = new QueryClient();

const HeroesList = lazy(() => import("./pages/HeroesList/HeroesList"));
const Optimization = lazy(() => import("./pages/Learning/Optimization"));

// Lorsque l'utilisateur se register ou se login, mettre à l'email, mettre à jour l'accessToken, et ajouter un boolean 'isConnected' à notre userContext, initialisé à false, et qui passe à true lors du register/login

const App = () => {
  const [email, setEmail] = useState("exemple@email.com");
  const [accessToken, setAccessToken] = useState("secret");
  const [isConnected, setIsConnected] = useState(false);

  const loginUser = (newEmail: string, newAccessToken: string) => {
    setEmail(newEmail);
    setAccessToken(newAccessToken);
    setIsConnected(true);
  };

  const initialUserContextValues = {
    accessToken,
    email,
    isConnected,
    loginUser,
  };

  return (
    <UserContext.Provider value={initialUserContextValues}>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<p>Loading...</p>}>
          <BrowserRouter>
            <Routes>
              <Route element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="/heroes" element={<HeroesList />} />
                <Route path="/optimization" element={<Optimization />} />
                <Route path="/battle" element={<Battle />} />
                <Route path="/useEffect" element={<Lifecycle />} />
                <Route path="/search" element={<SearchHeroes />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/share-data" element={<ShareData />} />
                <Route element={<PrivateRoute />}>
                  <Route path="/profile" element={<Profile />} />
                </Route>
                <Route path="*" element={<p>404</p>} />
              </Route>
            </Routes>
          </BrowserRouter>
        </Suspense>
      </QueryClientProvider>
    </UserContext.Provider>
  );
};

export default App;
