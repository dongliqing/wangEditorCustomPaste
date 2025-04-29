module.exports = {
    extends: ["@commitlint/config-conventional"],
    rules: {
        "type-enum":[
            2,
            "always",
            [
                "feat", //新功能
                "fix", //修复bug
                "docs", //文档修改
                "style", //代码格式
                "css", //修改样式
                "refactor", //代码重构
                "perf", //改善性能
                "test", //测试
                "build", //项目构建依赖
                "ci", //集成配置
                "chore", //其他
                "delete", //删除
            ],
        ],
    }
}