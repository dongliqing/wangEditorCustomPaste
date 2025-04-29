

// declare module "@/directives";
// declare module "@/constant/index";
declare module "nprogress";

declare module "*.vue" {    
    import { DefineComponent} from "vue";
    const component: DefineComponent<{}, {}, any>;
    export default component;
}


declare module "*.css";
declare module "*.less";
declare module "*.png";
declare module "*.jpeg";
declare module "*.jpg";