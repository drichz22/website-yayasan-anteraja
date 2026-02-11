import animate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				brand: {
					primary: "#fa027d",
					secondary: "#0b8ca7",
					tertiary: "#ffd107"
				}
			}
		},
	},
	plugins: [animate],
}
