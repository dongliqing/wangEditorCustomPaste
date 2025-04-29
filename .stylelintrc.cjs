module.exports = {
    root: true,
    extends: ["stylelint-config-standard", "stylelint-config-prettier"],
    overrides: [
        {
            files: ["*.vue"],
            customSyntax: "postcss-html",
        }
    ],
    rules: {
        "function-url-quotes": "always",
        "rules-empty-line-before": "never",
        "selector-pseudo-class-no-unknow": [
            true,
            {
                ignorePseudoClasses: ["global", "v-deep", "deep"]
            }
        ]
    },
    ignoreFiles: ["**/*.js", "**/*.ts", "**/*.png", "**/*.jpg", "**/*.jpeg"],
}