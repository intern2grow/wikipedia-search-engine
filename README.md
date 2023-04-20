# wikipedia-search-engine

Problem:
The search input on the top of the page lacks debounce technique, which means that every keystroke triggers a search request. This can cause unnecessary server load and slow down the search functionality, especially when the user types quickly or makes a typo.

Solution:
To solve this problem, I need to implement debounce technique for the search input. This will delay the search request until the user stops typing for a certain amount of time