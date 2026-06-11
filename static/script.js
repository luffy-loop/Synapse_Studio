let chart = null;


// Generate Random Array
function generateRandomArray() {

    const size = parseInt(
        document.getElementById("arraySize").value
    );

    let arr = [];

    for (let i = 0; i < size; i++) {

        arr.push(
            Math.floor(
                Math.random() * 10000
            )
        );
    }

    document.getElementById("numbers").value =
        arr.join(", ");
}


// Compare Algorithms
async function compareSorts() {

    const input =
        document.getElementById("numbers").value;

    if (input.trim() === "") {

        alert("Please enter numbers or generate an array.");
        return;
    }

    let arr = input
        .split(",")
        .map(item => Number(item.trim()));

    if (arr.some(isNaN)) {

        alert("Invalid input detected.");
        return;
    }

    try {

        const response =
            await fetch("/compare", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    numbers: arr
                })
            });

        const data =
            await response.json();

        let winner = "Bubble Sort";

        const fastest =
            Math.min(
                data.bubble,
                data.merge,
                data.quick
            );

        if (fastest === data.merge) {
            winner = "Merge Sort";
        }

        if (fastest === data.quick) {
            winner = "Quick Sort";
        }

        document.getElementById("stats").innerHTML =
            `
            Array Size: ${arr.length}
            `;

        document.getElementById("result").innerHTML =
            `
            <table>

                <tr>
                    <th>Algorithm</th>
                    <th>Execution Time (ms)</th>
                    <th>Complexity</th>
                </tr>

                <tr>
                    <td>Bubble Sort</td>
                    <td>${data.bubble}</td>
                    <td>O(n²)</td>
                </tr>

                <tr>
                    <td>Merge Sort</td>
                    <td>${data.merge}</td>
                    <td>O(n log n)</td>
                </tr>

                <tr>
                    <td>Quick Sort</td>
                    <td>${data.quick}</td>
                    <td>O(n log n)</td>
                </tr>

            </table>

            <div class="fastest">
                Fastest Algorithm: ${winner}
            </div>
            `;

        document.getElementById("sortedOutput").innerHTML =
            `
            <h3>Sorted Output Preview</h3>

            <p>
                ${data.sorted.slice(0, 100).join(", ")}
            </p>
            `;

        drawChart(
            data.bubble,
            data.merge,
            data.quick
        );

    }

    catch (error) {

        console.error(error);

        alert(
            "Unable to connect to Flask backend."
        );
    }
}


// Draw Chart
function drawChart(
    bubble,
    merge,
    quick
) {

    const ctx =
        document.getElementById("chart");

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {

        type: "bar",

        data: {

            labels: [
                "Bubble Sort",
                "Merge Sort",
                "Quick Sort"
            ],

            datasets: [{

                label:
                    "Execution Time (ms)",

                data: [
                    bubble,
                    merge,
                    quick
                ],

                backgroundColor: [
                    "#111827",
                    "#6b7280",
                    "#d1d5db"
                ],

                borderRadius: 8
            }]
        },

        options: {

            responsive: true,

            plugins: {

                legend: {
                    display: false
                }
            },

            scales: {

                y: {

                    beginAtZero: true
                }
            }
        }
    });
}