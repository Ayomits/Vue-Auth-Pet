<template>
    <v-app class="min-h-screen max-w-[1000px] mx-auto flex items-center justify-center bg-gray-100">
        <v-card
            height="400"
            width="600"
            class="rounded-xl font-roboto shadow-lg"
        >
            <div class="flex flex-col max-w-[80%] mx-auto mt-10">
                <p
                    class="text-5xl text-text text-center font-extrabold text-gray-800"
                >
                    404
                </p>
                <p
                    class="font-normal text-lg text-gray-600 text-center mt-6 leading-7"
                >
                    Обычно такое бывает, если вы очень любопытны. Вы так
                    заискались, что попали в тупик. Поэтому как великий
                    разработчик предлагаю вам посетить главную страницу! Ну либо
                    страницу авторизации — иххихихи.
                </p>
                <RouterLink
                    class="flex justify-center mt-10"
                    :to="Routes.auth.login"
                >
                    <v-btn
                        text="На главную"
                        color="primary"
                        class="font-bold rounded-lg"
                        width="300"
                        height="50"
                    ></v-btn>
                </RouterLink>
            </div>
        </v-card>
    </v-app>
</template>

<script lang="ts" setup>
import { Routes } from "@/utils/other/Routes";
</script>

<style></style>
