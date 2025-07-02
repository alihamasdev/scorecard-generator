import localFont from "next/font/local";

const cwcFont = localFont({
	src: [
		{
			path: "./cwc_regular.ttf",
			weight: "400",
		},
		{
			path: "./cwc_medium.ttf",
			weight: "500",
		},
		{
			path: "./cwc_bold.ttf",
			weight: "700",
		},
	],
	variable: "--font-cwc",
	weight: "400, 500, 700",
});

export { cwcFont };
