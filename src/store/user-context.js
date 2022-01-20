import { createContext, useState, useEffect } from "react";

const UserContext = createContext({
  loginStatus: 0,
  logIn: () => {},
  logOut: () => {},
  isLoggedIn: () => {},
  signUp: () => {},
  userHash: ""
});

export function UserContextProvider({ children }) {
  const [loginStatus, setLoginStatus] = useState(false);
  const [userHash, setUserHash] = useState("");

  useEffect((username, password)=> {
    if (localStorage.getItem('logged')){
      setLoginStatus(true);
      setUserHash(`${username}-${password}`);
      localStorage.setItem('logged', `${username}-${password}`);
    }

  },[])

  function signUpHandler(username, password) {
    localStorage.setItem(username, password);
    setLoginStatus(true);
    setUserHash(`${username}-${password}`);
    localStorage.setItem('logged', `${username}-${password}`);
  }

  function logInHandler(username, password) {
    if(!localStorage.getItem(username)) {
      console.log('Sem usuário cadastrado');
      return false;
    }
    let pass = localStorage.getItem(username);
    if (pass !== password){
      console.log("senha errada");
      return false;
    }
    setLoginStatus(true);
    setUserHash(`${username}-${password}`);
    localStorage.setItem('logged', `${username}-${password}`);
    return true;
  }

  function logOutHandler() {
    setLoginStatus((prev) => {
      return !prev;
    });
    localStorage.removeItem('logged');
    
  }

  function isLoggedInHandler(user) {
    console.log("Is Logged In");
  }

  const context = {
    loginStatus: loginStatus,
    logIn: logInHandler,
    logOut: logOutHandler,
    isLoggedIn: isLoggedInHandler,
    signUp: signUpHandler,
    userHash: userHash
  };

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
}

export default UserContext;
