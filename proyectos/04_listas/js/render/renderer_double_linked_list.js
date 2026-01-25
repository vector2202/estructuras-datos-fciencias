export function renderFloatingNode(value) {
  const canvas = document.getElementById("canvasdll");
  if (!canvas) return;

  const existing = canvas.querySelector(".floating-node-container");
  if (existing) existing.remove();

  const container = document.createElement("div");
  container.className = "floating-node-container";

  container.innerHTML = `
        <div class="node floating">${value}</div>
        <div style="color: var(--text-muted); margin-top: 5px; font-size: 0.8rem;">NEW</div>
    `;

  canvas.appendChild(container);
}

export function renderDoubleLinkedList(list, currentIndex = null, highlightIndex = null, animateArrowFromIndex = -1) {
  const canvas = document.getElementById("canvasdll");
  if (!canvas) return;
  canvas.innerHTML = "";

  const nodes = list.toArray();

  const startNull = makeNull();
  canvas.appendChild(startNull);

  if (nodes.length > 0) {
  }

  nodes.forEach((node, index) => {
    const wrapper = document.createElement("div");
    wrapper.className = "node-wrapper";

    if (index === 0) {
      const arrow = document.createElement("div");
      arrow.className = "arrow";
      arrow.textContent = "⇄";
      canvas.appendChild(arrow);
    }

    const nodeEl = document.createElement("div");
    nodeEl.className = "node";
    nodeEl.textContent = node.value;

    if (index === highlightIndex) {
      nodeEl.classList.add("highlight");
    }

    if (index === 0) nodeEl.appendChild(label("HEAD", "head"));
    if (index === nodes.length - 1) nodeEl.appendChild(label("TAIL", "tail"));

    if (currentIndex !== null && index === currentIndex) nodeEl.appendChild(label("CURR", "current"));

    wrapper.appendChild(nodeEl);

    if (index < nodes.length - 1) {
      const arrow = document.createElement("div");
      arrow.className = "arrow";
      arrow.textContent = "⇄";
      arrow.style.fontSize = "1.8rem";

      if (index === animateArrowFromIndex) {
        arrow.classList.add("grow");
      }

      wrapper.appendChild(arrow);
    }

    canvas.appendChild(wrapper);
  });

  if (nodes.length > 0) {
    const wrapper = document.createElement("div");
    wrapper.className = "node-wrapper";

    const arrow = document.createElement("div");
    arrow.className = "arrow";
    arrow.textContent = "⇄";

    if (animateArrowFromIndex === nodes.length - 1) {
      arrow.classList.add("grow");
    }

    canvas.appendChild(arrow);

    const nullNode = makeNull();
    canvas.appendChild(nullNode);
  } else {
  }
}

function label(text, cls) {
  const l = document.createElement("div");
  l.className = `node-label ${cls}`;
  l.textContent = text;
  return l;
}

function makeNull() {
  const n = document.createElement("div");
  n.className = "null-node";
  n.textContent = "null";
  return n;
}
