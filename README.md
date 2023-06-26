# wikipedia-search-engine

hello there, your task is to use debounce technique with the search input on the top of the page.

fork the repository and start working on it.

best of luck.

the changes which i do are
1.Define a simple debounce function that takes a function and a wait time as arguments. This function should return a new function that, when called, will clear any existing timeout and set a new timeout to call the original function after the specified wait time has passed.

2.Create a debounced version of the (generateResults) function by passing it to the (debounce) function along with a wait time of 300 milliseconds.

3.Update the (validateInput )function to use the debounced version of (generateResults). This will delay the execution of the (generateResults) function until 300 milliseconds after the user has stopped typing in the search input.
