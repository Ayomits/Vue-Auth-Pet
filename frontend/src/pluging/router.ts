import { guards } from "@/request/guards";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "vue-router/auto-routes";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

for (const guard of guards) {
    router.beforeEach(guard);
}

export default router;
