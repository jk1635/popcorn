module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'eslint-config-prettier',
        'plugin:import/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh', '@typescript-eslint', 'import', 'react', 'react-hooks', 'prettier'],
    rules: {
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
        'prettier/prettier': [
            'warn',
            {
                endOfLine: 'auto',
            },
        ],

        'react/prop-types': 'off',

        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/no-explicit-any': 'warn',

        'import/named': 'off',
        'import/newline-after-import': 'warn',
        'import/no-extraneous-dependencies': 'off',
        'import/no-unresolved': 'off',
        'import/order': [
            'warn',
            {
                groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'type'],
                pathGroups: [
                    {
                        pattern: '{react**,react*/**}',
                        group: 'external',
                        position: 'before',
                    },
                    {
                        pattern: "{@components/**,@libs/**,@stores/**}",
                        group: "internal",
                        position : "before"
                    },
                    {
                        pattern: "{@assets/**,@styles/**,@constants/**,@utils/**,@/**}",
                        group: "internal",
                        position : "before"
                    },
                    {
                        pattern: "@pages/**",
                        group: "internal",
                        position : "after"
                    },
                ],
                pathGroupsExcludedImportTypes: [],
                'newlines-between': 'always',
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true,
                },
            },
        ],
    },
}