let currentArray = [];

const explanations = {

"Bubble Sort":
`Bubble Sort repeatedly compares adjacent elements and swaps them when they are in the wrong order.

Stable: Yes
In Place: Yes
Best Case: O(n)
Average Case: O(n²)
Worst Case: O(n²)`,

"Selection Sort":
`Selection Sort repeatedly selects the smallest element from the unsorted portion and places it at the beginning.

Stable: No
In Place: Yes
Best Case: O(n²)
Average Case: O(n²)
Worst Case: O(n²)`,

"Insertion Sort":
`Insertion Sort inserts elements into their correct position one by one.

Stable: Yes
In Place: Yes
Best Case: O(n)
Average Case: O(n²)
Worst Case: O(n²)`,

"Merge Sort":
`Merge Sort divides the array and merges sorted halves.

Stable: Yes
Space Required: O(n)
Best Case: O(n log n)
Average Case: O(n log n)
Worst Case: O(n log n)`,

"Quick Sort":
`Quick Sort uses a pivot and partitions the array.

Stable: No
Best Case: O(n log n)
Average Case: O(n log n)
Worst Case: O(n²)`
};

function generateRandomArray()
{
    const size =
    parseInt(
        document.getElementById(
            "arraySize"
        ).value
    );

    currentArray = [];

    for(let i=0;i<size;i++)
    {
        currentArray.push(
            Math.floor(
                Math.random()*100
            ) + 1
        );
    }

    document.getElementById(
        "arrayInput"
    ).value =
    currentArray.join(",");

    visualizeBars(currentArray);
}

function visualizeBars(arr)
{
    const container =
    document.getElementById(
        "bars-container"
    );

    container.innerHTML = "";

    arr.forEach(value=>{

        const bar =
        document.createElement("div");

        bar.classList.add("bar");

        bar.style.height =
        `${value * 3}px`;

        if(arr.length <= 20)
        {
            const label =
            document.createElement("span");

            label.innerText =
            value;

            bar.appendChild(label);
        }

        container.appendChild(bar);

    });
}

function visualizeSort()
{
    const input =
    document.getElementById(
        "arrayInput"
    ).value;

    if(!input.trim())
    {
        alert(
        "Enter an array first"
        );
        return;
    }

    currentArray =
    input
    .split(",")
    .map(num =>
        parseInt(num.trim())
    );

    document.getElementById(
        "originalArray"
    ).innerText =
    currentArray.join(", ");

    document.getElementById(
        "inputSize"
    ).innerText =
    currentArray.length;

    visualizeBars(currentArray);

    const algo =
    document.getElementById(
        "algorithm"
    ).value;

    switch(algo)
    {
        case "Bubble Sort":
            bubbleSortVisual();
            break;

        case "Selection Sort":
            selectionSortVisual();
            break;

        case "Insertion Sort":
            insertionSortVisual();
            break;

        case "Merge Sort":
            mergeSortVisual();
            break;

        case "Quick Sort":
            quickSortVisual();
            break;
    }
}

async function bubbleSortVisual()
{
    let arr =
    [...currentArray];

    let comparisons = 0;
    let swaps = 0;

    const bars =
    document.querySelectorAll(".bar");

    const start =
    performance.now();

    for(let i=0;i<arr.length;i++)
    {
        for(let j=0;j<arr.length-i-1;j++)
        {
            comparisons++;

            document.getElementById(
                "comparisons"
            ).innerText =
            comparisons;

            bars[j].style.background =
            "#ef4444";

            bars[j+1].style.background =
            "#ef4444";

            document.getElementById(
                "operation"
            ).innerText =
            `Comparing ${arr[j]} and ${arr[j+1]}`;

            await sleep(150);

            if(arr[j] > arr[j+1])
            {
                swaps++;

                document.getElementById(
                    "swaps"
                ).innerText =
                swaps;

                document.getElementById(
                    "operation"
                ).innerText =
                `Swapping ${arr[j]} and ${arr[j+1]}`;

                bars[j].style.background =
                "#f59e0b";

                bars[j+1].style.background =
                "#f59e0b";

                await sleep(150);

                let temp =
                arr[j];

                arr[j] =
                arr[j+1];

                arr[j+1] =
                temp;

                bars[j].style.height =
                `${arr[j]*3}px`;

                bars[j+1].style.height =
                `${arr[j+1]*3}px`;

                if(arr.length <= 20)
                {
                    bars[j].querySelector("span").innerText =
                    arr[j];

                    bars[j+1].querySelector("span").innerText =
                    arr[j+1];
                }
            }

            bars[j].style.background =
            "";

            bars[j+1].style.background =
            "";
        }

        bars[arr.length-i-1]
        .style.background =
        "#22c55e";
    }

    const end =
    performance.now();

    document.getElementById(
        "time"
    ).innerText =
    `${(end-start).toFixed(2)} ms`;

    document.getElementById(
        "sortedArray"
    ).innerText =
    arr.join(", ");

    document.getElementById(
        "statusText"
    ).innerText =
    "Completed";

    document.getElementById(
        "efficiency"
    ).innerText =
    "Low";

    document.getElementById(
        "operation"
    ).innerText =
    "Sorting Complete";
}


async function selectionSortVisual()
{
    let arr = [...currentArray];

    let comparisons = 0;
    let swaps = 0;

    const bars =
    document.querySelectorAll(".bar");

    const start =
    performance.now();

    for(let i=0;i<arr.length;i++)
    {
        let minIndex = i;

        for(let j=i+1;j<arr.length;j++)
        {
            comparisons++;

            document.getElementById(
                "comparisons"
            ).innerText =
            comparisons;

            bars[j].style.background =
            "#ef4444";

            bars[minIndex].style.background =
            "#f59e0b";

            await sleep(120);

            if(arr[j] < arr[minIndex])
            {
                minIndex = j;
            }

            bars[j].style.background = "";
        }

        if(minIndex !== i)
        {
            swaps++;

            document.getElementById(
                "swaps"
            ).innerText =
            swaps;

            [arr[i],arr[minIndex]] =
            [arr[minIndex],arr[i]];

            bars[i].style.height =
            `${arr[i]*3}px`;

            bars[minIndex].style.height =
            `${arr[minIndex]*3}px`;

            if(arr.length <= 20)
            {
                bars[i].querySelector("span").innerText =
                arr[i];

                bars[minIndex].querySelector("span").innerText =
                arr[minIndex];
            }
        }

        bars[i].style.background =
        "#22c55e";
    }

    const end =
    performance.now();

    document.getElementById(
        "time"
    ).innerText =
    `${(end-start).toFixed(2)} ms`;

    document.getElementById(
        "sortedArray"
    ).innerText =
    arr.join(", ");

    document.getElementById(
    "statusText"
).innerText =
"Completed";

document.getElementById(
    "efficiency"
).innerText =
"Medium";

document.getElementById(
    "operation"
).innerText =
"Selection Sort Complete";
}

async function insertionSortVisual()
{
    let arr = [...currentArray];

    let comparisons = 0;
    let swaps = 0;

    const bars =
    document.querySelectorAll(".bar");

    const start =
    performance.now();

    for(let i=1;i<arr.length;i++)
    {
        let key = arr[i];

        let j = i - 1;

        bars[i].style.background =
        "#f59e0b";

        await sleep(150);

        while(
            j >= 0 &&
            arr[j] > key
        )
        {
            comparisons++;

            document.getElementById(
                "comparisons"
            ).innerText =
            comparisons;

            bars[j].style.background =
            "#ef4444";

            await sleep(120);

            arr[j+1] = arr[j];

            bars[j+1].style.height =
            `${arr[j+1]*3}px`;

            if(arr.length <= 20)
            {
                bars[j+1]
                .querySelector("span")
                .innerText =
                arr[j+1];
            }

            swaps++;

            document.getElementById(
                "swaps"
            ).innerText =
            swaps;

            bars[j].style.background =
            "";

            j--;
        }

        arr[j+1] = key;

        bars[j+1].style.height =
        `${key*3}px`;

        if(arr.length <= 20)
        {
            bars[j+1]
            .querySelector("span")
            .innerText =
            key;
        }

        bars[i].style.background =
        "#22c55e";
    }

    document
    .querySelectorAll(".bar")
    .forEach(bar =>
    {
        bar.style.background =
        "#22c55e";
    });

    const end =
    performance.now();

    document.getElementById(
        "time"
    ).innerText =
    `${(end-start).toFixed(2)} ms`;

    document.getElementById(
        "sortedArray"
    ).innerText =
    arr.join(", ");

    document.getElementById(
    "statusText"
).innerText =
"Completed";

document.getElementById(
    "efficiency"
).innerText =
"Medium";

document.getElementById(
    "operation"
).innerText =
"Insertion Sort Complete";
}

async function mergeSortVisual()
{
    let arr = [...currentArray];

    let comparisons = 0;

    const start =
    performance.now();

    async function mergeSort(arr,left,right)
    {
        if(left >= right)
        {
            return;
        }

        const mid =
        Math.floor(
            (left + right) / 2
        );

        await mergeSort(
            arr,
            left,
            mid
        );

        await mergeSort(
            arr,
            mid + 1,
            right
        );

        await merge(
            arr,
            left,
            mid,
            right
        );
    }

    async function merge(
        arr,
        left,
        mid,
        right
    )
    {
        let temp = [];

        let i = left;
        let j = mid + 1;

        while(
            i <= mid &&
            j <= right
        )
        {
            comparisons++;

            document.getElementById(
                "comparisons"
            ).innerText =
            comparisons;

            if(arr[i] <= arr[j])
            {
                temp.push(arr[i]);
                i++;
            }
            else
            {
                temp.push(arr[j]);
                j++;
            }
        }

        while(i <= mid)
        {
            temp.push(arr[i]);
            i++;
        }

        while(j <= right)
        {
            temp.push(arr[j]);
            j++;
        }

        for(let k=0;k<temp.length;k++)
        {
            arr[left+k] =
            temp[k];

            updateBars(arr);

            await sleep(100);
        }
    }

    await mergeSort(
        arr,
        0,
        arr.length - 1
    );

    document
    .querySelectorAll(".bar")
    .forEach(bar =>
    {
        bar.style.background =
        "#22c55e";
    });

    const end =
    performance.now();

    document.getElementById(
        "time"
    ).innerText =
    `${(end-start).toFixed(2)} ms`;

    document.getElementById(
        "sortedArray"
    ).innerText =
    arr.join(", ");

   document.getElementById(
    "statusText"
).innerText =
"Completed";

document.getElementById(
    "efficiency"
).innerText =
"High";

document.getElementById(
    "operation"
).innerText =
"Merge Sort Complete";
}

async function quickSortVisual()
{
    let arr = [...currentArray];

    let comparisons = 0;
    let swaps = 0;

    const start =
    performance.now();

    async function quickSort(low,high)
    {
        if(low < high)
        {
            const pi =
            await partition(
                low,
                high
            );

            await quickSort(
                low,
                pi - 1
            );

            await quickSort(
                pi + 1,
                high
            );
        }
    }

    async function partition(low,high)
    {
        let pivot =
        arr[high];

        let i =
        low - 1;

        const bars =
        document.querySelectorAll(
            ".bar"
        );

        bars[high].style.background =
        "#8b5cf6";

        for(let j=low;j<high;j++)
        {
            comparisons++;

            document.getElementById(
                "comparisons"
            ).innerText =
            comparisons;

            bars[j].style.background =
            "#ef4444";

            await sleep(120);

            if(arr[j] < pivot)
            {
                i++;

                swaps++;

                document.getElementById(
                    "swaps"
                ).innerText =
                swaps;

                [arr[i],arr[j]] =
                [arr[j],arr[i]];

                updateBars(arr);

                await sleep(120);
            }

            bars[j].style.background =
            "";
        }

        [arr[i+1],arr[high]] =
        [arr[high],arr[i+1]];

        swaps++;

        document.getElementById(
            "swaps"
        ).innerText =
        swaps;

        updateBars(arr);

        bars[high].style.background =
        "";

        bars[i+1].style.background =
        "#22c55e";

        await sleep(120);

        return i + 1;
    }

    await quickSort(
        0,
        arr.length - 1
    );

    document
    .querySelectorAll(".bar")
    .forEach(bar =>
    {
        bar.style.background =
        "#22c55e";
    });

    const end =
    performance.now();

    document.getElementById(
        "time"
    ).innerText =
    `${(end-start).toFixed(2)} ms`;

    document.getElementById(
        "sortedArray"
    ).innerText =
    arr.join(", ");

    document.getElementById(
        "statusText"
    ).innerText =
    "Completed";

    document.getElementById(
        "operation"
    ).innerText =
    "Quick Sort Complete";

    document.getElementById(
        "efficiency"
    ).innerText =
    "High";
}

function updateComplexity()
{
    const algo =
    document.getElementById(
        "algorithm"
    ).value;

    document.getElementById(
        "algorithmInfo"
    ).innerText =
    explanations[algo];

    document.getElementById(
        "insightAlgorithm"
    ).innerText =
    algo;

    const complexity = {

        "Bubble Sort":
        ["O(n)","O(n²)","O(n²)","O(1)"],

        "Selection Sort":
        ["O(n²)","O(n²)","O(n²)","O(1)"],

        "Insertion Sort":
        ["O(n)","O(n²)","O(n²)","O(1)"],

        "Merge Sort":
        ["O(n log n)","O(n log n)","O(n log n)","O(n)"],

        "Quick Sort":
        ["O(n log n)","O(n log n)","O(n²)","O(log n)"]
    };

    const data =
    complexity[algo];

    document.getElementById(
        "bestCase"
    ).innerText =
    data[0];

    document.getElementById(
        "avgCase"
    ).innerText =
    data[1];

    document.getElementById(
        "worstCase"
    ).innerText =
    data[2];

    document.getElementById(
        "spaceCase"
    ).innerText =
    data[3];
}

function sleep(ms)
{
    return new Promise(
        resolve =>
        setTimeout(resolve, ms)
    );
}

function updateBars(arr)
{
    const bars =
    document.querySelectorAll(".bar");

    for(let i=0;i<arr.length;i++)
    {
        bars[i].style.height =
        `${arr[i]*3}px`;

        if(arr.length <= 20)
        {
            bars[i]
            .querySelector("span")
            .innerText =
            arr[i];
        }
    }
}

document
.getElementById(
    "algorithm"
)
.addEventListener(
    "change",
    updateComplexity
);

document
.getElementById(
    "algorithm"
)
.addEventListener(
    "change",
    updateComplexity
);

window.onload =
updateComplexity;

function resetSorting()
{
    currentArray = [];

    document.getElementById(
        "arrayInput"
    ).value = "";

    document.getElementById(
        "bars-container"
    ).innerHTML = "";

    document.getElementById(
        "originalArray"
    ).innerText = "Waiting...";

    document.getElementById(
        "sortedArray"
    ).innerText = "Waiting...";

    document.getElementById(
        "comparisons"
    ).innerText = "0";

    document.getElementById(
        "swaps"
    ).innerText = "0";

    document.getElementById(
        "time"
    ).innerText = "0 ms";

    document.getElementById(
        "operation"
    ).innerText =
    "Waiting for visualization...";

    document.getElementById(
        "statusText"
    ).innerText =
    "Ready";

    document.getElementById(
        "efficiency"
    ).innerText =
    "-";

    document.getElementById(
        "inputSize"
    ).innerText =
    "-";

    document.getElementById(
        "insightAlgorithm"
    ).innerText =
    document.getElementById(
        "algorithm"
    ).value;
}