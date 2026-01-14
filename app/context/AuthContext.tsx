'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '../services/api';
import { jwtDecode } from "jwt-decode";

interface User {
    _id: string;
    email: string;
    role: string;
}

interface JwtPayload {
    sub: string;
    email: string;
    role: string;
    iat?: number;
    exp?: number;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Init auth from local storage
        const storedToken = localStorage.getItem('sanital_token');
        const storedUser = localStorage.getItem('sanital_user');

        if (storedToken) {
            setToken(storedToken);
            if (storedUser) {
                try {
                    setUser(JSON.parse(storedUser));
                } catch (e) {
                    console.error("Failed to parse stored user", e);
                }
            }
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await api.post('/auth/login', { email, password });

            const { access_token } = response.data;
            if (!access_token) {
                throw new Error("No access_token in response");
            }

            // Save token immediately so subsequent requests can use it
            setToken(access_token);
            localStorage.setItem('sanital_token', access_token);

            // 1. Try to get user data from Token
            let userData: User | null = null;
            try {
                const decoded = jwtDecode<JwtPayload>(access_token);

                if (decoded.role) {
                    userData = {
                        _id: decoded.sub || 'unknown',
                        email: decoded.email || email,
                        role: decoded.role
                    };
                }
            } catch (e) {
                console.warn("Token decode failed or incomplete", e);
            }

            // 2. If token lacked role, fetch from UsersController profile endpoint
            if (!userData || !userData.role) {
                try {
                    // Using the endpoint from the provided UsersController: @Get('profile') in @Controller('users')
                    const profileResponse = await api.get('/users/profile');

                    const profileData = profileResponse.data;
                    userData = {
                        _id: profileData.id || profileData._id || 'unknown', // Handle Mongo _id just in case
                        email: profileData.email || email,
                        role: profileData.role || 'user'
                    };
                } catch (profileError) {
                    console.error("Failed to fetch profile:", profileError);
                    // Fallback to basic user
                    userData = {
                        _id: 'unknown',
                        email: email,
                        role: 'user'
                    };
                }
            }

            setUser(userData);
            localStorage.setItem('sanital_user', JSON.stringify(userData));

            // Force hard redirect to ensure state is clear and UI updates
            // Force hard redirect to ensure state is clear and UI updates
            const searchParams = new URLSearchParams(window.location.search);
            const redirectUrl = searchParams.get('redirect');
            window.location.href = redirectUrl || '/';

        } catch (error: any) {
            console.error("Login failed:", error);
            if (error.response) {
                console.error("Server Error Data:", error.response.data);
                console.error("Server Error Status:", error.response.status);
            }
            throw error;
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('sanital_token');
        localStorage.removeItem('sanital_user');
        window.location.href = '/login';
    };

    return (
        <AuthContext.Provider value={{
            user,
            token,
            login,
            logout,
            isAuthenticated: !!token,
            isLoading
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
