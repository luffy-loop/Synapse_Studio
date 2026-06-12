const algorithms = {

bubble: {
title: "Bubble Sort",
definition:
"Bubble Sort repeatedly compares adjacent elements and swaps them if they are in the wrong order.",
best: "O(n)",
average: "O(n²)",
worst: "O(n²)",
advantage: "Easy to understand and implement.",
disadvantage: "Very slow for large datasets.",
application: "Educational purposes and small datasets."
},

selection: {
title: "Selection Sort",
definition:
"Selection Sort repeatedly finds the minimum element and places it in the correct position.",
best: "O(n²)",
average: "O(n²)",
worst: "O(n²)",
advantage: "Performs fewer swaps.",
disadvantage: "Poor performance on large data.",
application: "Memory-constrained environments."
},

insertion: {
title: "Insertion Sort",
definition:
"Insertion Sort builds the sorted array one element at a time.",
best: "O(n)",
average: "O(n²)",
worst: "O(n²)",
advantage: "Efficient for small datasets.",
disadvantage: "Slow for large datasets.",
application: "Nearly sorted arrays."
},

merge: {
title: "Merge Sort",
definition:
"Merge Sort uses divide-and-conquer by recursively splitting and merging arrays.",
best: "O(n log n)",
average: "O(n log n)",
worst: "O(n log n)",
advantage: "Stable and efficient.",
disadvantage: "Requires extra memory.",
application: "Large datasets and external sorting."
},

quick: {
title: "Quick Sort",
definition:
"Quick Sort partitions data around a pivot and recursively sorts subarrays.",
best: "O(n log n)",
average: "O(n log n)",
worst: "O(n²)",
advantage: "Very fast in practice.",
disadvantage: "Worst case can be slow.",
application: "General-purpose sorting."
},

bfs: {
title: "Breadth First Search (BFS)",
definition:
"BFS explores nodes level-by-level using a queue.",
best: "O(V + E)",
average: "O(V + E)",
worst: "O(V + E)",
advantage: "Finds shortest path in unweighted graphs.",
disadvantage: "Uses more memory.",
application: "Social networks and shortest path problems."
},

dfs: {
title: "Depth First Search (DFS)",
definition:
"DFS explores deeply before backtracking using a stack.",
best: "O(V + E)",
average: "O(V + E)",
worst: "O(V + E)",
advantage: "Memory efficient.",
disadvantage: "May not find shortest path.",
application: "Maze solving and cycle detection."
},

ucs: {
title: "Uniform Cost Search",
definition:
"UCS expands the node with the lowest path cost first.",
best: "O(E log V)",
average: "O(E log V)",
worst: "O(E log V)",
advantage: "Optimal solution guaranteed.",
disadvantage: "Can be computationally expensive.",
application: "Weighted pathfinding."
},

greedy: {
title: "Greedy Best First Search",
definition:
"Greedy Search expands nodes with the best heuristic value.",
best: "O(E log V)",
average: "O(E log V)",
worst: "O(E log V)",
advantage: "Fast execution.",
disadvantage: "Not always optimal.",
application: "Route estimation."
},

astar: {
title: "A* Search",
definition:
"A* combines actual cost and heuristic cost using f(n)=g(n)+h(n).",
best: "O(E log V)",
average: "O(E log V)",
worst: "O(E log V)",
advantage: "Optimal and complete.",
disadvantage: "Requires a good heuristic.",
application: "Games, robotics and navigation."
},

linear: {
title: "Linear Search",
definition:
"Linear Search checks each element sequentially until the target is found.",
best: "O(1)",
average: "O(n)",
worst: "O(n)",
advantage: "Works on unsorted arrays.",
disadvantage: "Slow for large datasets.",
application: "Small datasets."
},

binary: {
title: "Binary Search",
definition:
"Binary Search repeatedly divides the search space in half.",
best: "O(1)",
average: "O(log n)",
worst: "O(log n)",
advantage: "Extremely fast.",
disadvantage: "Requires sorted data.",
application: "Databases and large sorted collections."
}

};

function showAlgorithm(key)
{
    const algo = algorithms[key];

    document.getElementById(
        "algoTitle"
    ).innerText =
    algo.title;

    document.getElementById(
        "algoContent"
    ).innerHTML =

    `
    <div class="definition-box">

        <h3>Definition</h3>

        <p>
            ${algo.definition}
        </p>

    </div>

    <div class="info-grid">

        <div class="info-card">

            <h3>Best Case</h3>

            <p>
                ${algo.best}
            </p>

        </div>

        <div class="info-card">

            <h3>Average Case</h3>

            <p>
                ${algo.average}
            </p>

        </div>

        <div class="info-card">

            <h3>Worst Case</h3>

            <p>
                ${algo.worst}
            </p>

        </div>

        <div class="info-card">

            <h3>Advantage</h3>

            <p>
                ${algo.advantage}
            </p>

        </div>

        <div class="info-card">

            <h3>Disadvantage</h3>

            <p>
                ${algo.disadvantage}
            </p>

        </div>

        <div class="info-card">

            <h3>Application</h3>

            <p>
                ${algo.application}
            </p>

        </div>

    </div>
    `;
}

function filterAlgorithms()
{
    const input =
    document
    .getElementById(
        "searchBox"
    )
    .value
    .toLowerCase();

    const buttons =
    document
    .querySelectorAll(
        "#algorithmList button"
    );

    buttons.forEach(button => {

        const text =
        button.innerText
        .toLowerCase();

        if(text.includes(input))
        {
            button.style.display =
            "block";
        }
        else
        {
            button.style.display =
            "none";
        }

    });
}

window.onload = function()
{
    showAlgorithm("bubble");
};