import React from 'react';
import config from '../config.json';

const AuthContext = React.createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => { },
  userRole: null,
  setUserRole: (role) => { },
  user: null,
  isSuccess: false,
  setIsSuccess: () => { },
  setUser: () => { },
  login: (username, password) => { },
  logout: () => { }
});

export function AuthContextProvider(props) {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [userRole, setUserRole] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [isSuccess, setIsSuccess] = React.useState(null);


  const loginHandler2 = (username, password) => {
    return new Promise((resolve) => {
      // Dummy credentials
      const dummyDoctorUsername = 'doctor';
      const dummyPatientUsername = 'patient';
      const dummyPassword = 'password';

      // Dummy user data
      const dummyUser = {
        firstName: 'Megha',
        lastName: 'Singh',
        email: 'msingh23@clinic.com',
        age: 27,
        gender: 'female',
        phone: '1234567890',
        additionalData: 'No additional information.',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR04GWDTULmcrO5Gjnf_j-n3whWNEfKKQnChiOWkwidZ9DDgwzDU2SfnLMFQubt4mzwJj8&usqp=CAU'
      };

      if ((username === dummyDoctorUsername || username === dummyPatientUsername) && password === dummyPassword) {
        setIsAuthenticated(true);
        setUser(dummyUser);
        setUserRole(username); // Set role based on the username
      } else {
        console.error('Invalid username or password');
      }
      resolve();
    });
  };

  async function loginHandler(email, password) {
    return new Promise(async (resolve, reject) => {
      try {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
      
        var raw = JSON.stringify({
          "user_email": email,
          "password": password
        });
      
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
      
        const url = `http://${config.ipAddress}:${config.port}/login`;
        const response = await fetch(url, requestOptions);
        const data = await response.json();
        console.log(data);
        
        const curr_user = {
          firstName: data.data.firstName,
          lastName: data.data.lastName,
          email: data.data.email,
          age: data.data.age,
          gender: data.data.gender,
          phone: data.data.phone,
          additionalData: data.data.additionalData,
          img: data.data.img,
          user_id: data.data.user_id,
          role: data.data.role,
          roleId: data.data.roleId          
 
        }
        console.log("user" + curr_user);
        console.log("role" + data.data.role);
        if (response.ok) {
          setIsAuthenticated(true);
          setIsSuccess(data.data.isSuccess);
          setUser(curr_user);
          setUserRole(data.data.role);
          resolve({ status: 'success', user: data.user, role: data.role });
        } else {
          console.error('Login failed:', data.message);
          reject({ status: 'error', message: data.message });
        }
      } catch (error) {
        console.error('Login error:', error);
        reject({ status: 'error', message: 'Network or server error' });
      }
    });
  }
  

  const logoutHandler = () => {
    return new Promise((resolve) => {
      const url = `http://${config.server.ipAddress}:${config.server.port}/logout`;
      const response = fetch(url);

      setIsAuthenticated(false);
      setUserRole('null');

      resolve();
      console.log("logout" + " " + isAuthenticated + " " + userRole);
    });

  };

  function setUserRoleHandler(role) {
    const validRoles = ['patient', 'doctor', 'admin'];
    if (validRoles.includes(role)) {
      setUserRole(role);
    } else {
      console.error(`Invalid role: ${role}. Role should be one of  ${validRoles.join(', ')}`)
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