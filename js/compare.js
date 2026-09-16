let currentType = "sorting";
let dataset = [];
const benchmarkRuns = 3;
let comparisonRuns = 0;

function selectType(type, button)
{
    currentType = type;

    document.querySelectorAll(".type-btn").forEach(btn =>
        btn.classList.remove("active")
    );

    button.classList.add("active");
    updateSummary();
}

function generateDataset()
{
    const size = parseInt(document.getElementById("arraySize").value);

    if(!Number.isFinite(size) || size < 10 || size > 5000)
    {
        alert("Dataset size must be between 10 and 5000");
        return;
    }

    dataset = [];

    for(let i = 0; i < size; i++)
    {
        dataset.push(Math.floor(Math.random() * 1000));
    }

    document.getElementById("datasetPreview").innerText =
        dataset.slice(0,20).join(", ") + (dataset.length > 20 ? " ..." : "");

    updateSummary();
}

function bubbleSort(arr)
{
    for(let i=0;i<arr.length;i++)
        for(let j=0;j<arr.length-i-1;j++)
            if(arr[j] > arr[j+1])
                [arr[j],arr[j+1]] = [arr[j+1],arr[j]];

    return arr;
}

function selectionSort(arr)
{
    for(let i=0;i<arr.length;i++)
    {
        let min=i;

        for(let j=i+1;j<arr.length;j++)
            if(arr[j] < arr[min]) min=j;

        [arr[i],arr[min]] = [arr[min],arr[i]];
    }

    return arr;
}

function insertionSort(arr)
{
    for(let i=1;i<arr.length;i++)
    {
        let key=arr[i];
        let j=i-1;

        while(j>=0 && arr[j]>key)
        {
            arr[j+1]=arr[j];
            j--;
        }

        arr[j+1]=key;
    }

    return arr;
}

function mergeSort(arr)
{
    if(arr.length<=1) return arr;

    const mid=Math.floor(arr.length/2);
    const left=mergeSort(arr.slice(0,mid));
    const right=mergeSort(arr.slice(mid));

    return merge(left,right);
}

function merge(left,right)
{
    const result=[];

    while(left.length && right.length)
    {
        if(left[0]<right[0]) result.push(left.shift());
        else result.push(right.shift());
    }

    return [...result,...left,...right];
}

function quickSort(arr)
{
    if(arr.length<=1) return arr;

    const pivot=arr[arr.length-1];
    const left=[];
    const right=[];

    for(let i=0;i<arr.length-1;i++)
    {
        if(arr[i]<pivot) left.push(arr[i]);
        else right.push(arr[i]);
    }

    return [...quickSort(left),pivot,...quickSort(right)];
}

function median(values)
{
    const a=[...values].sort((x,y)=>x-y);
    return a[Math.floor(a.length/2)];
}

function measure(fn,array)
{
    const times=[];

    for(let i=0;i<benchmarkRuns;i++)
    {
        const copy=[...array];
        const start=performance.now();
        fn(copy);
        times.push(performance.now()-start);
    }

    return median(times).toFixed(3);
}

function compareSorting()
{
    const results=[
        {name:"Bubble Sort",time:measure(bubbleSort,dataset),complexity:"O(n²)"},
        {name:"Selection Sort",time:measure(selectionSort,dataset),complexity:"O(n²)"},
        {name:"Insertion Sort",time:measure(insertionSort,dataset),complexity:"O(n²)"},
        {name:"Merge Sort",time:measure(mergeSort,dataset),complexity:"O(n log n)"},
        {name:"Quick Sort",time:measure(quickSort,dataset),complexity:"O(n log n)"}
    ];

    renderResults(results);
}

function compareSearching()
{
    const target=dataset[Math.floor(Math.random()*dataset.length)];
    const linearTimes=[];
    const binaryTimes=[];
    const sorted=[...dataset].sort((a,b)=>a-b);

    for(let i=0;i<benchmarkRuns;i++)
    {
        let start=performance.now();
        dataset.indexOf(target);
        linearTimes.push(performance.now()-start);

        start=performance.now();
        let left=0;
        let right=sorted.length-1;

        while(left<=right)
        {
            const mid=Math.floor((left+right)/2);

            if(sorted[mid]===target) break;
            if(sorted[mid]<target) left=mid+1;
            else right=mid-1;
        }

        binaryTimes.push(performance.now()-start);
    }

    renderResults([
        {name:"Linear Search",time:median(linearTimes).toFixed(3),complexity:"O(n)"},
        {name:"Binary Search",time:median(binaryTimes).toFixed(3),complexity:"O(log n)"}
    ]);
}

function runComparison()
{
    if(dataset.length===0)
    {
        alert("Generate dataset first");
        return;
    }

    if(currentType==="sorting") compareSorting();
    else compareSearching();

    comparisonRuns++;
    updateSummary();
}

function updateSummary()
{
    const size=document.getElementById("summarySize");
    const runs=document.getElementById("summaryRuns");
    const type=document.getElementById("summaryType");

    if(size) size.innerText=dataset.length;
    if(runs) runs.innerText=comparisonRuns;
    if(type) type.innerText=currentType==="sorting" ? "Sorting" : "Searching";
}

function renderResults(results)
{
    const table=document.getElementById("resultsBody");
    table.innerHTML="";

    results.forEach(item=>
    {
        table.innerHTML+=`<tr><td>${item.name}</td><td>${item.time} ms median</td><td>${item.complexity}</td></tr>`;
    });

    const winner=results.reduce((a,b)=>
        parseFloat(a.time)<parseFloat(b.time) ? a : b
    );

    document.getElementById("winnerName").innerText=winner.name;
    document.getElementById("winnerTime").innerText=winner.time+" ms median";
    document.getElementById("benchmarkStatus").innerText=
        `Completed ${benchmarkRuns} timing samples per algorithm on ${dataset.length} items.`;

    renderChart(results);
    renderComplexity(results);
}

function renderChart(results)
{
    const chart=document.getElementById("chartContainer");
    chart.innerHTML="";

    const maxTime=Math.max(...results.map(r=>parseFloat(r.time)));

    results.forEach(item=>
    {
        const width=maxTime===0 ? 0 : parseFloat(item.time)/maxTime*100;

        chart.innerHTML+=`<div class="chart-row"><div class="chart-label">${item.name}</div><div class="chart-bar" style="width:${width}%;"></div><span>${item.time} ms</span></div>`;
    });
}

function renderComplexity(results)
{
    const grid=document.getElementById("complexityGrid");
    grid.innerHTML="";

    results.forEach(item=>
    {
        grid.innerHTML+=`<div class="complexity-box"><h3>${item.name}</h3><p>${item.complexity}</p></div>`;
    });
}

window.onload=function()
{
    generateDataset();
    compareSorting();
};