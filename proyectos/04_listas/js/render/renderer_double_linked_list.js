export function renderDoubleLinkedList(list, currentIndex = null, highlightIndex = null) {
  const canvas = document.getElementById("canvasdll");
  if (!canvas) return;
  canvas.innerHTML = "";

  const nodes = list.toArray();

  canvas.appendChild(makeNull());


  if (nodes.length > 0) {
    const startArrow = document.createElement("div");
    startArrow.className = "arrow";
    startArrow.textContent = "⇄"; // or ⇋ 
    startArrow.style.opacity = "0.5"; // Dim initial arrow
    //canvas.appendChild(startArrow);
  }

  nodes.forEach((node, index) => {
    const wrapper = document.createElement("div");
    wrapper.className = "node-wrapper";

    // Node
    const nodeEl = document.createElement("div");
    nodeEl.className = "node";
    nodeEl.textContent = node.value;

    if (index === highlightIndex) {
      nodeEl.classList.add("highlight");
    }

    if (index === 0) nodeEl.appendChild(label("HEAD", "head"));
    if (index === nodes.length - 1) nodeEl.appendChild(label("TAIL", "tail"));
    if (index === currentIndex) nodeEl.appendChild(label("CURR", "current"));

    wrapper.appendChild(nodeEl);

    if (index < nodes.length - 1) {
      const arrow = document.createElement("div");
      arrow.className = "arrow";
      arrow.textContent = "⇄";
      arrow.style.fontSize = "1.8rem";
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
    wrapper.appendChild(arrow);

    const nullNode = makeNull();
    wrapper.appendChild(nullNode);
    canvas.appendChild(wrapper);
  } else {
    canvas.appendChild(makeNull());
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
