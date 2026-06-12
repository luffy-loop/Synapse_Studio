const algorithmInfo = {

    "Linear Search": {
        type: "Sequential Search",
        best: "O(1)",
        average: "O(n)",
        worst: "O(n)"
    },

    "Binary Search": {
        type: "Divide and Conquer",
        best: "O(1)",
        average: "O(log n)",
        worst: "O(log n)"
    }

};

function selectAlgorithm(algorithm, button)
{
    document.getElementById("algorithm").value = algorithm;

    document
    .querySelectorAll(".algo-btn")
    .forEach(btn =>
        btn.classList.remove("active")
    );

    button.classList.add("active");

    updateAlgorithmInfo();
}

function updateAlgorithmInfo()
{
    const algorithm =
    document.getElementById(
        "algorithm"
    ).value;

    const info =
    algorithmInfo[algorithm];

    document.getElementById(
        "algorithmInfo"
    ).innerHTML =

    `
    <div class="algo-grid">

        <div class="algo-box">
            <h4>Algorithm</h4>
            <p>${algorithm}</p>
        </div>

        <div class="algo-box">
            <h4>Type</h4>
            <p>${info.type}</p>
        </div>

        <div class="algo-box">
            <h4>Best Case</h4>
            <p>${info.best}</p>
        </div>

        <div class="algo-box">
            <h4>Average Case</h4>
            <p>${info.average}</p>
        </div>

        <div class="algo-box">
            <h4>Worst Case</h4>
            <p>${info.worst}</p>
        </div>

        <div class="algo-box">
            <h4>Requirement</h4>
            <p>
                ${algorithm === "Binary Search"
                ? "Sorted Array Required"
                : "Works On Any Array"}
            </p>
        </div>

    </div>
    `;
}

function generateArray()
{
    const arr = [];

    for(let i = 0; i < 12; i++)
    {
        arr.push(
            Math.floor(
                Math.random() * 100
            ) + 1
        );
    }

    document.getElementById(
        "arrayInput"
    ).value =
    arr.join(", ");

    renderArray(arr);
}

function renderArray(arr)
{
    const container =
    document.getElementById(
        "arrayBars"
    );

    container.innerHTML = "";

    arr.forEach(value => {

        const item =
        document.createElement("div");

        item.className =
        "array-item";

        item.textContent =
        value;

        container.appendChild(item);

    });
}

function sleep(ms)
{
    return new Promise(
        resolve =>
        setTimeout(resolve, ms)
    );
}

async function linearSearch(
    arr,
    target
)
{
    const items =
    document.querySelectorAll(
        ".array-item"
    );

    let comparisons = 0;

    const startTime =
    performance.now();

    for(let i = 0; i < arr.length; i++)
    {
        comparisons++;

        document.getElementById(
            "comparisons"
        ).textContent =
        comparisons;

        items[i].classList.add(
            "checking"
        );

        document.getElementById(
            "currentStep"
        ).textContent =

        `Checking value ${arr[i]} at index ${i}`;

        await sleep(500);

        if(arr[i] === target)
        {
            items[i].classList.remove(
                "checking"
            );

            items[i].classList.add(
                "found"
            );

            const endTime =
            performance.now();

            document.getElementById(
                "executionTime"
            ).textContent =

            `${(
                endTime - startTime
            ).toFixed(2)} ms`;

            document.getElementById(
                "searchStatus"
            ).textContent =

            `Found at index ${i}`;

            return;
        }

        items[i].classList.remove(
            "checking"
        );
    }

    const endTime =
    performance.now();

    document.getElementById(
        "executionTime"
    ).textContent =

    `${(
        endTime - startTime
    ).toFixed(2)} ms`;

    document.getElementById(
        "searchStatus"
    ).textContent =

    "Not Found";
}

async function binarySearch(
    arr,
    target
)
{
    arr.sort(
        (a,b)=>a-b
    );

    renderArray(arr);

    const items =
    document.querySelectorAll(
        ".array-item"
    );

    let left = 0;
    let right =
    arr.length - 1;

    let comparisons = 0;

    const startTime =
    performance.now();

    while(left <= right)
    {
        let mid =
        Math.floor(
            (left + right) / 2
        );

        comparisons++;

        document.getElementById(
            "comparisons"
        ).textContent =
        comparisons;

        items[mid].classList.add(
            "checking"
        );

        document.getElementById(
            "currentStep"
        ).textContent =

        `Checking middle value ${arr[mid]}`;

        await sleep(700);

        if(arr[mid] === target)
        {
            items[mid].classList.remove(
                "checking"
            );

            items[mid].classList.add(
                "found"
            );

            const endTime =
            performance.now();

            document.getElementById(
                "executionTime"
            ).textContent =

            `${(
                endTime - startTime
            ).toFixed(2)} ms`;

            document.getElementById(
                "searchStatus"
            ).textContent =

            `Found at index ${mid}`;

            return;
        }

        if(arr[mid] < target)
        {
            items[mid].classList.remove(
                "checking"
            );

            left = mid + 1;
        }
        else
        {
            items[mid].classList.remove(
                "checking"
            );

            right = mid - 1;
        }
    }

    const endTime =
    performance.now();

    document.getElementById(
        "executionTime"
    ).textContent =

    `${(
        endTime - startTime
    ).toFixed(2)} ms`;

    document.getElementById(
        "searchStatus"
    ).textContent =

    "Not Found";
}

async function runSearch()
{
    const input =
    document.getElementById(
        "arrayInput"
    ).value;

    if(!input.trim())
    {
        alert(
            "Please enter an array."
        );
        return;
    }

    const target =
    parseInt(
        document.getElementById(
            "targetValue"
        ).value
    );

    if(isNaN(target))
    {
        alert(
            "Enter a target value."
        );
        return;
    }

    document.getElementById(
        "comparisons"
    ).textContent = "0";

    document.getElementById(
        "executionTime"
    ).textContent = "0 ms";

    document.getElementById(
        "searchStatus"
    ).textContent = "Searching...";

    const arr =
    input
    .split(",")
    .map(num =>
        parseInt(
            num.trim()
        )
    );

    renderArray(arr);

    const algorithm =
    document.getElementById(
        "algorithm"
    ).value;

    if(
        algorithm ===
        "Linear Search"
    )
    {
        await linearSearch(
            arr,
            target
        );
    }
    else
    {
        await binarySearch(
            arr,
            target
        );
    }
}

window.onload = function()
{
    updateAlgorithmInfo();
};