import http from "../http-common";

class userService {
    get(email : String) {
        return http.get(`/user/${email}`);
    }

    create(data: Object) {
        return http.post("/", data);
    }
}

export default new userService();