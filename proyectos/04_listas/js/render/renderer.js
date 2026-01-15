export function renderList(list, highlightIndex = null, currentIndex = null, searchingIndex = null) {
	const canvas = document.getElementById("canvas");
	if (!canvas) return;
	canvas.innerHTML = "";

	const nodes = list.toArray();

	nodes.forEach((nodeValue, index) => {
		const wrapper = document.createElement("div");
		wrapper.className = "node-wrapper";
		const nodeDiv = document.createElement("div");
		nodeDiv.className = "node";
		nodeDiv.textContent = nodeValue;

		if (index === highlightIndex) {
			nodeDiv.classList.add("highlight");
		}
		if (index === searchingIndex) {
			nodeDiv.classList.add("searching");
		}

		if (index === 0) {
			const headLabel = document.createElement("div");
			headLabel.className = "node-label head";
			headLabel.textContent = "HEAD";
			nodeDiv.appendChild(headLabel);
		}

		if (index === currentIndex) {
			const currentLabel = document.createElement("div");
			currentLabel.className = "node-label current";
			currentLabel.textContent = "CURR";
			nodeDiv.appendChild(currentLabel);
		}

		if (index === nodes.length - 1) {
			const tailLabel = document.createElement("div");
			tailLabel.className = "node-label tail";
			tailLabel.textContent = "TAIL";
			nodeDiv.appendChild(tailLabel);
		}

		wrapper.appendChild(nodeDiv);

		const arrow = document.createElement("div");
		arrow.className = "arrow";
		arrow.textContent = "→";
		wrapper.appendChild(arrow);

		canvas.appendChild(wrapper);
	});

	const nullWrapper = document.createElement("div");
	nullWrapper.className = "node-wrapper";
	const nullDiv = document.createElement("div");
	nullDiv.className = "null-node";
	nullDiv.textContent = "null";
	nullWrapper.appendChild(nullDiv);
	canvas.appendChild(nullWrapper);
}
