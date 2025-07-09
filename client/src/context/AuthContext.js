import React, { createContext, useState, useEffect } from 'react';
import { login, verifyToken } from '../api';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('AuthContext: Initializing useEffect');
    const initializeAuth = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        console.log('AuthContext: storedUser:', storedUser);
        console.log('AuthContext: storedToken:', storedToken);

        if (storedUser && storedToken && storedUser !== 'undefined' && storedToken !== 'undefined') {
          const parsedUser = JSON.parse(storedUser);
          const response = await verifyToken(storedToken);
          if (response.error) {
            throw new Error(response.error);
          }
          setUser(parsedUser);
          setToken(storedToken);
          console.log('AuthContext: Token verified, user set:', parsedUser);
        } else {
          console.log('AuthContext: No valid user/token in localStorage');
          localStorage.removeItem('user');
          localStorage.removeItem('token');
        }
      } catch (error) {
        console.error('AuthContext: Error in useEffect:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
        setToken(null);
        if (error.message.includes('404')) {
          console.error('AuthContext: verify-token endpoint not found');
        }
      } finally {
        setIsLoading(false);
        console.log('AuthContext: useEffect completed, isLoading:', false);
      }
    };
    initializeAuth();
  }, []);

  const loginUser = async (email, password) => {
    try {
      const response = await login(email, password);
      if (response.error) {
        throw new Error(response.error);
      }
      setUser(response.user);
      setToken(response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('token', response.token);
      console.log('AuthContext: User logged in:', response.user, 'Token:', response.token);
      return response;
    } catch (error) {
      console.error('AuthContext: Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    console.log('AuthContext: Logging out');
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};