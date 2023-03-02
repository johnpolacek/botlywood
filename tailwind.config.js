/** @type {import('tailwindcss').Config} */
module.exports = {
	future: {
		hoverOnlyWhenSupported: true,
	},
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
		"./app/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				dark: "#3e4347",
				primary: {
					50: "#f7f4ef",
					100: "#ece1d5",
					200: "#dbc4ad",
					300: "#c79f7d",
					400: "#b47d56",
					500: "#a66d4c",
					600: "#8f563f",
					700: "#734235",
					800: "#613932",
					900: "#55312e",
				},
				orange: {
					50: "#FFFCFA",
					100: "#FFF9F5",
					200: "#FFF6F0",
					300: "#FFEFE5",
					400: "#FFECE0",
					500: "#FFE6D7",
					600: "#FFAD7A",
					700: "#FF711A",
					800: "#BD4800",
					900: "#5C2300",
				},
				blue: {
					50: "#E5F8FF",
					100: "#CCF1FF",
					200: "#99E4FF",
					300: "#66D6FF",
					400: "#33C9FF",
					500: "#00B9FF",
					600: "#0096CC",
					700: "#007099",
					800: "#004B66",
					900: "#002533",
				},
				green: {
					50: "#f4f9ec",
					100: "#e7f2d5",
					200: "#cfe6b0",
					300: "#b0d581",
					400: "#93c259",
					500: "#699635",
					600: "#5a852b",
					700: "#466625",
					800: "#3a5222",
					900: "#324621",
				},
			},
		},
	},
	plugins: [require("@tailwindcss/forms"), require("@headlessui/tailwindcss")],
}
