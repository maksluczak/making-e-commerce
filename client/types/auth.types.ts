export interface User {
    id: string;
    email: string;
}

export interface JwtPayload {
    _id: string;
    email: string;
}

export interface RefreshResponse {
    accessToken: string;
}