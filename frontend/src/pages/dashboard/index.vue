<template>
    <div></div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth.store";
import { toRaw } from "vue";

const authStore = useAuthStore();
console.log(toRaw(authStore.$state));
</script>

<style></style>
