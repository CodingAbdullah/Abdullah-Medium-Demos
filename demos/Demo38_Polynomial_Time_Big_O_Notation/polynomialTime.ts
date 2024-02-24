// Constant, Linear, Linearithmic, Logarithmic, Quadratic

// Constant
// Single statements without any loops are constant time
let n: number = 0;
let numbers: Array<number[]> = [];

if (n = 0) {
    n += 1;
}
else {
    n += 2;
}

console.log("Value of n: " + n);

// ------------------------------- //

// Linear Time - O(n)
// [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 
//  [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
//  [0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30]] 
// Numbers array now contains three arrays within one array
let tempArray = [];
for (let i = 0; i <= 10; i++) {
    tempArray.push(i);
};

numbers.push(tempArray);
console.log("Linear Time Result ----- " + numbers[0]);
numbers.push(tempArray.map(n => n*2));
console.log("Linear Time Result ----- " + numbers[1]);
numbers.push(tempArray.map(n => n*3));
console.log("Linear Time Result ----- " + numbers[2]);

// ------------------------------- //

// Quadratic Time - O(n^2)
for (let i = 0; i < numbers.length; i++) {
    // Subtracting 10 from each number within each number array
    for (let j = 0; j < numbers[i].length; j++) {
        numbers[i][j] -= 10;
    }

    console.log("Quadratic Time Result ----- " + i + ": " + numbers[i]);
}