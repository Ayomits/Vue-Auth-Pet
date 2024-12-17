import { useAuthStore } from "@/stores/auth.store";
import type {
    NavigationGuardNext,
    RouteLocationNormalized,
    RouteLocationNormalizedLoaded,
} from "vue-router";

export const AuthGuard = async (
    to: RouteLocationNormalized,
    _from: RouteLocationNormalizedLoaded,
    next: NavigationGuardNext
) => {
    const authStore = useAuthStore();
    await authStore.initAuth()
    
};
