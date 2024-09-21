/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,php}"],
    theme: {
        extend: {
            fontFamily: {
                kavoon: ["Kavoon", "serif"],
                titan: ["Titan One", "serif"],
            },
        },
    },
    plugins: [],
};
