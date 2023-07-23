
function divideSixDecimal(pembil, pemba) { 
  return ((pembil / pemba).toFixed(6))
}

function fractionValue (arr) { 
    /**
     * Pseudo code 
     * Due to we should add min and max sum 4 elements from 5 length array
     * 1. defined counter on array data type
     * 2. looping an array 
     * 3. counter index zero increment when meet negative values
     * 4. counter index one increment when meet zero values
     * 5. coutner index two increment when meet positive values
     * 6. parsing to function for return ratios value
     * 7. return on string value from array with joint with newlines
     */
    const counter = [0, 0, 0] 
    const arrLength = arr.length;
    for (let i = 0; i < arr.length; i++) { 
        if( arr[i] < 0 ) {
            counter[0]++
        } else if (arr[i] > 0) { 
            counter[2]++
        } else { 
            counter[1]++
        }
    }
    const fraction = [divideSixDecimal(counter[0], arrLength), divideSixDecimal(counter[1], arrLength), divideSixDecimal(counter[2], arrLength)]
    return fraction.join(`\r\n`);
}

console.log(fractionValue([1, 1, 0, -1, -1]))
console.log('========')
console.log(fractionValue([-4, 3, -9, 0, 4, 1]))