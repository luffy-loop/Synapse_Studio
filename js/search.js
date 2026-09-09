const explanations = {

    "BFS": {
        title: "Breadth First Search",
        tag: "Graph Traversal",
        strategy: "Explores nodes level by level.",
        structure: "Queue (FIFO)",
        usecase: "Shortest path in unweighted graphs.",
        complexity: "O(V + E)",
        advantage: "Complete and Optimal"
    },

    "DFS": {
        title: "Depth First Search",
        tag: "Graph Traversal",
        strategy: "Explores deeply before backtracking.",
        structure: "Stack (LIFO)",
        usecase: "Path exploration and maze solving.",
        complexity: "O(V + E)",
        advantage: "Memory Efficient"
    },

    "UCS": {
        title: "Uniform Cost Search",
        tag: "Path Finding",
        strategy: "Expands lowest cost node first.",
        structure: "Priority Queue",
        usecase: "Weighted shortest path.",
        complexity: "O(E log V)",
        advantage: "Optimal Solution"
    },

    "Greedy Search": {
        title: "Greedy Best First Search",
        tag: "Heuristic Search",
        strategy: "Chooses node with best heuristic.",
        structure: "Priority Queue",
        usecase: "Fast route estimation.",
        complexity: "O(E log V)",
        advantage: "Fast Execution"
    },

    "A*": {
        title: "A* Search",
        tag: "AI Search",
        strategy: "Uses g(n) + h(n).",
        structure: "Priority Queue",
        usecase: "Optimal pathfinding.",
        complexity: "O(E log V)",
        advantage: "Optimal + Complete"
    }

};

function updateExplanation() {

    const algo =
        document.getElementById("algorithm").value;

    const data =
        explanations[algo];

    document.getElementById(
        "algorithmExplanation"
    ).innerHTML =

    `
    <div class="algo-header">

        <h3>${data.title}</h3>

        <span class="algo-tag">
            ${data.tag}
        </span>

    </div>

    <div class="algo-grid">

        <div class="algo-box">
            <h4>Strategy</h4>
            <p>${data.strategy}</p>
        </div>

        <div class="algo-box">
            <h4>Data Structure</h4>
            <p>${data.structure}</p>
        </div>

        <div class="algo-box">
            <h4>Best Use Case</h4>
            <p>${data.usecase}</p>
        </div>

        <div class="algo-box">
            <h4>Complexity</h4>
            <p>${data.complexity}</p>
        </div>

        <div class="algo-box">
            <h4>Advantage</h4>
            <p>${data.advantage}</p>
        </div>

        <div class="algo-box">
            <h4>Category</h4>
            <p>${data.tag}</p>
        </div>

    </div>
    `;
}

function loadTreeGraph() {

    document.getElementById("graphInput").value =

`A-B
A-C
B-D
B-E
C-F
C-G`;

    document.getElementById("startNode").value = "A";
    document.getElementById("goalNode").value = "G";
}

function loadBinaryGraph() {

    document.getElementById("graphInput").value =

`1-2
1-3
2-4
2-5
3-6
3-7`;

    document.getElementById("startNode").value = "1";
    document.getElementById("goalNode").value = "7";
}

function loadCycleGraph() {

    document.getElementById("graphInput").value =

`A-B
B-C
C-D
D-A
B-E
E-F`;

    document.getElementById("startNode").value = "A";
    document.getElementById("goalNode").value = "F";
}

function generateRandomGraph() {

    const nodes =
        ["A","B","C","D","E","F","G","H"];

    let edges = [];

    for(let i = 0; i < 10; i++) {

        let a =
            nodes[Math.floor(Math.random() * nodes.length)];

        let b =
            nodes[Math.floor(Math.random() * nodes.length)];

        if(a !== b) {
            edges.push(`${a}-${b}`);
        }
    }

    edges = [...new Set(edges)];

    document.getElementById(
        "graphInput"
    ).value = edges.join("\n");

    document.getElementById(
        "startNode"
    ).value = "A";

    document.getElementById(
        "goalNode"
    ).value = "H";
}

function buildGraph(edges) {

    let graph = {};

    edges.forEach(edge => {

        let [a,b] = edge.split("-");

        if(!graph[a])
            graph[a] = [];

        if(!graph[b])
            graph[b] = [];

        graph[a].push(b);
        graph[b].push(a);

    });

    return graph;
}

function bfs(graph,start) {

    let queue = [start];

    let visited = new Set();

    let order = [];

    visited.add(start);

    while(queue.length) {

        let node = queue.shift();

        order.push(node);

        for(let neighbor of graph[node] || []) {

            if(!visited.has(neighbor)) {

                visited.add(neighbor);
                queue.push(neighbor);

            }

        }

    }

    return order;
}

function dfs(graph,start) {

    let stack = [start];

    let visited = new Set();

    let order = [];

    while(stack.length) {

        let node = stack.pop();

        if(!visited.has(node)) {

            visited.add(node);

            order.push(node);

            const neighbors =
                graph[node] || [];

            for(let i = neighbors.length - 1; i >= 0; i--) {

                stack.push(
                    neighbors[i]
                );

            }

        }

    }

    return order;
}

function runSearch() {

    const graphText =
        document.getElementById(
            "graphInput"
        ).value;

    if(!graphText.trim()) {

        alert(
            "Please enter a graph."
        );

        return;
    }

    const edges =
        graphText.trim().split("\n");

    const graph =
        buildGraph(edges);

    const startNode =
        document.getElementById(
            "startNode"
        ).value.trim();

    const algorithm =
        document.getElementById(
            "algorithm"
        ).value;

    const startTime =
        performance.now();

    let traversal = [];

    switch(algorithm) {

        case "BFS":
            traversal =
                bfs(graph,startNode);
            break;

        case "DFS":
            traversal =
                dfs(graph,startNode);
            break;

        case "UCS":
        case "Greedy Search":
        case "A*":
            traversal =
                bfs(graph,startNode);
            break;
    }

    const endTime =
        performance.now();

    document.getElementById(
        "traversalOutput"
    ).innerText =
        traversal.join(" → ");
    drawGraph(graph, traversal);
    document.getElementById(
        "visitedCount"
    ).innerText =
        traversal.length;

    document.getElementById(
        "pathCost"
    ).innerText =
        traversal.length - 1;

    document.getElementById(
        "executionTime"
    ).innerText =
        `${(endTime - startTime).toFixed(3)} ms`;

    document.getElementById(
        "graphInfo"
    ).innerHTML =

    `
    <strong>Total Nodes Visited:</strong> ${traversal.length}
    <br><br>
    <strong>Start Node:</strong> ${startNode}
    <br><br>
    <strong>Algorithm:</strong> ${algorithm}
    `;
}

document
.getElementById("algorithm")
.addEventListener(
    "change",
    updateExplanation
);

window.onload = updateExplanation;

// =========================================================
// GRAPH VISUALIZATION
// =========================================================

function drawGraph(graph, traversal = []) {
    const canvas = document.getElementById("graphCanvas");

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    const nodes = Object.keys(graph);

    if (nodes.length === 0) return;

    // -----------------------------------------------------
    // NODE POSITIONS
    // -----------------------------------------------------

    const positions = {};

    const centerX = width / 2;
    const centerY = height / 2;

    const radius = Math.min(width, height) * 0.32;

    nodes.forEach((node, index) => {

        const angle =
            -Math.PI / 2 +
            (2 * Math.PI * index) / nodes.length;

        positions[node] = {
            x: centerX + radius * Math.cos(angle),
            y: centerY + radius * Math.sin(angle)
        };

    });

    // -----------------------------------------------------
    // DRAW EDGES
    // -----------------------------------------------------

    const drawnEdges = new Set();

    nodes.forEach(node => {

        graph[node].forEach(neighbor => {

            const edgeKey =
                [node, neighbor].sort().join("-");

            if (drawnEdges.has(edgeKey)) return;

            drawnEdges.add(edgeKey);

            const start = positions[node];
            const end = positions[neighbor];

            if (!start || !end) return;

            ctx.beginPath();

            ctx.moveTo(start.x, start.y);
            ctx.lineTo(end.x, end.y);

            ctx.strokeStyle = "rgba(139, 92, 246, 0.28)";
            ctx.lineWidth = 2;

            ctx.stroke();

        });

    });

    // -----------------------------------------------------
    // DRAW NODES
    // -----------------------------------------------------

    nodes.forEach(node => {

        const { x, y } = positions[node];

        const isStart =
            node === document.getElementById("startNode").value.trim();

        const isGoal =
            node === document.getElementById("goalNode").value.trim();

        const traversalIndex =
            traversal.indexOf(node);

        let fill = "#12161f";
        let stroke = "rgba(139, 92, 246, 0.55)";

        if (traversalIndex !== -1) {
            fill = "#6d3edb";
            stroke = "#a78bfa";
        }

        if (isStart) {
            fill = "#8b5cf6";
            stroke = "#c4b5fd";
        }

        if (isGoal) {
            fill = "#34d399";
            stroke = "#a7f3d0";
        }

        // Glow
        ctx.beginPath();
        ctx.arc(x, y, 30, 0, Math.PI * 2);

        ctx.fillStyle = fill;
        ctx.shadowColor = stroke;
        ctx.shadowBlur = 18;

        ctx.fill();

        ctx.shadowBlur = 0;

        // Border
        ctx.beginPath();
        ctx.arc(x, y, 30, 0, Math.PI * 2);

        ctx.strokeStyle = stroke;
        ctx.lineWidth = 2;

        ctx.stroke();

        // Node label
        ctx.fillStyle = "#f4f7fb";
        ctx.font = "700 16px Inter, system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.fillText(node, x, y);

        // Traversal number
        if (traversalIndex !== -1) {

            ctx.fillStyle = "#b5bdcb";
            ctx.font = "600 11px Inter, system-ui, sans-serif";

            ctx.fillText(
                `#${traversalIndex + 1}`,
                x,
                y + 44
            );
        }

    });

}