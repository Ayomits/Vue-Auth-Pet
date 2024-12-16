import { createVuetify } from "vuetify";
import "@mdi/font/css/materialdesignicons.css";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
// @ts-ignore
import "vuetify/styles";

export const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: "light",
        themes: {
            light: {
                colors: {
                    background: "#F0F0F0", // Цвет фона

                    surface: "#FFFFFF", // Цвет для карточек и других элементов
                    component: "#EEEEEE", // Цвет для инпутов внутри карточек

                    text: "#363636", // Цвет для текста

                    primary: "#6584FF", // Основной цвет
                    warn: "#FCCE7A", // Предупреждения
                    danger: "#FF6565", // Ошибки
                    success: "#65FF6A", // Успешные взаимодействия
                    secondary: "#939395", // Вторичный цвет
                },
            },
        },
    },
});
