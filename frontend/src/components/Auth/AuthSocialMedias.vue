<template>
    <div class="flex justify-between">
        <AuthGithub class="cursor-pointer" :width="60" />
        <AuthDiscord class="cursor-pointer" :width="60" />
        <AuthGoogle class="cursor-pointer" :width="60" />
    </div>
</template>

<script lang="ts" setup>
import AuthDiscord from "./AuthDiscord.vue";
import AuthGoogle from "./AuthGoogle.vue";
import AuthGithub from "./AuthGithub.vue";
</script>

<style></style>
