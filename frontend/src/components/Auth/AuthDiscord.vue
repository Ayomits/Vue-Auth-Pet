<template>
    <img :width="props.width" src="@/assets/discord.svg" alt="" />
</template>

<script lang="ts" setup>
const props = defineProps<{
    width: number;
}>();
</script>

<style></style>
