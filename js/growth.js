const growthSizes=[10,25,50,100,250,500,1000];
const growthFns=[
    {name:"Bubble Sort",fn:bubbleSort,complexity:"O(n²)"},
    {name:"Selection Sort",fn:selectionSort,complexity:"O(n²)"},
    {name:"Insertion Sort",fn:insertionSort,complexity:"O(n²)"},
    {name:"Merge Sort",fn:mergeSort,complexity:"O(n log n)"},
    {name:"Quick Sort",fn:quickSort,complexity:"O(n log n)"}
];

function growthMeasure(fn,a){
    const t=[];
    for(let i=0;i<3;i++){
        const x=[...a];
        const s=performance.now();
        fn(x);
        t.push(performance.now()-s);
    }
    return parseFloat(median(t).toFixed(3));
}

function runGrowthAnalysis(){
    const out=document.getElementById("growthChart");
    const status=document.getElementById("growthStatus");
    if(!out)return;
    out.innerHTML="";
    status.innerText="Running growth benchmark...";

    const rows=growthFns.map(item=>({name:item.name,complexity:item.complexity,values:[]}));

    growthSizes.forEach(size=>{
        const a=Array.from({length:size},()=>Math.floor(Math.random()*1000));
        rows.forEach((row,i)=>row.values.push({size,time:growthMeasure(growthFns[i].fn,a)}));
    });

    rows.forEach(row=>{
        const max=Math.max(...row.values.map(v=>v.time),0.001);
        const block=document.createElement("article");
        block.className="growth-row";
        block.innerHTML=`<div class="growth-title"><strong>${row.name}</strong><span>${row.complexity}</span></div><div class="growth-points">${row.values.map(v=>`<div class="growth-point"><span>${v.size}</span><div class="growth-track"><i style="width:${Math.max(2,v.time/max*100)}%"></i></div><em>${v.time} ms</em></div>`).join("")}</div>`;
        out.appendChild(block);
    });

    status.innerText=`Completed growth analysis across ${growthSizes.length} input sizes using 3 timing samples per size.`;
}
