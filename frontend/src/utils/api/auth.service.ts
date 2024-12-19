import { useAuthStore } from "@/stores/auth.store";
import { AbstractService } from "./abstract.service";
// @ts-ignore
import { AxiosError } from "axios";
// @ts-ignore
import { AxiosResponse } from "axios";

interface AuthDto {
    username: string;
    password: string;
}
interface RevokeDto {
    token: string;
}
interface AuthResponse {
    access_token: string;
    refresh_token: string;
}

class AuthService extends AbstractService {
    private saveToStore(tokens: {
        accessToken?: string;
        refreshToken?: string;
    }) {
        const authStore = useAuthStore();
        authStore.saveTokens(
            tokens.accessToken as string,
            tokens.refreshToken as string
        );
    }

    private async handleAuthResponse(res: AxiosResponse) {
        const { data } = res;

        if (res?.status && [200, 201].includes(res.status)) {
            const { access_token, refresh_token } = data as AuthResponse;
            this.saveToStore({
                accessToken: access_token,
                refreshToken: refresh_token,
            });
        }
        return res;
    }

    async login(dto: AuthDto) {
        const login = await this.axios.post("/auth/login", {
            ...dto,
        });
        return await this.handleAuthResponse(login);
    }
    async register(dto: AuthDto) {
        const register = await this.axios.post("/auth/register", {
            ...dto,
        });
        return await this.handleAuthResponse(register);
    }
    async revoke(dto: RevokeDto) {
        return await this.axios.post("/auth/revoke", { ...dto });
    }
}

export const authService = new AuthService();
