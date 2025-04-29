import axios from "axios";
import type { AxiosResponse } from "axios";
import { RESPONSE_CODE } from "@/constant/index"
import { delay, throttle, isEmpty } from "lodash";

const { VITE_APP_BASEURL = '/' } = import.meta.env;

const request = axios.create({
    headers: {},
    baseURL: VITE_APP_BASEURL
})


const throttleMsg = throttle(
    (message: string) => {
        ElMessage.error({ message, duration: 2000 });
        delay(() => {
            window.location.replace(`${location.origin}/login`);
        }, 2100)
    },
    2000,
    { trailing: false }
)

//请求发起拦截器
request.interceptors.request.use(
    config => {
        // config.headers.token = localStorage.token;
        return config;
    },
    err => {
        return Promise.reject(err);
    }
)


//请求响应拦截器
request.interceptors.response.use(
    (response: AxiosResponse) => {

        const { data = {} } = response;
        if (data.code === RESPONSE_CODE.unlogin) {
            throttleMsg("token失效");
            return;
        }
        if (data.code === RESPONSE_CODE.freeze) {
            throttleMsg("账号已冻结");
            return;
        }

        const useOriginalResponse = response?.config?.params?.useOriginalResponse ?? false;
        if (useOriginalResponse) {
            return response;
        }

        return data;
    },
    err => {
        const { response = {} } = err;
        if (isEmpty(response.data)) {
            ElMessage.error("服务器异常")
        } else {
            ElMessage.error(response.data.message);
        }
        return Promise.reject(response.data);
    }
)

export default request;