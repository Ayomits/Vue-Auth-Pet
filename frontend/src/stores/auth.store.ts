import { authService } from "@/utils/api/auth.service";
import { TOKEN_KEY } from "@/utils/other/Constants";
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
            if (!tokensFromLocalstorage) {
                this.clearTokens();
                return;
            }

            const { access_token, refresh_token } = JSON.parse(
                tokensFromLocalstorage
            ) as { access_token: string; refresh_token: string };
            this.accessToken = access_token;
            this.refreshToken = refresh_token;

            try {
                const newAccessToken = await this.revoke();
                if (newAccessToken) {
                    this.isAuth = true;
                } else {
                    this.clearTokens();
                }
            } catch {
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

        saveTokens(accessToken?: string, refreshToken?: string) {
            if (accessToken) {
                this.accessToken = accessToken;
            }
            if (refreshToken) {
                this.refreshToken = refreshToken;
            }

            localStorage.setItem(
                TOKEN_KEY,
                JSON.stringify({
                    access_token: this.accessToken,
                    refresh_token: this.refreshToken,
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
