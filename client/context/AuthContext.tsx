"use client";
import {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
} from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { User, JwtPayload } from "@/types/auth.types";

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
            const response = await fetch(
                "http://localhost:8080/api/v1/auth/refresh",
                {
                    method: "POST",
                    credentials: "include",
                },
            );

            if (!response.ok) {
                await logout();
                return;
            }

            const { accessToken } = await response.json();
            login(accessToken, false);
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
            await fetch("http://localhost:8080/api/v1/auth/logout", {
                method: "POST",
                credentials: "include",
            });
        } catch (err) {
            console.error("Backend logout error (prawdopodobnie brak endpointu):", err );
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
};
