import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/lib/theme-provider";

import "./globals.css";
import { Footer } from "@/components/footer";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"]
});

export const metadata: Metadata = {
	title: "Cricket Scorecard Generator",
	description: "Generate cricket scorecards"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body style={geistSans.style}>
				<ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
					<main className="bg-muted/60 flex min-h-dvh w-full flex-col">
						<header className="w-full px-4">
							<div className="container mx-auto flex items-center justify-between py-4">
								<h1 className="text-3xl font-bold">Cricket Scorecard Generator</h1>
							</div>
						</header>
						<div className="container mx-auto">{children}</div>
						<Footer />
					</main>
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	);
}
