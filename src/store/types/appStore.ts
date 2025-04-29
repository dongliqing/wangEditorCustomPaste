export interface Menu {
    label: string,
    key: string,
    icon?: string,
    children?: Menu[]
}

interface Bread {
    label: string,
    to?: {
        name: string
    },
}

export interface IAppStore {
    isLogin: boolean,
    isCollapes: boolean,
    selectKey: string,
    menuList: Menu[],
    breadcrumList: Bread[],

    accessPageNameSet: Set<string>,
    accessPermissionSet: Set<string>,
}