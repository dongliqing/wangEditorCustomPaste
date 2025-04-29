import request from "@/utils/request";

export function getHomeData(data: {}) {
    return request({
        url: "/",
        method: "post",
        data
    })
}

