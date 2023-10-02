// import http from "../http-common";
import axios from "axios";

const API_URL = "http://localhost:8080/api"

class authService {
    //signin api : post email, password & save JWT to Local Storage
    async signin(data: any):Promise<any> {
            const response = await axios.post(API_URL + "/auth/signin", data);
        if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
    }

    logout() {
        localStorage.removeItem("user");
    }

    //signup api : post email, password, username
    async signup(data: any) {
        const response = await axios.post(API_URL + "/auth/signup", data);
        return response.data;
    }
}

export default new authService();