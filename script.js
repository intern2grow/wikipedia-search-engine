

let resultsContainer = document.getElementsByClassName("container")[0]

const validateInputWithDebounce = debounce((el) => {
    validateInput(el);           //انه بيستدعي validdatainput  بعد القيمه اللي هي el اتهندلت بسبب callback الخاصه debounceوان كمان استدعيت callback كمعامل اساسي مع settimeout لامه مش مجرد عمليه بحث بعد وقت معين 
}, 2000);

const generateResultsWithDebounce = debounce((searchValue,inputField) => {
    generateResults(searchValue, inputField);
}, 2000);


const validateInput = (el) => {
    if (el.value === "") {
        resultsContainer.innerHTML = "<p>Type something in the above search input</p>"
    } else {
        generateResultsWithDebounce(el.value, el);    //اننا بدل نانستدعي function ذات نفسها لا احنا هانستدعيها بعد لما عاملنا ليها debounce وكده كده اصلا generateResultsWithDebounce generateResults مستدعيه الفانكشن الاساسيه 
        
    }
}

const generateResults = (searchValue, inputField) => {
    fetch(
        "https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch="
        + searchValue
    )
        .then(response => response.json())
        .then(data => {
            let results = data.query.search
            let numberOfResults = data.query.search.length
            resultsContainer.innerHTML = ""
            for (let i = 0; i < numberOfResults; i++) {
                let result = document.createElement("div")
                result.classList.add("results")
                result.innerHTML = `
            <div>
                <h3>${results[i].title}</h3>
                <p>${results[i].snippet}</p>
            </div>
            <a href="https://en.wikipedia.org/?curid=${results[i].pageid}" target="_blank">Read More</a>
            `
                resultsContainer.appendChild(result)
            }
            if (inputField.value === "") {
                resultsContainer.innerHTML = "<p>Type something in the above search input</p>"
            }
        })
}


function debounce(callback, wait) {
    let timerId;
    return (...args) => {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            callback(...args);
        }, wait);
    };
}