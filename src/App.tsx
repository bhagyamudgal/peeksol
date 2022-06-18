import { useState, useEffect } from "react";
import Footer from "./components/Footer";

// components
import Header from "./components/Header";
import Main from "./components/Main";
import Notification, { infoToast } from "./components/Notification";

export type SolanaNetworkType = "mainnet-beta" | "devnet";

function App() {
	const [solanaNetwork, setSolanaNetwork] =
		useState<SolanaNetworkType>("mainnet-beta");

	useEffect(() => {
		if (solanaNetwork) {
			infoToast(
				`App is using Solana ${
					solanaNetwork === "mainnet-beta" ? "Mainnet" : "Devnet"
				}`
			);
		}
	}, [solanaNetwork]);

	return (
		<div className="app">
			<Notification />

			<Header
				solanaNetwork={solanaNetwork}
				setSolanaNetwork={setSolanaNetwork}
			/>
			<Main solanaNetwork={solanaNetwork} />
			<Footer />
		</div>
	);
}

export default App;
