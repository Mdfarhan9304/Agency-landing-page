/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'display': ['"Bebas Neue"', 'sans-serif'],
                'sans': ['"Inter"', 'system-ui', 'sans-serif'],
            },
            colors: {
                'brand': {
                    gold: '#FFD700',
                    dark: '#050505',
                }
            },
            backgroundImage: {
                'gold-glow': 'radial-gradient(circle at 50% 0%, rgba(255, 215, 0, 0.25) 0%, rgba(5, 5, 5, 0) 70%)',
            },
            animation: {
                'scroll': 'scroll 40s linear infinite',
                'drift': 'drift 20s ease-in-out infinite alternate',
            },
            keyframes: {
                scroll: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-100%)' },
                },
                drift: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(50vw)' },
                }
            }
        },
    },
    plugins: [],
}
