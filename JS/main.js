//Need a loop that runs a number of times equal to half the length of the array

function matchCheck (arr1, arr2) {
    let seqLength = arr1.length/2
    for (let i = 0; i <= seqLength; i += 2){
        if (arr1[i] === arr2[i] && arr1[i+1] === arr2[i+1]){
            console.log('These two match')
        }
        else if (arr1[i] !== arr2[i] || arr1[i+1] !== arr2[i+1]){
            console.log('Not a match')
            break
        }
}
}
//matchCheck([160,162,243,245], [160,162,243,245])
matchCheck([160, 162, 243, 245], [160, 162, 243, 246])



// let a = [160, 162, 243, 245]
// let b = [160, 162, 243, 245]
// let c = [164, 168, 241, 243]
// let d = [160, 162, 243, 245]
// let lq = [160, 160, 243, 245]
// let hq = [160, 162, 243, 245]

// if a[0] and a[1] === b[0] & b[1], check next two [2] and [3]. Repeat till last index or until they dont match
// finished, test a & c, repeat

// case considerations:
// - are there cases where it is a match, but the length of the two outputs are not the same?


//