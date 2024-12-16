<template>
    <v-app class="max-w-[1000px] mx-auto">
        <v-card
            class="rounded-[15px]"
            :width="width"
            :height="height"
            elevation="20"
        >
            <p class="font-bold text-center text-3xl text-text">{{ title }}</p>
            <div class="max-w-[50%] mt-6 mx-auto">
                <AuthSocialMedias />
            </div>
            <AuthForm
                class="max-w-[80%] mx-auto justify-center flex flex-col"
                :on-submit="onSubmit"
                :fields="fields"
                :submit-text="submitText"
            />
            <div
                class="mt-5 text-[18px] font-bold gap-1 text-center flex justify-center"
            >
                <p>{{ bottom.message }}</p>
                <RouterLink class="text-primary" :to="bottom.link">
                    {{ bottom.linkMessage }}
                </RouterLink>
            </div>
        </v-card>
    </v-app>
</template>

<script lang="ts" setup>
import AuthSocialMedias from "@/components/Auth/AuthSocialMedias.vue";
import { IAuthFieldProps } from "./AuthField.vue";

import AuthForm from "./AuthForm.vue";

const { onSubmit } = defineProps<{
    title: string;
    width: string | number;
    height: string | number;
    submitText: string;
    bottom: { message: string; linkMessage: string; link: string };
    fields: IAuthFieldProps[];
    onSubmit: (event: SubmitEvent) => any;
}>();
</script>

<style></style>
