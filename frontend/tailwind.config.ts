import type { Config } from 'tailwindcss'
const config: Config = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    DEFAULT: '#5D3FD3',
                    light: '#E0D4F7',
                    dark: '#3B1FA0',
                },
                surface: '#1A1A1A',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Poppins', 'sans-serif'],
            },
            borderRadius: {
                '2xl': '1.5rem',
            },
            boxShadow: {
                fancy: '0 10px 15px -3px rgba(93,63,211,0.3)',
            },
            animation: {
                fadeIn: 'fadeIn 0.8s ease-out forwards',
            },
            keyframes: {
                fadeIn: {
                    from: { opacity: 0 },
                    to: { opacity: 1 },
                },
            },
        },
    },
    plugins: [],
}
export default config