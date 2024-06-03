document.addEventListener("DOMContentLoaded", () => {
  const resultsContainer = document.querySelector(".container");
  const inputField = document.querySelector("[data-search-input]");

  // Debounce function
  const debounce = (fn, delay) => {
    let timeoutId;

    return function (...args) {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), delay);
    };
  };

  // Event listener for input field
  inputField.addEventListener(
    "keyup",
    debounce((e) => validateInput(e.target), 500)
  );

  // Validate input function
  const validateInput = (input) => {
    const searchValue = input.value.trim();
    if (searchValue === "") {
      displayMessage("Type something in the above search input");
    } else {
      generateResults(searchValue);
    }
  };

  // Generate results function
  const generateResults = (searchValue) => {
    const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srsearch=${searchValue}`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => displayResults(data.query.search))
      .catch((error) => console.error("Error fetching results:", error));
  };

  // Display results function
  const displayResults = (results) => {
    resultsContainer.innerHTML = results.length
      ? results
          .map(
            (result) => `
              <div class="results">
                <div>
                  <h3>${result.title}</h3>
                  <p>${result.snippet}</p>
                </div>
                <a
                  href="https://en.wikipedia.org/?curid=${result.pageid}"
                  target="_blank"
                >
                  Read More
                </a>
              </div>
            `
          )
          .join("")
      : "<p>No results found</p>";
  };

  // Display message function
  const displayMessage = (message) => {
    resultsContainer.innerHTML = `<p>${message}</p>`;
  };
});
