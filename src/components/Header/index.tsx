import React from "react";
import { SolanaNetworkType } from "../../App";

interface HeaderProps {
	solanaNetwork: SolanaNetworkType;
	setSolanaNetwork: (value: SolanaNetworkType) => void;
}

export default function Header({
	solanaNetwork,
	setSolanaNetwork,
}: HeaderProps) {
	return (
		<header className="header">
			<p className="text-primary font-semibold text-3xl">PeekSol</p>

			<span className="text-secondary flex items-center">
				<p
					className={`text-lg mx-2 ${
						solanaNetwork === "mainnet-beta" && "text-primary"
					}`}
				>
					Mainnet
				</p>
				{solanaNetwork === "mainnet-beta" ? (
					<i
						className="bi bi-toggle-off text-3xl cursor-pointer hover:text-primary"
						onClick={() => setSolanaNetwork("devnet")}
					/>
				) : (
					<i
						className="bi bi-toggle-on text-3xl cursor-pointer hover:text-primary"
						onClick={() => setSolanaNetwork("mainnet-beta")}
					/>
				)}
				<p
					className={`text-lg mx-2 ${
						solanaNetwork === "devnet" && "text-primary"
					}`}
				>
					Devnet
				</p>
			</span>
		</header>
	);
}
