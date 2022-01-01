import React from "react";

type Auth = {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
};

type Props = {
  children: React.ReactNode;
};

const AuthContext = React.createContext({} as Auth);

export const AuthProvider: React.VFC<Props> = ({ children }) => {
  const [token, setToken] = React.useState("");

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
