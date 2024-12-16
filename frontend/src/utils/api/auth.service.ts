import { AbstractService } from "./abstract.service";
// @ts-ignore
import { AxiosError } from "axios";

interface AuthDto {
    username: string;
    password: string;
}
interface RevokeDto {
    token: string;
}

class AuthService extends AbstractService {
    async login(dto: AuthDto) {
        return await this.axios.post("/auth/login", {
            ...dto,
        });
    }
    async register(dto: AuthDto) {
        return await this.axios.post("/auth/register", {
            ...dto,
        });
    }
    async revoke(dto: RevokeDto) {
        return await this.axios.post("/auth/revoke", { ...dto });
    }
}

export const authService = new AuthService();
