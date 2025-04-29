import { RESPONSE_CODE } from "@/constant/index"
import type { Ref } from "vue";

/**
 * 接口请求操作
 * @param {Function} api 
 * @param {Object} params 请求参数
 * @param {Object} options 配置项
 * @returns Promise
 */

interface IResult {
    code: string,
    message: string,
    [key: string]: any,
}
const useRequest = <P = any>(
    api: (params: P) => any,
    params: Parameters<typeof api>[0],
    options: {
        onSuccess?: (result: any) => void; //接口响应成功
        onFail?: (message: string, code?: string) => void; //接口响应失败
        onCatch?: (e: unknown) => void;
        onFinally?: () => void;
        isLoading?: Ref;  //请求进行时
        isAutoErr?: boolean;  //是否自动报错
        isAutoSuccess?: boolean; //是否自动报成功
        customErrMsg?: string; //自定义报错信息
        customSuccessMsg?: string; //自定义报成功信息
    } = {}
): Promise<IResult> => {
    const {
        onSuccess,
        onFail,
        onCatch,
        onFinally,
        isLoading = ref(false),
        isAutoErr,
        isAutoSuccess,
        customErrMsg,
        customSuccessMsg,
    } = options;

    isLoading.value = true;
    return new Promise((resolve, reject) => {
        api(params).then((res: any) => {
            const { code, message, result } = res;
            if (code === RESPONSE_CODE.success) {
                isAutoSuccess && ElMessage.success(customSuccessMsg || message);
                onSuccess && onSuccess(result);
                resolve(res);
            } else {
                isAutoErr && ElMessage.error(customErrMsg || message);
                onFail && onFail(result);
                reject(res);
            }
        }).catch((e) => {
            onCatch && onCatch(e) 
        }).finally(() => {
            isLoading.value = false;
            onFinally && onFinally();
        })
    })
}

export default useRequest;