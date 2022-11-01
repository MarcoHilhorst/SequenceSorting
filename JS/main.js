


// This function will remove the existing li items (if any) to prevent mutliple instances clogging up the DOM
function removeElementsByClass(className){
    var elements = document.getElementsByClassName(className);
    while(elements.length > 0){
      elements[0].parentNode.removeChild(elements[0]);
    }
  }
  
  function loadFile() {
      var input, file, fr;
  
      if (typeof window.FileReader !== 'function') {
        alert("The file API isn't supported on this browser yet.");
        return;
      }
  
      input = document.getElementById('fileinput');
      if (!input) {
        alert("Um, couldn't find the fileinput element.");
      }
      else if (!input.files) {
        alert("This browser doesn't seem to support the `files` property of file inputs.");
      }
      else if (!input.files[0]) {
        alert("Please select a file before clicking 'Load'");
      }
      else {
        file = input.files[0];
        fr = new FileReader();
        fr.onload = receivedText;
        fr.readAsText(file);
      }
  
  
      function receivedText(e) {
  
        removeElementsByClass('aMatch')
  
        let lines = e.target.result;
        var newArr = JSON.parse(lines); 
        let arrayOfMarkers = Object.keys(newArr[0]);
              arrayOfMarkers.shift()
              arrayOfMarkers.shift()
        let matches = []
        let successfulMatches = [] // This will hold the matches and generate them as li items at the end of all the loops
      
      newArr.forEach(element => {
          var concatToArray = Object.keys(element).map(function(key){
              return element[key]
      })
          concatToArray.shift()
          concatToArray.shift()
          element.sequence = concatToArray
          
          });
          newArr.forEach((object, objI) => { //Selects the sequence to compare by going through the array of objects(each row is an object)
  
              for (let seqN = 0; seqN < newArr.length; seqN++) { //Selects the sequence to compare against by using seqN below
                  let finCounter = 0
                  let dropOutCounter = 0
                  let noDataCounter = 0
                  let messageString = ""
                  let dropOutMarker = ""
                  let sSeqLength = newArr[objI].sequence.length //length of the currently selected sequence
          
                  //Once this loops, it takes the sequence of the next object to compare against the initially selected one.
                  for (let bPC = 0; bPC < newArr[objI].sequence.length; bPC += 2) { //checks each pair of selected markers with compare markers
                    let sMarker1 = newArr[objI].sequence[bPC] //selected marker, first number
                    let sMarker2 = newArr[objI].sequence[bPC+1] //selected marker, second number
                    let cMarker1 = newArr[seqN].sequence[bPC] //comparison marker, first number
                    let cMarker2 = newArr[seqN].sequence[bPC+1] //comparison marker, second number
                    let sHomZyg = sMarker1 === sMarker2 //returns true if homozygous and false if not, for selected sequence
                    let cHomZyg = cMarker1 === cMarker2 //returns true if homozygous and false if not, for comparison sequence
                    
                   
                    
                    //If the marker matches for both sequences
                    if(sMarker1 === cMarker1 && sMarker2 === cMarker2){
                      finCounter += 2
                    }
  
                    //Progresses if there is no data for selected marker
                    else if(sHomZyg === true && sMarker1 === 0){
                      finCounter += 2
                      noDataCounter += 1
                    }
  
                    //If both the sequences have dropout enabled and are homozygous
                    else if (object.Dropout === true && newArr[seqN].Dropout === true && sHomZyg === true && cHomZyg === true){
                      finCounter += 2
                      dropOutCounter += 1
                      dropOutMarker += `${arrayOfMarkers[bPC]}, `
                    }
  
                    //If the selected sequence has dropout enabled and the comparison sequence does not
                    else if (object.Dropout === true && sHomZyg === true && sMarker1 === cMarker1 || object.Dropout === true && sHomZyg === true && sMarker1 === cMarker2){
                      finCounter += 2
                      dropOutCounter += 1
                      dropOutMarker += `${arrayOfMarkers[bPC]}, `
                    }   
  
                    else {
                      break
                    }
                  }
  
                  //Checks if the two IDs are not the same
                  if(finCounter === sSeqLength && newArr[objI].ID != newArr[seqN].ID){
                      //If the two matches dont already have their ids stored in the matches array, store them and add the ids to the message array
                      if(matches.every(element => (element.includes(newArr[objI].ID) && element.includes(newArr[seqN].ID)) === false)){
                          matches.push([newArr[objI].ID, newArr[seqN].ID])
                          messageString += `${newArr[objI].ID} matches with ${newArr[seqN].ID}. `
                      }else {
                          finCounter = 0
                      }
                  }
  
                  //Adds the number of dropouts to the message string as well as whcih marker it occured at
                  if (dropOutCounter != 0){
                    messageString += `There are ${dropOutCounter} possible dropout matches located at ${dropOutMarker} `
                  }
  
                  //Adds the number of no data markers to the message string
                  if(noDataCounter != 0){
                    messageString += `There are ${noDataCounter} instances of no data matches.`
                  }
  
                  //Logs the message string if they IDs aren't the same, I.E if it isn't comparing itself to itself
                  if (finCounter === sSeqLength && newArr[objI].ID != newArr[seqN].ID){
                    console.log(messageString)
                    successfulMatches.push(messageString)
                    var li = document.createElement("li")
                    li.className = 'aMatch'
                    li.innerHTML = messageString
                    document.querySelector('.results').appendChild(li)
                  }
                  
              }
          });
          console.log(successfulMatches)
          // Alert to let users know if there were no matches found
          if(successfulMatches.length === 0){
            alert('No matches were found')
          }
      }
    }
    // Function for the parent-offspring test
    function loadFilePO() {
      var input, file, fr;
  
      if (typeof window.FileReader !== 'function') {
        alert("The file API isn't supported on this browser yet.");
        return;
      }
  
      input = document.getElementById('fileinputPO');
      if (!input) {
        alert("Um, couldn't find the fileinput element.");
      }
      else if (!input.files) {
        alert("This browser doesn't seem to support the `files` property of file inputs.");
      }
      else if (!input.files[0]) {
        alert("Please select a file before clicking 'Load'");
      }
      else {
        file = input.files[0];
        fr = new FileReader();
        fr.onload = receivedText;
        fr.readAsText(file);
      }
  
      function receivedText(e) {
  
        removeElementsByClass('aMatchPO')
  
        let lines = e.target.result;
        var newArr = JSON.parse(lines); 
        let arrayOfMarkers = Object.keys(newArr[0]);
              arrayOfMarkers.shift()
              arrayOfMarkers.shift()
        let matches = []
        let successfulPO = []
      
      newArr.forEach(element => {
          var concatToArray = Object.keys(element).map(function(key){
              return element[key]
      })
          concatToArray.shift()
          concatToArray.shift()
          element.sequence = concatToArray
          
          });
          newArr.forEach((object, objI) => { //Selects the sequence to compare by going through the array of objects(each row is an object)
  
              for (let seqN = 0; seqN < newArr.length; seqN++) { //Selects the sequence to compare against by using seqN below
                  let finCounter = 0
                  let dropOutCounter = 0
                  let noDataCounter = 0
                  let messageString = ""
                  let dropOutMarker = ""
                  let sSeqLength = newArr[objI].sequence.length //length of the currently selected sequence
          
                  //Once this loops, it takes the sequence of the next object to compare against the initially selected one.
                  for (let bPC = 0; bPC < newArr[objI].sequence.length; bPC += 2) { //checks each pair of selected markers with compare markers
                    let sMarker1 = newArr[objI].sequence[bPC] //selected marker, first number
                    let sMarker2 = newArr[objI].sequence[bPC+1] //selected marker, second number
                    let cMarker1 = newArr[seqN].sequence[bPC] //comparison marker, first number
                    let cMarker2 = newArr[seqN].sequence[bPC+1] //comparison marker, second number
                    let sHomZyg = sMarker1 === sMarker2 //returns true if homozygous and false if not, for selected sequence
                    let cHomZyg = cMarker1 === cMarker2 //returns true if homozygous and false if not, for comparison sequence
                    
                    //checks to see if the selected and comparison markers share at least one allele
                    if(sMarker1 === cMarker1 || sMarker1 === cMarker2 || sMarker2 === cMarker1 || sMarker2 === cMarker2){
                      finCounter += 2
                    } else {
                      break
                    }
                  }
  
                  //Checks if the two IDs are not the same
                  if(finCounter === sSeqLength && newArr[objI].ID != newArr[seqN].ID){
                      //If the two matches dont already have their ids stored in the matches array, store them and add the ids to the message array
                      if(matches.every(element => (element.includes(newArr[objI].ID) && element.includes(newArr[seqN].ID)) === false)){
                          matches.push([newArr[objI].ID, newArr[seqN].ID])
                          messageString += `${newArr[objI].ID} matches criteria for parent-offpsring with ${newArr[seqN].ID}. `
                      }else {
                          finCounter = 0
                      }
                  }
  
                  //Adds the number of no data markers to the message string
                  if(noDataCounter !== 0){
                    messageString += `There are ${noDataCounter} instances of no data matches.`
                  }
  
                  //Logs the message string if they IDs aren't the same
                  if (finCounter === sSeqLength && newArr[objI].ID != newArr[seqN].ID){
                    console.log(messageString)
                    successfulPO.push(messageString)
                    var li = document.createElement("li")
                    li.className = 'aMatchPO'
                    li.innerHTML = messageString
                    document.querySelector('.pOResults').appendChild(li)
                  }
                  
              }
          });
          if(successfulPO.length === 0){
            alert('No Parent Offspring matches were found')
          }
      }
    }

