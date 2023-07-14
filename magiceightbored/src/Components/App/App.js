import "./App.css";
import React, { useState, useEffect } from "react";
// import RNShake from 'react-native-shake';

export default function App() {
	const [randomActivity, setRandomActivity] = useState(null);
	const [isBallClicked, setIsBallClicked] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchActivity() {
			const response = await fetch(`https://www.boredapi.com/api/activity/`);
			const data = await response.json();
			setRandomActivity(data);
			setIsLoading(false);
			console.log(data);
		}
		if (isBallClicked) {
			setIsLoading(true);
			fetchActivity();
		}
	}, [isBallClicked]);

	const handleClick = async () => {
		setIsBallClicked(true);
		const response = await fetch(`https://www.boredapi.com/api/activity/`);
		const data = await response.json();
		setRandomActivity(data);
	};

	const handleReset = async () => {
		setIsBallClicked(false);
		setRandomActivity(null);
	};

	return (
		<div className="App">
			<div className="contentContainer">
				<header className="header">
					<h1>Magic 8 Bored 🥱</h1>
				</header>
				<h3 className="howTo">
					Feeling bored? Click on the Magic 8 Ball and it will tell you what to
					do
				</h3>
				<div
					className={`magicBall ${isBallClicked ? "clicked" : ""}`}
					onClick={handleClick}
				>
					{isLoading ? (
						<div className="loading"></div>
					) : (
						isBallClicked &&
						randomActivity && (
							<div className="activity">{randomActivity.activity}</div>
						)
					)}
				</div>
				<button className="resetButton" onClick={handleReset}>
					Reset
				</button>
			</div>
			<footer className="footer">
				(c) 2023 Alice Firminger All Rights Reserved
			</footer>
		</div>
	);
};

