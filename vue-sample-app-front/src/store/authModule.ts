import authService from "@/services/authService";

const user = JSON.parse(localStorage.getItem('user')||'');
const initialState = user !== ''
    ? { status: { loggedIn: true }, user}
    : { status: {loggedIn: false }, user: null};

export const auth =  {
    namespace: true,
    status: initialState,
    actions: {
        signin({ commit } : { commit : any }, user : object) {
            return authService.signin(user).then(
                user => {
                    commit('loginSuccess', user);
                    return Promise.resolve(user);
                },
                error => {
                    commit('loginFailure');
                    return Promise.reject(error);
                }
            );
        },
        logout({ commit } : { commit : any }) {
            authService.logout();
            commit('logout');
        },
        signup({ commit } : { commit : any }, user : object) {
            return authService.signup(user).then(
                response => {
                    commit('registerSuccess');
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('registerFailure');
                    return Promise.reject(error);
                }
            );
        }
    },
    mutations: {
        loginSuccess(state : any, user : any) {
            state.status.loggedIn = true;
            state.user = user;
        },
        loginFailure(state : any) {
            state.status.loggedIn = false;
            state.user = null;
        },
        logout(state : any) {
            state.status.loggedIn = false;
            state.user = null;
        },
        registerSuccess(state : any) {
            state.status.loggedIn = false;
        },
        registerFailure(state : any) {
            state.status.loggedIn = false;
        }
    }
}