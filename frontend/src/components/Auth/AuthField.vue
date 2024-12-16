<template>
    <div>
        <p class="font-bold" v-if="label">{{ label }}</p>
        <v-text-field
            class="font-bold"
            elevation="20"
            v-model="model.value"
            :prepend-inner-icon="prependIcon"
            :append-inner-icon="
                isVisible ? (visible ? 'mdi-eye-off' : 'mdi-eye') : ''
            "
            :placeholder="placeholder"
            :type="visible ? 'text' : 'password'"
            @click:append-inner="visible = !visible"
            :rules="rules"
        />
    </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, Ref } from "vue";

export interface IAuthFieldProps {
    label?: string;
    prependIcon?: string;
    placeholder?: string;
    isPassword?: boolean;
    isVisible?: boolean;
    model: Ref<string>;
    rules?: any[];
}

const props = defineProps<IAuthFieldProps>();

const visible = ref(!!!props.isPassword);
</script>

<style scoped></style>
