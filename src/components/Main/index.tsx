import React, { useRef, useState } from "react";
import {
	Connection,
	clusterApiUrl,
	PublicKey,
	LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { NotificationProps } from "../Notification";
import { SolanaNetworkType } from "../../App";
import LoadingSkeleton from "../LoadingSkeleton";

interface MainProps {
	solanaNetwork: SolanaNetworkType;
	setNotification: (value: NotificationProps) => void;
}

type FetchingStatusType = "IDLE" | "FETCHING" | "FETCHED";

export default function Main({ solanaNetwork, setNotification }: MainProps) {
	const [fetchingStatus, setFetchingStatus] =
		useState<FetchingStatusType>("IDLE");

	const [accountAddress, setAccountAddress] = useState<string | null>(null);
	const [accountBalance, setAccountBalance] = useState<
		string | number | null
	>(null);
	const [isAccountExecutable, setIsAccountExecutable] = useState<
		string | boolean | null
	>(null);

	const inputRef = useRef<HTMLInputElement | null>(null);

	const getAccountBalance = async (address: PublicKey) => {
		const connection = new Connection(clusterApiUrl(solanaNetwork));
		const accountBalance = await connection.getBalance(address);

		return accountBalance / LAMPORTS_PER_SOL;
	};

	const getAccountInfo = async (address: PublicKey) => {
		const connection = new Connection(clusterApiUrl(solanaNetwork));
		const accountInfo = await connection.getAccountInfo(address);

		return accountInfo;
	};

	// function to handle button click
	const handleSubmit = async () => {
		try {
			setAccountAddress(null);
			setAccountBalance(null);
			setIsAccountExecutable(null);

			const accountAddressInput = inputRef?.current?.value;

			if (!accountAddressInput) {
				setNotification({
					type: "error",
					message: "No account address entered!",
				});
				return;
			}

			const accountAddress = new PublicKey(accountAddressInput);

			setAccountAddress(accountAddress.toString());

			setFetchingStatus("FETCHING");

			const accountBalance = await getAccountBalance(accountAddress);

			const accountInfo = await getAccountInfo(accountAddress);

			if (accountInfo) {
				setIsAccountExecutable(accountInfo.executable);
			} else {
				setIsAccountExecutable("---");
				setNotification({
					type: "error",
					message: "Error in getting account executable status!",
				});
			}

			if (accountBalance) {
				setAccountBalance(accountBalance);
				setNotification({
					type: "success",
					message: "Account balance fetched successfully!",
				});
			} else {
				setAccountBalance("---");
				setNotification({
					type: "error",
					message:
						"Error in getting sol balance for the entered address!",
				});
			}

			setFetchingStatus("FETCHED");
		} catch (error) {
			setAccountAddress(null);
			setAccountBalance(null);
			setFetchingStatus("IDLE");
			setNotification({
				type: "error",
				message: "Something went wrong! Please check entered address.",
			});
			console.error("handleSubmit => ", error);
		}
	};

	let result = false;

	switch (fetchingStatus) {
		case "IDLE":
			result = false;
			break;

		case "FETCHING":
			result = true;
			break;

		case "FETCHED":
			result = true;
			break;
	}

	return (
		<main className="main">
			<h1 className="heading-1 text-center my-4">
				Check SOL balance of any solana account address using PeekSol.
			</h1>

			<div className="flex justify-center items-center flex-wrap my-6">
				<input
					className="text-input w-[80%] sm:w-[500px]"
					type="text"
					placeholder="Enter wallet address"
					ref={inputRef}
				/>

				<button type="button" className="button" onClick={handleSubmit}>
					Check SOL Balance
				</button>
			</div>

			{result && (
				<div className="flex flex-col max-w-[600px] mx-auto space-y-8">
					<span className="flex items-center">
						<p className="text-primary mr-4">Entered address:</p>
						<div className="text-secondary">
							{accountAddress ?? (
								<LoadingSkeleton width="20rem" />
							)}
						</div>
					</span>
					<span className="flex items-center">
						<p className="text-primary mr-4">Account balance:</p>
						<div className="text-secondary">
							{accountBalance ? (
								`${accountBalance} SOL`
							) : (
								<LoadingSkeleton width="10rem" />
							)}
						</div>
					</span>
					<span className="flex items-center">
						<p className="text-primary mr-4">
							Is account executable:
						</p>
						<div className="text-secondary">
							{isAccountExecutable !== null ? (
								`${isAccountExecutable}`
							) : (
								<LoadingSkeleton width="10rem" />
							)}
						</div>
					</span>
				</div>
			)}
		</main>
	);
}
