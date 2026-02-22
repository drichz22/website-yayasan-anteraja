import animate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				brand: {
					primary: {
						DEFAULT: "#fa027d",
						hover: "#d9026c",
						active: "#b7025c",
					},
					secondary: {
						DEFAULT: "#0b8ca7",
						hover: "#08778e",
						active: "#066274",
					},
					tertiary: {
						DEFAULT: "#ffd107",
						hover: "#e6bc06",
						active: "#cca705",
					}
				}
			}
		}
	},
	plugins: [animate],
}
