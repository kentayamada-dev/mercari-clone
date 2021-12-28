import React from "react";

type Action =
  | { type: "RESTORE_TOKEN"; token: string }
  | { type: "SIGN_IN"; token: string }
  | { type: "SIGN_OUT" };

type State = {
  isLoading: boolean;
  isSignout: boolean;
  userToken: string;
};

type Props = {
  children: React.ReactNode;
};

const AuthContext = React.createContext(
  {} as { state: State; dispatch: React.Dispatch<Action> }
);

export const AuthProvider: React.VFC<Props> = ({ children }) => {
  const [state, dispatch] = React.useReducer(
    (prevState: State, action: Action): State => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: "",
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: "",
    }
  );
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
