import { authService } from "@/utils/api/auth.service";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
    state: () => {
        return {
            accessToken: "",
            refreshToken: "",
        };
    },
    getters: {
        getAccess: (state) => state.accessToken,
        getRefresh: (state) => state.refreshToken,
        getAll: (state) => state,
    },
    actions: {
        async fetchAccess() {
            const token = await authService.revoke({
                token: this.refreshToken,
            });
            if (token.status === 401) {
                this.accessToken = "";
                this.refreshToken = "";
                return false;
            } else {
                const accessToken = (token.data as any).access_token;
                this.accessToken = accessToken;
                return accessToken;
            }
        },

        saveTokens(accessToken: string, refreshToken: string) {
            this.accessToken = accessToken;
            this.refreshToken = refreshToken;
        },
    },
});
