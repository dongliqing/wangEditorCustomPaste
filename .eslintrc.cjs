module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "es2021": true
    },
    "extends": [
        "standard-with-typescript",
        "plugin:vue/vue3-essential",
        'eslint:recommended',
        '@vue/typescript/recommended',
        '@vue/prettier',
        '@vue/prettier/@typescript-eslint',
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "plugins": [
        "vue",
        "@typescrit-eslint"
    ],
    /**
     * 'off' or 0 => 关闭规则
     * 'warn' or 1 => 警告，不影响执行
     * 'error' or 2 => 错误，界面报错
     */
    "rules": {
        "no-console": 1, //警告使用console
        "no-var": 1, //警告使用var
        "no-debugger": 1, //警告使用debugger
        "no-undef": 2, //不能有未定义的变量
        "no-use-before-define": 2, //未定义前不能使用
        "no-unused-vars": 0, //声明的变量未使用
        "no-multiple-empty-lines": [2, { max: 1 }],//禁止多个空格
        "prefer-promise-reject-errors": 0,
        "vue/attribute-hyphenation": 2, //vue属性名使用羊肉串风格 custom-props
        "vue/component-name-in-template-casing": 2, //vue组件名使用大写驼峰命名
        "@typescript-eslint/no-explicit-any": 1,//警告any类型
        "vue/no-mutating-props": 0, //改变组件prop
        "vue/custom-event-name-casing": 2, //自定义事件名称强制使用特定大小写
        "vue/v-slot-style": 2, //强制执行 v-slot指令样式
        "vue/require-default-prop": 0, //props参数非必传，关闭设置默认值警告
        // "vue/multi-word-component-names": 0, //文件名是否驼峰命名
        // "import/order": 1

    }
}
