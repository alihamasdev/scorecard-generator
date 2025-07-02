import { type Metadata } from "next";

import { ThemeProvider } from "@/lib/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Footer } from "@/components/footer";
import { cwcFont } from "@/app/font/cwc";

import "./globals.css";

export const metadata: Metadata = {
	title: "Cricket Scorecard Generator",
	description: "Generate cricket scorecards",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body style={cwcFont.style}>
				<ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
					<main className="flex min-h-dvh w-full flex-col border-b">
						<header className="w-full px-4">
							<div className="container mx-auto flex items-center justify-between py-4">
								<h1 className="text-3xl font-bold">Cricket Scorecard Generator</h1>
							</div>
						</header>
						<div className="container mx-auto px-4">{children}</div>
						<Footer />
					</main>
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	);
}
