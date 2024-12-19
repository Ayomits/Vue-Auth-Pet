import { useAuthStore } from "@/stores/auth.store";
import { Routes } from "@/utils/other/Routes";
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
    await authStore.initAuth();
    if (
        authStore.isAuth &&
        [Routes.auth.login, Routes.auth.register].includes(to.path)
    ) {
        return next(Routes.dashboard.main);
    }

    if (!authStore.isAuth && to.path !== Routes.auth.login) {
        return next(Routes.auth.login);
    }
    return next();
};
