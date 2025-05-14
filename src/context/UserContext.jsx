import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  //  تحميل المستخدم من localStorage عند أول تحميل للصفحة
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({
          email: decoded.email,
          role: decoded.role,
          token,
        });
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
      }
    }
  }, []);

  const login = (data) => {
    const decoded = jwtDecode(data.token);
    setUser({
      email: decoded.email,
      role: decoded.role,
      token: data.token,
    });
    localStorage.setItem("token", data.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
