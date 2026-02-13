"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { User, JwtPayload, RefreshResponse } from "@/types/auth.types";
import { apiClient } from "@/hooks/client";

type AuthContextType = {
    user: User | null;
    login: (token: string) => void;
    logout: () => Promise<void>;
    isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    const setUserFromToken = (token: string) => {
        try {
            const decoded = jwtDecode<JwtPayload>(token);
            setUser({ id: decoded._id, email: decoded.email });
        } catch (err) {
            console.error("Błąd dekodowania tokena:", err);
            setUser(null);
            deleteCookie("access_token");
        }
    };

    const refreshAccessToken = async () => {
        try {
            const response = await apiClient.post<RefreshResponse>("/auth/refresh");

            login(response.accessToken, false);
        } catch (err) {
            console.error("Błąd odświeżania tokena", err);
        }
    };

    useEffect(() => {
        const savedToken = getCookie("access_token");
        if (savedToken) {
            setUserFromToken(savedToken as string);
        }

        const interval = setInterval(
            () => {
                if (getCookie("access_token")) {
                    refreshAccessToken();
                }
            },
            14 * 60 * 1000,
        );

        return () => clearInterval(interval);
    }, []);

    const login = (token: string, shouldRedirect = true) => {
        setCookie("access_token", token, {
            maxAge: 15 * 60,
            path: "/",
            sameSite: "lax",
        });

        setUserFromToken(token);

        if (shouldRedirect) {
            router.push("/");
        }
        router.refresh();
    };

    const logout = async () => {
        try {
            await apiClient.post<void>("/auth/logout");
        } catch (err) {
            console.error("Backend logout error:", err );
        } finally {
            deleteCookie("access_token", { path: "/" });
            setUser(null);

            router.push("/logowanie");
            router.refresh();
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }} >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
}
