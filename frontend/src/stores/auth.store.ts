import { authService } from "@/utils/api/auth.service";
import { TOKEN_KEY } from "@/utils/other/Constants";
import { jwtDecode } from "jwt-decode";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
    state: () => {
        return {
            isAuth: false as boolean,
            accessToken: "" as string | null | undefined,
            refreshToken: "" as string | null | undefined,
        };
    },
    getters: {
        getAccess: (state) => state.accessToken,
        getRefresh: (state) => state.refreshToken,
        getAll: (state) => state,
    },
    actions: {
        async initAuth() {
            const tokensFromLocalstorage = localStorage.getItem(TOKEN_KEY);
            const now = new Date().getTime();
            if (!tokensFromLocalstorage) {
                console.log("Очистка произошло по причине отсутствия токенов");
                this.clearTokens();
                return;
            }

            const { access_token, refresh_token, expires_at } = JSON.parse(
                tokensFromLocalstorage
            ) as {
                access_token: string;
                refresh_token: string;
                expires_at: number;
            };
            if (expires_at * 1_000 < now) {
                console.log("Очистка произошла по причине экспарнутого токена");
                this.clearTokens();
                return;
            }
            this.accessToken = access_token;
            this.refreshToken = refresh_token;

            try {
                const newAccessToken = await this.revoke();
                if (newAccessToken) {
                    this.isAuth = true;
                } else {
                    console.log(
                        "Очистка произошла по причине не ревокнутого токена"
                    );
                    this.clearTokens();
                }
            } catch (er) {
                console.log("Ошибка произошла по причине бекенда пидораса");
                console.error(er);
                this.clearTokens();
            }
        },
        async revoke() {
            if (!this.refreshToken) {
                this.clearTokens();
                return null;
            }

            try {
                const response = await authService.revoke({
                    token: this.refreshToken,
                });
                if (response.status === 401) {
                    this.clearTokens();
                    return null;
                }
                const accessToken = (response.data as any).access_token;
                this.accessToken = accessToken;
                this.saveTokens(accessToken, this.refreshToken);
                return accessToken;
            } catch {
                this.clearTokens();
                return null;
            }
        },

        saveTokens(accessToken: string, refreshToken: string) {
            if (accessToken) {
                this.accessToken = accessToken;
            }
            if (refreshToken) {
                this.refreshToken = refreshToken;
            }
            const expires_at = jwtDecode(refreshToken).exp;
            localStorage.setItem(
                TOKEN_KEY,
                JSON.stringify({
                    access_token: this.accessToken,
                    refresh_token: this.refreshToken,
                    expires_at: expires_at,
                })
            );
        },

        clearTokens() {
            this.isAuth = false;
            this.accessToken = "";
            this.refreshToken = "";
            localStorage.removeItem(TOKEN_KEY);
        },

        setIsAuth(flag: boolean) {
            this.isAuth = flag;
        },

        toggleIsAuth() {
            this.isAuth = !this.isAuth;
        },
    },
});
