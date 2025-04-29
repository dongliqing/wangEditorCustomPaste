import { IRoute } from "@/types/index.type"


/**
 * 构建路由，补充meta面包屑
 */
export const buildRoutes = (arr: IRoute[], parent?: IRoute) => {
    arr.forEach((ele) => {
        let breadcrumbs: Record<string, any> = [];
        if (parent && parent.meta) {
            breadcrumbs.push(...parent.meta.breadcrumbs);
        }

        if (ele.path.includes("/")) {
            const value = ele.path.split("/");
            const parentRoute = parent?.children?.find(e => e.path === value[0]);
            // console.log('11', ele, parentRoute)
            if (!parentRoute) {
                return;
            }
            breadcrumbs.push({
                label:
                    parentRoute.title, key: parentRoute.name, to: parentRoute.component ? parentRoute.name : undefined
            });
            // console.log('11', ele, parentRoute)

        }

        breadcrumbs.push({ label: ele.title, key: ele.name, to: ele.component ? ele.name : undefined });
        // // {label: string, key: string, to?: string}
        ele.meta = {
            ...ele.meta,
            breadcrumbs,
        }

        // ele.path = parent ? `/${parent.path}/${ele.path}` : ele.path;
        if (ele.children) {
            buildRoutes(ele.children, ele);
        }
    });
    // return arr;
}