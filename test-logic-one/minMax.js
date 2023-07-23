function miniMaxSum (arr) { 
    /**
     * Pseudo code 
     * Due to we should add min and max sum 4 elements from 5 length array
     * 1. defined minimal value for conditional
     * 2. input minimal value in each variable maxSum or minSum 
     * 3. sum all elements
     * 4. substract min and max sum variable with sum variable
     * 5. return the max and min value
     */
    let minSum = arr[0]
    let maxSum = arr[0]; 
    for (let i = 0; i < arr.length; i++) { 
        if( arr[i] <= minSum ) {
            minSum = arr[i]
        } 
        if (arr[i] >= maxSum) { 
            maxSum = arr[i]
        }
    }
    const sum = arr.reduce((acc, curr) => acc + curr)
    return [sum - maxSum, sum - minSum]?.join(' ')
}

console.log(miniMaxSum([1, 3, 5, 7, 9]))
console.log(miniMaxSum([1, 2, 3, 4, 5]))