const challengeData = {
    "Bubble Sort": [
        ["5, 2, 8, 1", "Which adjacent pair is compared first?", ["5 and 2", "2 and 8", "8 and 1"], 0],
        ["2, 5, 1, 8", "What happens when 5 and 1 are compared?", ["They stay", "They swap", "The array resets"], 1]
    ],
    "Selection Sort": [
        ["5, 2, 8, 1", "Which value is selected first?", ["5", "8", "1"], 2],
        ["1, 2, 8, 5", "Which portion is now sorted?", ["First element", "Last element", "Entire array"], 0]
    ],
    "Insertion Sort": [
        ["5, 2, 8, 1", "When processing 2, what happens?", ["2 is inserted before 5", "5 is removed", "8 becomes pivot"], 0],
        ["2, 5, 8, 1", "Which value is processed next?", ["2", "5", "8"], 2]
    ],
    "Merge Sort": [
        ["5, 2, 8, 1", "What does Merge Sort do first?", ["Choose a pivot", "Split the array", "Swap adjacent values"], 1],
        ["5, 2 | 8, 1", "What happens after the halves are sorted?", ["They are merged", "They are deleted", "A pivot is chosen"], 0]
    ],
    "Quick Sort": [
        ["5, 2, 8, 1", "What controls the partition step?", ["Pivot", "Array size", "First comparison"], 0],
        ["2, 1, 5, 8", "After partitioning around 5, what is true?", ["5 is in its final position", "5 is removed", "The array is always fully sorted"], 0]
    ]
};

let challengeIndex = 0;

function loadChallenge() {
    const algo = document.getElementById("algorithm").value;
    const data = challengeData[algo];
    if (!data) return;

    challengeIndex = challengeIndex % data.length;
    const item = data[challengeIndex];

    document.getElementById("challengeArray").innerText = item[0];
    document.getElementById("challengePrompt").innerText = item[1];
    document.getElementById("challengeFeedback").innerText = "";

    const box = document.getElementById("challengeAnswers");
    box.innerHTML = "";

    item[2].forEach((answer, index) => {
        const button = document.createElement("button");
        button.innerText = answer;
        button.addEventListener("click", () => {
            const feedback = document.getElementById("challengeFeedback");
            if (index === item[3]) {
                feedback.innerText = "Correct! Next step unlocked.";
            } else {
                feedback.innerText = "Not quite. Think about how this algorithm works.";
            }
        });
        box.appendChild(button);
    });
}

function nextChallenge() {
    const algo = document.getElementById("algorithm").value;
    challengeIndex++;
    challengeIndex %= challengeData[algo].length;
    loadChallenge();
}

document.getElementById("algorithm").addEventListener("change", () => {
    challengeIndex = 0;
    loadChallenge();
});

document.addEventListener("DOMContentLoaded", loadChallenge);
