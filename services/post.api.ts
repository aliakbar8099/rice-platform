import instance from "lib/axios";
// auth mobile
export async function getCode(data: {}) {
    let apiCall = await instance.post("/auth/verifycode", data)
    return apiCall;
}
// check code verify
export async function CheckCode(data: {}, token: string | undefined) {
    let apiCall = await instance.post("/auth/verifycode?token=" + token, data)
    return apiCall;
}
//login
export async function psotLogin(data: {}) {
    let apiCall = await instance.post("/auth/login", data)
    return apiCall;
}
//signup
export async function psotSignUp(data: {}) {
    let apiCall = await instance.post("/auth/users", data)
    return apiCall;
}
// re request code 
export async function getReCode(data: {}) {
    let apiCall = await instance.post("/auth/verifycode?notCheck=true", data)
    return apiCall;
}