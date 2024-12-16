import axios from "axios";
import { API_URL } from "../other/Constants";

export class AbstractService {
    protected axios: typeof axios;

    constructor() {
        axios.defaults.baseURL = API_URL;
        axios.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                return Promise.resolve(error.response);
            }
        );

        this.axios = axios;
    }
}
