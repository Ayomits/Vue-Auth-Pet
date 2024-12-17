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
import { passwordRules } from "@/utils/validation/passwordRules";

const username = ref<string>("");
const password = ref<string>("");
const retypePassword = ref<string>("");

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
        rules: [requiredRule, ...passwordRules],
    },
    {
        label: "Повторите пароль",
        placeholder: "Повторите свой пароль",
        prependIcon: "mdi-lock",
        isPassword: true,
        isVisible: false,
        model: retypePassword,
        rules: [
            requiredRule,
            (_v: any) =>
                password.value === retypePassword.value ||
                "Пароли не совпадают",
        ],
    },
];

const bottomInfo = {
    message: "Уже есть аккаунт?",
    linkMessage: "Авторизация",
    link: Routes.auth.login,
};

const onSubmit = async () => {
    const login = await authService.register({
        username: username.value,
        password: password.value,
    });

    if (login?.status && [200, 201].includes(login.status)) {
        return {
            status: true,
            message: "Успешная регистрация!",
        };
    } else {
        const messageByCode: { [key: number]: string } = {
            400: "Пользователь с таким именем уже существует",
            500: "Внутренняя ошибка сервера",
            429: "Вы слишком часто пробуете регистрироваться. Попробуйте через 30 минут",
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
