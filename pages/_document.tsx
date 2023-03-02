import Document, { Head, Html, Main, NextScript } from "next/document"

class MyDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head>
					<link rel="icon" href="/favicon.ico" />
					<meta
						name="description"
						content="Botlywood - A Movie Script Generator powered by AI"
					/>
					<meta property="og:site_name" content="Botlywood" />
					<meta
						property="og:description"
						content="Botlywood - A Movie Script Generator powered by AI"
					/>
					<meta property="og:title" content="Botlywood" />
					<meta name="twitter:card" content="summary_large_image" />
					<meta name="twitter:title" content="Twitter Bio Generator" />
					<meta
						name="twitter:description"
						content="Botlywood - A Movie Script Generator powered by AI"
					/>
					<meta
						property="og:image"
						content="https://Botlywood.com/og-image.png"
					/>
					<meta
						name="twitter:image"
						content="https://Botlywood.com/og-image.png"
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument
