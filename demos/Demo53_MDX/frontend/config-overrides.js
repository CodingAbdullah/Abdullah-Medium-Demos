const { override, addWebpackModuleRule } = require('customize-cra');

module.exports = override(
    // Add a rule to handle MDX files
    addWebpackModuleRule({
        test: /\.mdx?$/,
        use: [
            {
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env',
                        '@babel/preset-react'
                    ],
                },
            },
            {
                loader: '@mdx-js/loader',
                options: {
                    // Any options you want to pass to the MDX loader
                },
            },
        ],
    })
);