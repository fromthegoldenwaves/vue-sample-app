import http from "../http-common";

class userService {
    signin(data: Object) {
        return http.post("/auth/signin", data);
    }

    signup(data: Object) {
        return http.post("/auth/signup", data);
    }
}

export default new userService();