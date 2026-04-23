import { createContext, useContext } from "react";

type UserContextType = {
  accessToken: string;
  email: string;
  isConnected: boolean;
  loginUser: (email: string, accessToken: string) => void;
};

// sauvergarder une chaine de caractères, un nombre, un tableau, un objet...
const UserContext = createContext<UserContextType>({
  accessToken: "",
  email: "",
  isConnected: false,
  loginUser: () => {},
});

export const useUserContext = () => useContext(UserContext);

export default UserContext;
// export { UserContext as default, useUserContext };
