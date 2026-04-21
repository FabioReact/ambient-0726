import { NavLink, Outlet, type NavLinkRenderProps } from 'react-router';

const getActiveClassName = ({ isActive }: NavLinkRenderProps) => (isActive ? 'text-red-600' : '');

type Link = {
  to: string;
  label: string;
};

const links: Link[] = [
  { to: '/', label: 'Home' },
  { to: '/heroes', label: 'Heroes' },
  { to: '/useEffect', label: 'Lifecycle' },
];

const MainLayout = () => {
  return (
    <>
      <header>
        <nav>
          <ul>
            {links.map(({ to, label }) => (
              <li>
                <NavLink to={to} className={getActiveClassName}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <Outlet />
      <footer>Footer</footer>
    </>
  );
};

export default MainLayout;
