<template>
    <div></div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth.store";

const authStore = useAuthStore();
console.log(authStore.$state);
</script>

<style></style>
