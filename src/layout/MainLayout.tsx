import { NavLink, Outlet, type NavLinkRenderProps } from "react-router";
import { ErrorBoundary } from "../hoc/ErrorBoundary";
import { ToastContainer } from "react-toastify";
import { useUserContext } from "../context/user-context";
import Footer from "@components/Footer";

const getActiveClassName = ({ isActive }: NavLinkRenderProps) =>
  [
    "border-b-2 hover:text-gray-800 transition-colors duration-300 transform dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6",
    isActive ? "border-blue-500" : "border-transparent",
  ].join(" ");

type Link = {
  to: string;
  label: string;
  visibility: LinkVisibility;
};

enum LinkVisibility {
  PUBLIC = "PUBLIC",
  AUTHENTICATED = "AUTHENTICATED",
  NOT_AUTHENTICATED = "NOT_AUTHENTICATED",
}

const links: Link[] = [
  { to: "/", label: "Home", visibility: LinkVisibility.PUBLIC },
  { to: "/heroes", label: "Heroes", visibility: LinkVisibility.PUBLIC },
  { to: "/battle", label: "Battle", visibility: LinkVisibility.PUBLIC },
  { to: "/useEffect", label: "Lifecycle", visibility: LinkVisibility.PUBLIC },
  { to: "/search", label: "Search", visibility: LinkVisibility.PUBLIC },
  { to: "/register", label: "Register", visibility: LinkVisibility.NOT_AUTHENTICATED },
  { to: "/login", label: "Login", visibility: LinkVisibility.NOT_AUTHENTICATED },
  { to: "/profile", label: "Profile", visibility: LinkVisibility.AUTHENTICATED },
];

const MainLayout = () => {
  const { isConnected } = useUserContext();

  const filteredLinks = links.filter((link) => {
    if (link.visibility === LinkVisibility.PUBLIC) return true;
    if (link.visibility === LinkVisibility.AUTHENTICATED && isConnected) return true;
    if (link.visibility === LinkVisibility.NOT_AUTHENTICATED && !isConnected) return true;
    return false;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <nav className="mx-auto max-w-6xl px-4">
          <ul className="container flex items-center justify-center p-2 mx-auto text-gray-600 capitalize dark:text-gray-300">
            {filteredLinks.map(({ to, label }) => (
              <li key={label}>
                <NavLink to={to} className={getActiveClassName}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main className="grow">
        <ErrorBoundary>
          <ToastContainer />
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
