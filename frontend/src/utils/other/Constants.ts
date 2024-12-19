import { IS_DEV } from "@/env";

let API_URL: string;
if (IS_DEV) {
    API_URL = "http://localhost:3000/";
} else {
    API_URL = "http://localhost:3000/";
}
export { API_URL };

export const TOKEN_KEY = "_auth_tokens";
