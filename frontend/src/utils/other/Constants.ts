import { isDev } from "@/main";

let API_URL: string;
if (isDev) {
    API_URL = "http://localhost:3000/";
} else {
    API_URL = "http://localhost:3000/";
}
export { API_URL };
