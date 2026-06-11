from flask import Flask, render_template, request, jsonify
import time

app = Flask(__name__)


def bubble_sort(arr):
    arr = arr.copy()

    for i in range(len(arr)):
        swapped = False

        for j in range(len(arr) - i - 1):

            if arr[j] > arr[j + 1]:

                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True

        if not swapped:
            break

    return arr


def merge_sort(arr):

    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2

    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])

    return merge(left, right)


def merge(left, right):

    result = []

    i = 0
    j = 0

    while i < len(left) and j < len(right):

        if left[i] < right[j]:
            result.append(left[i])
            i += 1

        else:
            result.append(right[j])
            j += 1

    result.extend(left[i:])
    result.extend(right[j:])

    return result


def quick_sort(arr):

    if len(arr) <= 1:
        return arr

    pivot = arr[-1]

    left = []
    right = []

    for item in arr[:-1]:

        if item < pivot:
            left.append(item)
        else:
            right.append(item)

    return quick_sort(left) + [pivot] + quick_sort(right)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/compare", methods=["POST"])
def compare():

    data = request.get_json()

    numbers = data["numbers"]

    start = time.perf_counter()
    bubble_sort(numbers)
    bubble_time = (time.perf_counter() - start) * 1000

    start = time.perf_counter()
    merge_sort(numbers)
    merge_time = (time.perf_counter() - start) * 1000

    start = time.perf_counter()
    sorted_array = quick_sort(numbers)
    quick_time = (time.perf_counter() - start) * 1000

    return jsonify(
        {
            "bubble": round(bubble_time, 4),
            "merge": round(merge_time, 4),
            "quick": round(quick_time, 4),
            "sorted": sorted_array,
        }
    )


if __name__ == "__main__":
    app.run(debug=True)