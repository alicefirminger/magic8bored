import "./App.css";
import React, { useState, useEffect } from "react";
// import RNShake from 'react-native-shake';

function App() {
	const [randomActivity, setRandomActivity] = useState(null);
	const [isBallClicked, setIsBallClicked] = useState(false);

	useEffect(() => {
		async function fetchActivity() {
			const response = await fetch(`https://www.boredapi.com/api/activity/`);
			const data = await response.json();
			setRandomActivity(data);
			console.log(data);
		}
		if (isBallClicked) {
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
			<h1>Magic 8 Bored 🥱</h1>
			<div
				className={`magicBall ${isBallClicked ? "clicked" : ""}`}
				onClick={handleClick}
			>
				<div className="activity">
					{randomActivity && randomActivity.activity}
				</div>
			</div>
			<button onClick={handleReset}>Reset</button>
			<h3>
				Feeling bored? Click on the Magic 8 Ball and it will tell you what to do
			</h3>
		</div>
	);
}

export default App;
