/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    safelist: ['border-lava', 'bg-lava'],
    theme: {
        extend: {
            aspectRatio: {
                '20/9': '20/9',
            },
            screens: {
                mobile: { max: '1300px' },
               // ipad: { min: '893px', max: '1024px' },

                // 'phone-wide': { max: '1000px' }, // Wide smartphones up to 1000px
                // tablet: { min: '641px', max: '1000px' }, // Tablets between 641px and 1000px
            },
            fontFamily: {
                spraypaint: ['Rubik Spray Paint', 'system-ui'],
                bubbles: ['Rubik Bubbles', 'system-ui'],
                nunito: ['Nunito', 'system-ui'],
                abz: ['ABeeZee', 'sans-serif'],
            },
            colors: {
                back: '#F40000',
                sunshine: '#FFEB3B',
                bluesky: '#4FC3F7',
                applegreen: '#8BC34A',
                tangerine: '#FF9800',
                pinkgum: '#FF80AB',
                grape: '#AB47BC',
                softgray: '#B0BEC5',
                butter: '#FFEDBE',
                cheese: '#FFD568',
                stone: '#8D8686',
                lava: '#CD0045',
                limblue: '#005981',
                darkgreen: '#2B4D39',
                wood: '#D68E5E',
                lineblue: '#4A90E2',
                linered: '#FF5A5F',
                modalblue: '#A9DEFF',
                modalbrown: '#E2B868',
                peach: '#FFBD95',
                greytext: '#9da4b0',
                poop: '#7C4B3A',
                darkpeach: '#FD8C70',
                modalbrownlight: '#E8CBA0',
                modalbrowndark: '#986300',
                lavender: '#9168E2',
                moldcheese: '#F8BC35',
            },
        },
    },
    plugins: [require('@tailwindcss/aspect-ratio')],
}
