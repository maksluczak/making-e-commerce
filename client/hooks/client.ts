class ApiClient {
    private API_URL: string = "http://localhost:8080/api/v1";

    private async handleResponse<T>(response: Response): Promise<T> {
        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.message);
        }

        if (response.status === 204) {
            return undefined as T;
        }

        return await response.json() as T;
    }

    async get<T>(endpoint: string): Promise<T> {
        const response = await fetch(`${this.API_URL}${endpoint}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });
        return this.handleResponse<T>(response);
    }

    async post<T>(endpoint: string, data?: unknown): Promise<T> {
        const response = await fetch(`${this.API_URL}${endpoint}`, {
            method: "POST",
            body: data ? JSON.stringify(data) : undefined,
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });
        return this.handleResponse<T>(response);
    }

    async put<T>(endpoint: string, data?: unknown): Promise<T> {
        const response = await fetch(`${this.API_URL}${endpoint}`, {
            method: "PUT",
            body: data ? JSON.stringify(data) : undefined,
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });
        return this.handleResponse<T>(response);
    }

    async delete<T>(endpoint: string, data?: unknown): Promise<T> {
        const response = await fetch(`${this.API_URL}${endpoint}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });
        return this.handleResponse<T>(response);
    }
}

export const apiClient = new ApiClient();
