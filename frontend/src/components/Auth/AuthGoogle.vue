<template>
    <img :width="props.width" src="@/assets/google.svg" alt="" />
</template>

<script lang="ts" setup>
const props = defineProps<{
    width: number;
}>();
</script>

<style></style>
