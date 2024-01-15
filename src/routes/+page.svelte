<script>
	let inputRate = 0;
	let outputRate = 0;
	let ratio = 0;

	function calculateRatio() {
		if (!isNaN(inputRate) && !isNaN(outputRate)) {
			ratio = outputRate / inputRate;
		} else {
			ratio = NaN;
		}
	}
</script>

<main>
	<h1>Factorio Production Calculator</h1>
	<form on:submit|preventDefault={calculateRatio}>
		<label for="inputRate">Input Rate:</label>
		<input type="number" id="inputRate" bind:value={inputRate} step="0.01" required />

		<label for="outputRate">Output Rate:</label>
		<input type="number" id="outputRate" bind:value={outputRate} step="0.01" required />

		<button type="submit">Calculate</button>
	</form>

	{#if !isNaN(ratio)}
		<div>The recommended ratio is {ratio.toFixed(2)}</div>
	{/if}
</main>

<style>
	main {
		max-width: 400px;
		margin: 0 auto;
		padding: 20px;
	}
	form {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	label {
		font-weight: bold;
	}
	input {
		padding: 5px;
		border: 1px solid #ddd;
		border-radius: 4px;
	}
	button {
		padding: 10px;
		background-color: #007bff;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}
	div {
		margin-top: 10px;
	}
</style>
