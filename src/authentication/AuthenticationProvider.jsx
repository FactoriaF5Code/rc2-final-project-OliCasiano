import {createContext, useState, useContext} from "react";
import axios from 'axios';


class AuthService {
    async login(user, password) {
        return axios.post("http://localhost:8080/auth/login", {
            email: user,
            password: password
        });
    }
}


const AuthenticationContext = createContext();

export const AuthenticationProvider = ({children}) => {

    // const [session, setSession] = useState({loggedIn: false});
    const [session, setSession] = useState({ loggedIn: false, user: '', password: '' });

    // const login = async (user, password) => {
    //     const authService = new AuthService();

    //     let response = await authService.login(user, password);
    //     if (response.status === 200) {
    //         setSession(response.data);
    //         return true;
    //     }
            
    //     return false;
    // }

    const login = async (user, password) => {
        // Simula una llamada de autenticación
        try {
            let response = await axios.post('http://localhost:8080/auth/login', { email: user, password: password });
            if (response.status === 200) {
                setSession({ loggedIn: true, user: user, password: password });
                return true;
            }
        } catch (error) {
            return false;
        }
    };

    const logout = () => {
        setSession({loggedIn: false});
    }

    // const getAuthenticationHeader = () => {
    //     if (!session || !session.user || !session.password) {
    //         return "";
    //     } else {
    //         return `Basic ${btoa(`${session.user}:${session.password}`)}`;
    //     }
    // }

    const getAuthenticationHeader = () => {
        if (session.loggedIn) {
            return { 'Authorization': 'Basic ' + btoa(`${session.user}:${session.password}`) };
        }
        return {};
    };

    const isLoggedIn = () => session.loggedIn

    const value = {
        login,
        logout,
        isLoggedIn,
        getAuthenticationHeader
    }

    return <AuthenticationContext.Provider value={value}>{children}</AuthenticationContext.Provider>
}

export const useAuthenticationContext = () => useContext(AuthenticationContext);