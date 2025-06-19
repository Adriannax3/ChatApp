import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../axios';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
        try {
            const savedToken = await AsyncStorage.getItem('token');
            if(savedToken) {
                setToken(savedToken);
                const userInfo = await axios.get('/currentUser', {
                    headers: {
                        'Authorization': `Bearer ${savedToken}`
                    },
                });
                setUser(userInfo.data);
                setError(null);
                navigation.navigate('MyAccount');
            }
        } catch (error) {
            setError(error.response.data.message);
        }
    }

    checkToken();
  }, []);

  const login = async (login, password, navigation) => {
    try {
        const res = await axios.post('/userLogin', {
            login,
            password,
        });
        const resToken = res.data.token;
        setToken(resToken);
        await AsyncStorage.setItem('token', resToken);

        const userInfo = await axios.get('/currentUser', {
            headers: {
                'Authorization': `Bearer ${resToken}`
            },
        });
        setUser(userInfo.data);
        setError(null);
    }
    catch(error) {
        if (error.response) {
            console.log("Błąd z backendu:", error.response.data);
            setError(error.response.data.message || "Wystąpił błąd podczas logowania.");
        } else if (error.request) {
            console.log("Brak odpowiedzi od serwera:", error.request);
            setError("Nie udało się połączyć z serwerem.");
        } else {
            console.log("Błąd aplikacji:", error.message);
            setError("Wystąpił nieoczekiwany błąd.");
        }
    }
  };

  const logout = async (navigation) => {
    try {
      await axios.post('/logoutUser', null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (e) {
      console.log("Błąd przy wylogowaniu:", e);
    }
  
    await AsyncStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setError(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
