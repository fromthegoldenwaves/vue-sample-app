// import http from "../http-common";
import axios from "axios";

const API_URL = "http://localhost:8080/api"

class authService {
    signin(data: Object) {
        // return http.post("/auth/signin", data);
        return axios.post(API_URL+"/auth/signin", data)
        .then(response =>{ if(response.data.accessToken){
            localStorage.setItem("user", JSON.stringify(response.data));
        }});
    }

    logout() {
        localStorage.removeItem("user");
    }

    signup(data: Object) {
        // return http.post("/auth/signup", data);
        return axios.post(API_URL + "/auth/signup", data);
    }
}

export default new authService();