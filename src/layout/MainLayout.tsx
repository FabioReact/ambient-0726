import { NavLink, Outlet, type NavLinkRenderProps } from "react-router";
import { ErrorBoundary } from "../hoc/ErrorBoundary";

const getActiveClassName = ({ isActive }: NavLinkRenderProps) =>
  [
    "inline-flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
    "text-muted-foreground hover:bg-muted hover:text-foreground",
    isActive ? "bg-muted text-foreground" : "",
  ].join(" ");

type Link = {
  to: string;
  label: string;
};

const links: Link[] = [
  { to: "/", label: "Home" },
  { to: "/heroes", label: "Heroes" },
  { to: "/useEffect", label: "Lifecycle" },
  { to: "/search", label: "Search" },
  { to: "/register", label: "Register" },
];

const MainLayout = () => {
  return (
    <>
      <header className="border-b bg-background">
        <nav className="mx-auto max-w-6xl px-4 py-4">
          <ul className="flex items-center gap-2">
            {links.map(({ to, label }) => (
              <li key={label}>
                <NavLink to={to} className={getActiveClassName}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <ErrorBoundary>
      <Outlet />

      </ErrorBoundary>
      <footer>Footer</footer>
    </>
  );
};

export default MainLayout;
