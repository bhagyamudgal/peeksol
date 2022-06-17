import { useState, useEffect } from "react";
import Footer from "./components/Footer";

// components
import Header from "./components/Header";
import Main from "./components/Main";
import Notification, { NotificationType } from "./components/Notification";

type NotificationStateType = {
	type: NotificationType;
	message: string;
} | null;

export type SolanaNetworkType = "mainnet-beta" | "devnet";

function App() {
	const [notification, setNotification] =
		useState<NotificationStateType>(null);

	const [solanaNetwork, setSolanaNetwork] =
		useState<SolanaNetworkType>("mainnet-beta");

	// don't show notification after 5 seconds
	useEffect(() => {
		if (notification) {
			setTimeout(() => {
				setNotification(null);
			}, 5000);
		}
	}, [notification]);

	useEffect(() => {
		if (solanaNetwork) {
			setNotification({
				type: "success",
				message: `App is using ${
					solanaNetwork === "mainnet-beta" ? "Mainnet" : "Devnet"
				} solana network`,
			});
		}
	}, [solanaNetwork]);

	return (
		<div className="app">
			{notification && (
				<Notification
					type={notification?.type}
					message={notification?.message}
				/>
			)}

			<Header
				solanaNetwork={solanaNetwork}
				setSolanaNetwork={setSolanaNetwork}
			/>
			<Main
				solanaNetwork={solanaNetwork}
				setNotification={setNotification}
			/>
			<Footer />
		</div>
	);
}

export default App;
