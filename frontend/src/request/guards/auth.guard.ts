import { useAuthStore } from "@/stores/auth.store";
import { Routes } from "@/utils/other/Routes";
import { toRaw } from "vue";
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
    console.log(toRaw(authStore.$state));
    if (
        authStore.isAuth &&
        [Routes.auth.login, Routes.auth.register].includes(to.path)
    ) {
        return next(Routes.dashboard.main);
    }

    if (
        !authStore.isAuth &&
        [Routes.auth.login, Routes.auth.register].includes(to.path)
    ) {
        return next();
    }

    if (!authStore.isAuth && to.path !== Routes.auth.login) {
        return next(Routes.auth.login);
    }
    return next();
};
