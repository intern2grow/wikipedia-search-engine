let resultsContainer = document.getElementsByClassName("container")[0];
let debounce;

const validateInput = (el) => {
     if (el.value === "") {
          resultsContainer.innerHTML =
               "<p>Type something in the above search input</p>";
     } else {
          resultsContainer.innerHTML = "<p>fetching data please wait ....</p>";
          clearTimeout(debounce);
          debounce = setTimeout(() => {
               generateResults(el.value, el);
          }, 800);
     }
};

const generateResults = (searchValue, inputField) => {
     console.log("start fetching");
     fetch(
          "https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=" +
               searchValue
     )
          .then((response) => response.json())
          .then((data) => {
               let results = data.query.search;
               if (results.length === 0) {
                    resultsContainer.innerHTML =
                         "<p>No Matching Data!</p> <p>try another thing </p>";
                    return;
               }
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
                    resultsContainer.innerHTML =
                         "<p>Type something in the above search input</p>";
               }
          });
};
