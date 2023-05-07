let resultsContainer = document.querySelector(".container");
let input = document.querySelector("input");

let updateDb = debounce((Text) => {
  generateResults(Text);
});

const validateInput = (el) => {
  if (el.value === "") {
    resultsContainer.innerHTML =
      "<p>Type something in the above search input</p>";
  } else {
    updateDb(el.value);
  }
};

const generateResults = (searchValue, inputField = input) => {
  fetch(
    "https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=" +
      searchValue
  )
    .then((response) => response.json())
    .then((data) => {
      let results = data.query.search;
      console.log(results);
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

function debounce(callback, dealy = 500) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback(...args);
    }, dealy);
  };
}
