import React from 'react';

const AuthContext = React.createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  userRole: null,
  setUserRole: (role) => {},
  user: null,
  setUser: () => {},
  login: (username, password) => {},
  logout: () => {}
});

export function AuthContextProvider(props) {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [userRole, setUserRole] = React.useState(null);
  const [user, setUser] = React.useState(null);

  const loginHandler = (username, password) => {
    return new Promise((resolve) => {
      const dummyUsername = 'doctor';
      const dummyPassword = 'password';
      // BACKEND LINK: get user data from backend
      const dummyuser = {firstName: 'Megha', lastName: 'Singh', email: 'msingh23@clinic.com', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR04GWDTULmcrO5Gjnf_j-n3whWNEfKKQnChiOWkwidZ9DDgwzDU2SfnLMFQubt4mzwJj8&usqp=CAU'}

      if (username === dummyUsername && password === dummyPassword) {
        setIsAuthenticated(true);
        setUserRole('doctor');
        setUser(dummyuser);
      } else {
        console.error('Invalid username or password');
      }

      resolve();
    });
  };
  
  const logoutHandler = () => {
    return new Promise((resolve) => {
      setIsAuthenticated(false);
      setUserRole('null');

      resolve();
      console.log("logout"+" "+isAuthenticated+" "+userRole);
    });

  };

  function setUserRoleHandler(role) {
    const validRoles = ['patient', 'doctor', 'admin'];
    if (validRoles.includes(role)) {
      setUserRole(role);
    } else {
      console.error(`Invalid role: ${role}. Role should be one of  ${validRoles.join(', ')    }`)
    }
    
  };



  const contextValue = {
    isAuthenticated: isAuthenticated,
    setisAuthenticated: setIsAuthenticated,
    userRole: userRole,
    setUserRole: setUserRoleHandler,
    user: user,
    setUser: setUser,
    login: loginHandler,
    logout: logoutHandler
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
}


export default AuthContext;