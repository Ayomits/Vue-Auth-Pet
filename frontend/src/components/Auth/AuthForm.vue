<template>
    <v-form ref="form" @submit.prevent="validateBeforeSubmit">
        <AuthField
            v-for="(field, index) in fields"
            :key="index"
            :label="field.label"
            :prepend-icon="field.prependIcon"
            :is-password="field.isPassword"
            :is-visible="field.isVisible"
            :placeholder="field.placeholder"
            :model="field.model"
            :rules="field.rules"
        />
        <div class="max-w-[50%] mx-auto">
            <v-btn
                type="submit"
                :loading="isLoading"
                color="primary"
                width="100"
                class="roundex-xl"
            >
                {{ submitText }}
            </v-btn>
        </div>
        <v-alert
            v-if="notificationVisible"
            :type="notificationType"
            class="fixed bottom-5 right-5 max-width-[300px] z-50"
            dismissible
            closable
            v-model:show="notificationVisible"
            :timeout="2_000"
        >
            {{ notificationMessage }}
        </v-alert>
    </v-form>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Routes } from "@/utils/other/Routes";
import { IAuthFieldProps } from "./AuthField.vue";
import AuthField from "./AuthField.vue";
import { VForm } from "vuetify/components";
import router from "@/pluging/router";

const { fields, submitText, onSubmit } = defineProps<{
    fields: IAuthFieldProps[];
    submitText: string;
    onSubmit: (ev: SubmitEvent) => any;
}>();

const form = ref<typeof VForm | null>(null);
const notificationVisible = ref(false);
const notificationMessage = ref("");
const notificationType = ref<"success" | "error">("success");
const isLoading = ref(false);
const validateBeforeSubmit = async (ev: SubmitEvent) => {
    const isValid = form.value?.isValid;
    if (!isValid) return;

    isLoading.value = true;
    const { status, message } = (await onSubmit(ev)) as {
        status: boolean;
        message: string;
    };

    isLoading.value = false;
    notificationType.value = status ? "success" : "error";
    notificationMessage.value = message;
    notificationVisible.value = true;

    setTimeout(() => {
        notificationVisible.value = false;
    }, 3000);

    form.value?.reset();
    if (status) {
        router.push(Routes.dashboard.main);
    }
};
</script>

<style scoped></style>
