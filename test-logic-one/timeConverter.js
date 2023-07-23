function convertTime (s) { 
    /**
     * Pseudo code 
     * 1. firstly split into hours, minutes, seconds
     * 2. if hours equal to 12 and findIndex character of AM not equal to -1 (mean not found)
     * 3. return format AM ---> "00:minutes:seconds"
     * 4. if hour equal to 12 and findIndex character of PM not equal to -1 (mean not found)
     * 5. return format PM ---> 12 + Number(hours) + :minutes:seconds
     * 6. else
     * 7. if hours less than 10 
     * 8. return format "0" + Number(hours) + :minutes:seconds
     * 9. default
     * 10.return format Number(hours) + :minutes:seconds
     *  
     */
    const [hours, minutes, seconds] = s.slice(0, 8).split(':')
    if (Number(hours) === 12 && s.indexOf("AM") !== -1) { 
        return ("00" + `:${minutes}:${seconds}`)
    }
    if (Number(hours) < 12 && s.indexOf('PM') !== -1) { 
        return (12 + Number(hours) + `:${minutes}:${seconds}`)
    } else { 
        if (Number(hours) < 10) { 
            return ("0" + Number(hours) + `:${minutes}:${seconds}`)            
        } else { 
            return (Number(hours) + `:${minutes}:${seconds}`)
        }
    }
}

console.log(convertTime("07:05:45PM"))
console.log(convertTime("05:05:45PM"))
console.log(convertTime("01:02:55AM"))
console.log(convertTime("09:09:55AM"))
console.log(convertTime("11:02:21AM"))
console.log(convertTime("11:59:59PM"))
console.log(convertTime("12:00:00AM"))
console.log(convertTime("12:40:20AM"))
console.log(convertTime("06:02:21PM"))
