<template>
    <AuthLayout
        title="Авторизация"
        width="500"
        height="600"
        submit-text="Войти"
        :fields="fields"
        :on-submit="onSubmit"
        :bottom="bottomInfo"
    ></AuthLayout>
</template>

<script lang="ts" setup>
import AuthLayout from "@/components/Auth/AuthLayout.vue";
import { Routes } from "@/utils/other/Routes";
import { ref } from "vue";
import { authService } from "@/utils/api/auth.service";
import { requiredRule } from "@/utils/validation/requiredRule";
import { IAuthFieldProps } from "@/components/Auth/AuthField.vue";
const username = ref<string>("");
const password = ref<string>("");
const fields: IAuthFieldProps[] = [
    {
        label: "Логин",
        placeholder: "Введите свой логин",
        model: username,
        prependIcon: "mdi-account",
        rules: [requiredRule],
    },
    {
        label: "Пароль",
        placeholder: "Введите свой пароль",
        model: password,
        prependIcon: "mdi-lock",
        isPassword: true,
        isVisible: true,
        rules: [requiredRule],
    },
];
const bottomInfo = {
    message: "Нет аккаунта?",
    linkMessage: "Регистрация",
    link: Routes.auth.register,
};
const onSubmit = async () => {
    const login = await authService.login({
        username: username.value,
        password: password.value,
    });

    if (login?.status && [200, 201].includes(login.status)) {
        return {
            status: true,
            message: "Успешная авторизация!",
        };
    } else {
        const messageByCode: { [key: number]: string } = {
            401: "Неверный логин или пароль",
            500: "Внутренняя ошибка сервера",
            429: "Вы слишком часто пробуете авторизироваться! Попробуйте через 15 минут",
        };
        return {
            status: false,
            message:
                messageByCode[Number(login?.status) || 500] ||
                "Внутренняя ошибка",
        };
    }
};
</script>

<style scoped></style>
