### Word Processor

Problem Statement - For a given web url count the number of word occurrences in its DOM.

## Backend -

    [GET] /api/word-count?url=https://www.bbc.com - returns the word occurrences from the give url's DOM.
    - currently handles url with content type text/plain & text/html

## Frontend - Single Page App -

    - Allows user to provide url and displays the result.
    - keeps track of user history and displays the results from cache on selected.

## Starting the app -

    - Clone the repo

    - Docker Compose should mount the FE and BE with the below command.

    ```docker-compose up```

    - Sit back and navigate to http://localhost

## Test Coverage -

    - Units cover the URL Processor which includes the word occurrences.
    - Integration tests cover the E2E by mocking the url response.

## Tech Stack -

    BE: Node/Express
    FE: React

    As NodeJs is light weight and non-blocking nature i choose node and for further extending functionality to scale in case of large DOM i prefer adding Queues and handling the data processing in a different service. FE is on React as it is fast and simple for single page applications.
