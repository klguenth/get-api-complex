'use strict';

const searchURL = 'https://developer.nps.gov/api/v1/parks';

function queryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function showResults(responseJson) {
    console.log(responseJson);
    $('#resultsList').empty();
    for (let i = 0; i < responseJson.length - 1; i++) {
        $('#resultsList').append(
            `<li><h3>${responseJson[i].fullName}</h3>
      <p>${responseJson[i].description}</p>
      <a href='${responseJson[i].url}'>Go to Site</a></li>`
        )
    };
    $('#results').removeClass('hidden');
};

function getNationalParks(query, maxResults, states) {
    const params = {
        api_key: 'QS9enjIh1YjfiKxSSV0gqWKQa5HHjwAtmwm0wvYO',
        stateCode: states,
        limit: maxResults
        q: query
    };
    const queryString = queryParams(params)
    const url = searchURL + '?' + queryString;

    console.log(url);

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => showResults(responseJson.data))
        .catch(err => {
            $('#errorMessage').text(`Something went wrong: ${err.message}`);
            console.log(responseJson);
        });
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#searchTerm').val();
        const maxResults = $('#maxResults').val();
        const states = $('#states').val();
        getNationalParks(searchTerm, maxResults, states);
    });
}

$(watchForm);