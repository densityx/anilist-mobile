module.exports = {
    content: [
        './components/**/*.tsx',
        './screens/**/*.tsx',
    ],
    theme: {
        extend: {},
    },
    plugins: [
        // require('@tailwindcss/line-clamp')
        require('@tailwindcss/forms'),
    ],
    corePlugins: require('tailwind-rn/unsupported-core-plugins'),
}
