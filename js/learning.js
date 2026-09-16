const learningData = {
    "Bubble Sort": {
        concept: "Repeatedly compare adjacent values and swap them when they are out of order. After each pass, the largest remaining value moves to the end.",
        pseudocode: "for each pass\n  for each adjacent pair\n    if left > right\n      swap them",
        takeaway: "Easy to understand and useful for teaching, but inefficient for large unsorted arrays.",
        question: "After one complete Bubble Sort pass, which value is guaranteed to be in its final position?",
        options: ["The smallest value", "The largest value", "The middle value"],
        answer: 1
    },
    "Selection Sort": {
        concept: "Find the smallest value in the unsorted portion and place it at the current position. Repeat until the array is sorted.",
        pseudocode: "for i from 0 to n-1\n  find minimum from i to n-1\n  swap minimum with i",
        takeaway: "It performs few swaps, but still needs quadratic comparisons in the usual implementation.",
        question: "What does Selection Sort search for during each outer-loop iteration?",
        options: ["The largest value", "A random value", "The minimum value"],
        answer: 2
    },
    "Insertion Sort": {
        concept: "Build a sorted portion from left to right by inserting each new value into its correct position among the values already processed.",
        pseudocode: "for i from 1 to n-1\n  key = array[i]\n  shift larger values right\n  insert key",
        takeaway: "It works especially well when data is already or nearly sorted.",
        question: "Which part of the array is kept sorted while Insertion Sort runs?",
        options: ["The processed left portion", "Only the last element", "The entire array"],
        answer: 0
    },
    "Merge Sort": {
        concept: "Divide the array into smaller halves, recursively sort those halves, then merge the sorted halves into one sorted array.",
        pseudocode: "split array into halves\nsort each half\nmerge the sorted halves",
        takeaway: "Its predictable O(n log n) running time makes it useful for large datasets, with extra memory for merging.",
        question: "What is the main operation that combines the sorted halves?",
        options: ["Partition", "Merge", "Hash"],
        answer: 1
    },
    "Quick Sort": {
        concept: "Choose a pivot, partition values around it, then recursively sort the two resulting regions.",
        pseudocode: "choose pivot\npartition around pivot\nquick-sort left and right parts",
        takeaway: "Its average performance is O(n log n), while a poor sequence of pivots can lead to O(n²).",
        question: "What element controls the partition step in Quick Sort?",
        options: ["The pivot", "The smallest value", "The array length"],
        answer: 0
    }
};

function updateLearningMode() {
    const algo = document.getElementById("algorithm").value;
    const data = learningData[algo];
    if (!data) return;

    document.getElementById("learningConcept").innerText = data.concept;
    document.getElementById("learningPseudocode").innerText = data.pseudocode;
    document.getElementById("learningTakeaway").innerText = data.takeaway;
    document.getElementById("challengeQuestion").innerText = data.question;

    const options = document.getElementById("challengeOptions");
    options.innerHTML = "";
    document.getElementById("challengeResult").innerText = "";

    data.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.innerText = option;
        button.addEventListener("click", () => {
            const result = document.getElementById("challengeResult");
            if (index === data.answer) {
                result.innerText = "Correct — you understand the key idea.";
            } else {
                result.innerText = "Not quite. Review the concept above and try again.";
            }
        });
        options.appendChild(button);
    });
}

document.getElementById("algorithm").addEventListener("change", updateLearningMode);
updateLearningMode();
