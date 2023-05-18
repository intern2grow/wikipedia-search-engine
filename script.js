// Debounce function
function debounce(func, delay) {
    let timeoutId;
    
    return function() {
      const context = this;
      const args = arguments;
      
      clearTimeout(timeoutId);
      timeoutId = setTimeout(function() {
        func.apply(context, args);
      }, delay);
    };
  }
  
  // Get the results container element
  const resultsContainer = document.getElementsByClassName("container")[0];
  
  // Function to validate input and generate results
  const validateInput = debounce(function(el) {
    if (el.value === "") {
      resultsContainer.innerHTML = "<p>Type something in the above search input</p>";
    } else {
      generateResults(el.value, el);
    }
  }, 500);
  
  // Function to generate search results
  function generateResults(searchValue, inputField) {
    fetch(
      "https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=" +
        searchValue
    )
      .then((response) => response.json())
      .then((data) => {
        let results = data.query.search;
        let numberOfResults = data.query.search.length;
        resultsContainer.innerHTML = "";
        for (let i = 0; i < numberOfResults; i++) {
          let result = document.createElement("div");
          result.classList.add("results");
          result.innerHTML = `
              <div>
                  <h3>${results[i].title}</h3>
                  <p>${results[i].snippet}</p>
              </div>
              <a href="https://en.wikipedia.org/?curid=${results[i].pageid}" target="_blank">Read More</a>
              `;
          resultsContainer.appendChild(result);
        }
        if (inputField.value === "") {
          resultsContainer.innerHTML = "<p>Type something in the above search input</p>";
        }
      });
  }
  
  // Get the search input element
  const searchInput = document.querySelector('input');
  
  // Attach the debounced event handler to the search input
  searchInput.onkeyup = function(event) {
    validateInput(event.target);
  };
  

// let resultsContainer = document.getElementsByClassName("container")[0]

// const validateInput = (el) => {
//     if(el.value === ""){
//         resultsContainer.innerHTML = "<p>Type something in the above search input</p>"
//     }else{
//         generateResults(el.value, el)
//     }
// }

// const generateResults = (searchValue, inputField) => {
//     fetch(
//         "https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch="
//         + searchValue
//     )
//     .then(response => response.json())
//     .then(data => {
//         let results = data.query.search
//         let numberOfResults = data.query.search.length
//         resultsContainer.innerHTML = ""
//         for(let i=0; i<numberOfResults; i++) {
//             let result = document.createElement("div")
//             result.classList.add("results")
//             result.innerHTML = `
//             <div>
//                 <h3>${results[i].title}</h3>
//                 <p>${results[i].snippet}</p>
//             </div>
//             <a href="https://en.wikipedia.org/?curid=${results[i].pageid}" target="_blank">Read More</a>
//             `
//             resultsContainer.appendChild(result)
//         }
//         if(inputField.value === ""){
//             resultsContainer.innerHTML = "<p>Type something in the above search input</p>"
//         }
//     })
// }
