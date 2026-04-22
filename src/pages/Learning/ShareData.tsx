import { useState } from "react";

const UserProfile = ({
  theme,
  onSwitchTheme,
}: {
  theme: "light" | "dark";
  onSwitchTheme: (newTheme: "light" | "dark") => void;
}) => {
  const handleSwitchTheme = () => {
    if (theme === "light") onSwitchTheme("dark");
    if (theme === "dark") onSwitchTheme("light");
  };
  return (
    <section>
      <h2>User Profile</h2>
      <p>Theme to use: {theme}</p>
      <button onClick={handleSwitchTheme}>Switch Theme</button>
    </section>
  );
};

const CustomBox = ({ theme }: { theme: "light" | "dark" }) => {
  // Ici, je dois afficher la box approprié par rapport à son theme
  return (
    <div>
      <h2>Bow with theme</h2>
      {theme === "dark" && <div className="bg-black text-white">Dark Box</div>}
      {theme === "light" && <div>Light Box</div>}
    </div>
  );
};

const ShareData = () => {
  // Lifting up state - Remontée d'état
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const onSwitchTheme = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
  };

  return (
    <section>
      <h1>Comment partager une donnée d'un enfant à un parent</h1>
      <UserProfile theme={theme} onSwitchTheme={onSwitchTheme} />
      <CustomBox theme={theme} />
    </section>
  );
};

export default ShareData;
