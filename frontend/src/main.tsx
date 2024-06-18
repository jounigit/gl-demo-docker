import React from "react"
import reactDom from "react-dom/client"
import App from "./App.tsx"
import "./styles/global.css"

reactDom
	.createRoot(
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		document.getElementById("root")!,
	)
	.render(
		<React.StrictMode>
			<App />
		</React.StrictMode>,
	)
