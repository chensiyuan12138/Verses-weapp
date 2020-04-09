module.exports = {
    env: {
        NODE_ENV: '"production"'
    },
    defineConstants: {
    },
    copy: {
        patterns: [
            { from: 'src/asset/', to: 'dist/asset/' },
        ]
    },
    // 小程序端专用配置
    mini: {
        lessLoaderOption: {
            strictMath: true,
            noIeCompat: true
        },
        postcss: {
            autoprefixer: {
                enable: true
            },
            // 小程序端样式引用本地资源内联配置
            url: {
                enable: true,
                config: {
                    limit: 10240
                }
            }
        },
        // 替换 JSX 中的属性名，参考：
        // https://github.com/NervJS/taro/issues/2077
        jsxAttributeNameReplace: {}
    },
}
