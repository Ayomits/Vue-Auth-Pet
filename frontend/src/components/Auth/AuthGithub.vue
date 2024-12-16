<template>
    <img :width="props.width" src="@/assets/github.svg" alt="" />
</template>

<script lang="ts" setup>
const props = defineProps<{
    width: number;
}>();
</script>

<style></style>
