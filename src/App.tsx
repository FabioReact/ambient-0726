import { BrowserRouter, Routes, Route } from "react-router";
import HeroesList from "./pages/HeroesList/HeroesList";
import Home from "./pages/Home";
import MainLayout from "./layout/MainLayout";
import Lifecycle from "./pages/Lifecycle";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchHeroes from "./pages/SearchHeroes";
import Register from "./pages/Register/Register";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/heroes" element={<HeroesList />} />
            <Route path="/useEffect" element={<Lifecycle />} />
            <Route path="/search" element={<SearchHeroes />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<p>404</p>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
