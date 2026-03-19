import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 👇 tài khoản gốc
  const defaultUser = {
    email: "thanhdat@gmail.com",
    password: "123456"
  };

  const login = (email, password) => {
    if (
      email === defaultUser.email &&
      password === defaultUser.password
    ) {
      setUser({ email }); // login thành công
    } else {
      alert("Sai tài khoản hoặc mật khẩu");
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};