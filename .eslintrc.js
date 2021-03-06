const defaultNamingConvention = {
    selector: "default",
    format: ["camelCase", "PascalCase", "UPPER_CASE"],
    leadingUnderscore: "allow",
    filter: {
        regex: "^(__typename|__|__ENVIRONMENT__|__dirname)$",
        match: false,
    },
};

module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "./tsconfig.json",
        ecmaFeatures: {
            modules: true,
            jsx: true,
        },
        warnOnUnsupportedTypeScriptVersion: false,
        createDefaultProgram: true,
    },
    settings: {
        react: {
            version: "detect",
        },
    },
    globals: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        __ENVIRONMENT__: "readonly",
    },
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "prettier",
        "prettier/@typescript-eslint",
        "plugin:react/recommended",
    ],
    plugins: [
        "@typescript-eslint",
        "import",
        "prefer-arrow",
        "react",
        "react-hooks",
    ],
    rules: {
        "@typescript-eslint/array-type": [
            "warn",
            {
                default: "array-simple",
                readonly: "array-simple",
            },
        ],
        "@typescript-eslint/ban-types": [
            "error",
            {
                types: {
                    Object: {
                        message:
                            "Avoid using the `Object` type. Did you mean `object`?",
                        fixWith: "object",
                    },
                    Function: {
                        message:
                            "Avoid using the `Function` type. Prefer a specific function type, like `() => void`.",
                        fixWith: "() => void",
                    },
                    Boolean: {
                        message:
                            "Avoid using the `Boolean` type. Did you mean `boolean`?",
                        fixWith: "boolean",
                    },
                    Number: {
                        message:
                            "Avoid using the `Number` type. Did you mean `number`?",
                        fixWith: "number",
                    },
                    String: {
                        message:
                            "Avoid using the `String` type. Did you mean `string`?",
                        fixWith: "string",
                    },
                    Symbol: {
                        message:
                            "Avoid using the `Symbol` type. Did you mean `symbol`?}}",
                        fixWith: "symbol",
                    },
                },
            },
        ],
        camelcase: "off",
        "@typescript-eslint/camelcase": "off",
        "@typescript-eslint/naming-convention": [
            "warn",
            defaultNamingConvention,
            {
                selector: "interface",
                format: ["PascalCase"],
                custom: {
                    regex: "^I[A-Z]",
                    match: true,
                },
            },
            {
                ...defaultNamingConvention,
                selector: "property",
                format: ["camelCase", "PascalCase", "UPPER_CASE", "snake_case"],
            },
        ],
        "@typescript-eslint/consistent-type-definitions": "warn",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/explicit-member-accessibility": [
            "error",
            {
                accessibility: "explicit",
                overrides: {
                    constructors: "off",
                },
            },
        ],
        "@typescript-eslint/member-ordering": [
            "warn",
            {
                default: [
                    // Index signature
                    "signature",

                    // Fields
                    "public-static-field",
                    "protected-static-field",
                    "private-static-field",

                    "public-field",
                    "protected-field",
                    "private-field",

                    "static-field",

                    "field",

                    // Constructors
                    "public-constructor",
                    "protected-constructor",
                    "private-constructor",

                    "constructor",

                    // Methods
                    "public-static-method",
                    "protected-static-method",
                    "private-static-method",

                    "public-method",
                    "protected-method",
                    "private-method",

                    "static-method",

                    "method",
                ],
            },
        ],
        "@typescript-eslint/no-empty-interface": "off",
        "@typescript-eslint/no-empty-function": [
            "warn",
            { allow: ["constructors"] },
        ],
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-floating-promises": "off",
        "@typescript-eslint/no-misused-promises": [
            "error",
            {
                checksVoidReturn: false,
            },
        ],
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unsafe-call": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "@typescript-eslint/no-unsafe-return": "off",
        "@typescript-eslint/no-unused-vars": [
            "warn",
            {
                argsIgnorePattern: "^props$",
                ignoreRestSiblings: true,
            },
        ],
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/prefer-for-of": ["warn"],
        "@typescript-eslint/prefer-function-type": "warn",
        "@typescript-eslint/require-await": "off",
        "@typescript-eslint/restrict-plus-operands": "off",
        "@typescript-eslint/restrict-template-expressions": "off",
        "@typescript-eslint/semi": "warn",
        "@typescript-eslint/unified-signatures": "warn",
        // "arrow-parens": ["warn"],
        "comma-dangle": ["warn", "always-multiline"],
        curly: "warn",
        "dot-notation": "warn",
        "eol-last": "warn",
        eqeqeq: ["error", "allow-null"],
        "guard-for-in": "error",
        "id-blacklist": [
            "error",
            "Undefined",
            "any",
            "boolean",
            "number",
            "string",
            "err",
        ],
        "import/no-default-export": "warn",
        "import/order": "off",
        "max-classes-per-file": ["warn"],
        "max-len": [
            "warn",
            120,
            {
                ignoreStrings: true,
                ignoreRegExpLiterals: true,
                ignorePattern: "://",
                ignoreTemplateLiterals: true,
            },
        ],
        "new-parens": "error",
        "no-bitwise": "warn",
        "no-caller": "error",
        "no-console": "warn",
        "no-constant-condition": "off",
        "no-debugger": "off",
        "no-eval": "error",
        "no-multiple-empty-lines": "warn",
        "no-new-wrappers": "error",
        "no-shadow": "error",
        "no-throw-literal": "error",
        "no-trailing-spaces": "warn",
        "no-undef-init": "warn",
        "no-unused-expressions": "warn",
        "object-shorthand": "warn",
        "one-var": ["warn", "never"],
        "quote-props": ["warn", "as-needed"],
        quotes: "warn",
        radix: ["warn", "as-needed"],
        "space-before-function-paren": [
            "warn",
            {
                named: "never",
            },
        ],
        "spaced-comment": [
            "warn",
            "always",
            {
                exceptions: ["html"],
            },
        ],
        "react-hooks/exhaustive-deps": "warn",
        "react-hooks/rules-of-hooks": "error",
        "react/display-name": "off",
        "react/react-in-jsx-scope": "off",
        "react/prop-types": "off",
    },
};
