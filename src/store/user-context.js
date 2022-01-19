import { createContext, useState } from "react";

const UserContext = createContext({
  //userName: "",
  loginStatus: 0,
  logIn: ()=>{},
  logOut: ()=> {},
  isLoggedIn: () => {}
});

export function UserContextProvider({ children }) {
//  const [userName, setUserName] = useState("");
  const [loginStatus, setLoginStatus] = useState(true);
  
  function logInHandler() {
      setLoginStatus((prev)=> {
          return !prev;
      })
  }

  function logOutHandler() {
    setLoginStatus((prev)=> {
        return !prev;
    })
  }

  function isLoggedInHandler(user) {
    console.log("Is Logged In");
  }

  const context = {
  //  userName: userName,
    loginStatus: loginStatus,
    logIn: logInHandler,
    logOut: logOutHandler,
    isLoggedIn: isLoggedInHandler,
  };

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
}

export default UserContext;
