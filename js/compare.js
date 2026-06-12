let currentType = "sorting";

let dataset = [];

function selectType(type, button)
{
    currentType = type;

    document
    .querySelectorAll(".type-btn")
    .forEach(btn =>
        btn.classList.remove("active")
    );

    button.classList.add("active");
}

function generateDataset()
{
    const size =
    parseInt(
        document.getElementById(
            "arraySize"
        ).value
    );

    dataset = [];

    for(let i = 0; i < size; i++)
    {
        dataset.push(
            Math.floor(
                Math.random() * 1000
            )
        );
    }

    document.getElementById(
        "datasetPreview"
    ).innerText =

    dataset
    .slice(0,20)
    .join(", ")

    +

    (
        dataset.length > 20
        ? " ..."
        : ""
    );
}

function bubbleSort(arr)
{
    for(let i=0;i<arr.length;i++)
    {
        for(let j=0;j<arr.length-i-1;j++)
        {
            if(arr[j] > arr[j+1])
            {
                [arr[j],arr[j+1]] =
                [arr[j+1],arr[j]];
            }
        }
    }

    return arr;
}

function selectionSort(arr)
{
    for(let i=0;i<arr.length;i++)
    {
        let min=i;

        for(let j=i+1;j<arr.length;j++)
        {
            if(arr[j] < arr[min])
            {
                min=j;
            }
        }

        [arr[i],arr[min]] =
        [arr[min],arr[i]];
    }

    return arr;
}

function insertionSort(arr)
{
    for(let i=1;i<arr.length;i++)
    {
        let key = arr[i];

        let j = i - 1;

        while(
            j >= 0 &&
            arr[j] > key
        )
        {
            arr[j+1] = arr[j];
            j--;
        }

        arr[j+1] = key;
    }

    return arr;
}

function mergeSort(arr)
{
    if(arr.length <= 1)
    {
        return arr;
    }

    const mid =
    Math.floor(arr.length/2);

    const left =
    mergeSort(
        arr.slice(0,mid)
    );

    const right =
    mergeSort(
        arr.slice(mid)
    );

    return merge(left,right);
}

function merge(left,right)
{
    const result=[];

    while(
        left.length &&
        right.length
    )
    {
        if(left[0] < right[0])
        {
            result.push(
                left.shift()
            );
        }
        else
        {
            result.push(
                right.shift()
            );
        }
    }

    return [
        ...result,
        ...left,
        ...right
    ];
}

function quickSort(arr)
{
    if(arr.length <= 1)
    {
        return arr;
    }

    const pivot =
    arr[arr.length-1];

    const left = [];
    const right = [];

    for(let i=0;i<arr.length-1;i++)
    {
        if(arr[i] < pivot)
        {
            left.push(arr[i]);
        }
        else
        {
            right.push(arr[i]);
        }
    }

    return [
        ...quickSort(left),
        pivot,
        ...quickSort(right)
    ];
}

function measure(fn,array)
{
    const copy =
    [...array];

    const start =
    performance.now();

    fn(copy);

    const end =
    performance.now();

    return (
        end - start
    ).toFixed(3);
}

function compareSorting()
{
    const results = [

        {
            name:"Bubble Sort",
            time:measure(
                bubbleSort,
                dataset
            ),
            complexity:"O(n²)"
        },

        {
            name:"Selection Sort",
            time:measure(
                selectionSort,
                dataset
            ),
            complexity:"O(n²)"
        },

        {
            name:"Insertion Sort",
            time:measure(
                insertionSort,
                dataset
            ),
            complexity:"O(n²)"
        },

        {
            name:"Merge Sort",
            time:measure(
                mergeSort,
                dataset
            ),
            complexity:"O(n log n)"
        },

        {
            name:"Quick Sort",
            time:measure(
                quickSort,
                dataset
            ),
            complexity:"O(n log n)"
        }

    ];

    renderResults(results);
}

function compareSearching()
{
    const target =
    dataset[
        Math.floor(
            Math.random() *
            dataset.length
        )
    ];

    const startLinear =
    performance.now();

    dataset.indexOf(target);

    const endLinear =
    performance.now();

    const sorted =
    [...dataset].sort(
        (a,b)=>a-b
    );

    const startBinary =
    performance.now();

    let left = 0;
    let right =
    sorted.length - 1;

    while(left <= right)
    {
        const mid =
        Math.floor(
            (left + right) / 2
        );

        if(sorted[mid] === target)
        {
            break;
        }

        if(sorted[mid] < target)
        {
            left = mid + 1;
        }
        else
        {
            right = mid - 1;
        }
    }

    const endBinary =
    performance.now();

    const results = [

        {
            name:"Linear Search",
            time:
            (
                endLinear -
                startLinear
            ).toFixed(3),
            complexity:"O(n)"
        },

        {
            name:"Binary Search",
            time:
            (
                endBinary -
                startBinary
            ).toFixed(3),
            complexity:"O(log n)"
        }

    ];

    renderResults(results);
}

function runComparison()
{
    if(dataset.length === 0)
    {
        alert(
            "Generate dataset first"
        );
        return;
    }

    if(currentType === "sorting")
    {
        compareSorting();
    }
    else
    {
        compareSearching();
    }
}

function renderResults(results)
{
    const table =
    document.getElementById(
        "resultsBody"
    );

    table.innerHTML = "";

    results.forEach(item => {

        table.innerHTML +=

        `
        <tr>

            <td>${item.name}</td>

            <td>${item.time} ms</td>

            <td>${item.complexity}</td>

        </tr>
        `;

    });

    const winner =
    results.reduce((a,b)=>

        parseFloat(a.time)
        <
        parseFloat(b.time)

        ? a : b

    );

    document.getElementById(
        "winnerName"
    ).innerText =
    winner.name;

    document.getElementById(
        "winnerTime"
    ).innerText =
    winner.time + " ms";

    renderChart(results);

    renderComplexity(results);
}

function renderChart(results)
{
    const chart =
    document.getElementById(
        "chartContainer"
    );

    chart.innerHTML = "";

    const maxTime =
    Math.max(
        ...results.map(
            r =>
            parseFloat(r.time)
        )
    );

    results.forEach(item => {

        const width =

        (
            parseFloat(item.time)
            / maxTime
        ) * 100;

        chart.innerHTML +=

        `
        <div class="chart-row">

            <div class="chart-label">
                ${item.name}
            </div>

            <div
                class="chart-bar"
                style="
                width:${width}%;
                ">
            </div>

            <span>
                ${item.time} ms
            </span>

        </div>
        `;

    });
}

function renderComplexity(results)
{
    const grid =
    document.getElementById(
        "complexityGrid"
    );

    grid.innerHTML = "";

    results.forEach(item => {

        grid.innerHTML +=

        `
        <div class="complexity-box">

            <h3>
                ${item.name}
            </h3>

            <p>
                ${item.complexity}
            </p>

        </div>
        `;

    });
}

window.onload = function()
{
    generateDataset();

    compareSorting();
};