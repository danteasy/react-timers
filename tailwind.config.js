/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    mode: "jit",
    theme: {
        screens: {
            "2xl": { max: "1535px" },
            xl: { max: "1279px" },
            lg: { max: "1023px" },
            md: { max: "767px" },
            sm: { max: "639px" },
        },
        extend: {
            animation: {
                "fade-in": "fade-in 800ms ease-out",
            },
            colors: {
                "mui-blue": "#1976d2",
            },
            keyframes: {
                "fade-in": {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "100" },
                },
            },
        },
    },
    plugins: [],
};
