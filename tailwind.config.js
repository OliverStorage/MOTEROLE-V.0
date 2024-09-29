/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            boxShadow: {
                'inner-lg': 'inset 0px 0px 15px 2px rgba(0, 0, 0, 0.6)', // stronger inner shadow
                'inner-xl': 'inset 0 10px 15px rgba(0, 0, 0, 0.7)', // even stronger shadow
            },
            fontFamily: {
                spraypaint: ['Rubik Spray Paint', 'system-ui'],
                bubbles: ['Rubik Bubbles', 'system-ui'],
                nunito: ['Nunito', 'system-ui'],
                abz: ['ABeeZee', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
