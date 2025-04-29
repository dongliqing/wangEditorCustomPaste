import {Component} from "vue";


export interface IRoute {
    path: string,
    title: string,
    redirect?: string,
    component?: Component,
    name?: string,
    children?: IRoute[],
    target?: string,
    directory?: string,
    keepAlive?: boolean, 
    icon?: Component,
    meta?: Record<string, any>,
    isHidden?: boolean,
}

export interface Menu {
    key: string,
    label: string,
    icon?: string,
    children: Menu[]
}


