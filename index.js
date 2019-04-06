'use strict';

/*Assignment
Your team is working on an app that will help folks plan a vacation. You've been assigned to 
work on one feature for the app - to display a list of national parks in an area.

Review The National Parks Services API documentation and create an API key.
Review the API Guide on Authentication for ways to pass your API key as part of the request.
Review the /parks endpoint and data model to understand how it works.
Create a new app and push it to GitHub.
When you're done, submit the link to your GitHub repo at the bottom of the page.
Requirements:
The user must be able to search for parks in one or more states.
The user must be able to set the max number of results, with a default of 10.
The search must trigger a call to NPS's API.
The parks in the given state must be displayed on the page. Include at least:
Full name
Description
Website URL
The user must be able to make multiple searches and see only the results for the current search.
As a stretch goal, try adding the park's address to the results.

This exercise should take about an hour to complete. If you're having trouble, 
attend a Q&A session or reach out on Slack for help.

park API = vTE1EGsrszBqHZ2CgxHarkZgBHmeodQTsCVvbrl9


*/







// put your own value below!
const apiKey = 'vTE1EGsrszBqHZ2CgxHarkZgBHmeodQTsCVvbrl9'; 
const searchURL = 'https://api.nps.gov/api/v1/parks';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the items array
  for (let i=0; i<responseJson.data.length; i++) {
    // for each video object in the items 
    //array, add a list item to the results 
    //list with the video title, description,
    //and thumbnail
   
        $('#results-list').append(`
          <li><h3>${responseJson.data[i].fullName}</h3>
          <a href='${responseJson.data[i].url}'>${responseJson.data[i].url}</a>
          <p>${responseJson.data[i].description}</p>
          <p>${responseJson.data[i].directionsInfo}</p>
          </li>
          `)
      };
  //display the results section  
  $('#results').removeClass('hidden');
};

function getParks(query, limit) {
  const params = {
    key: apiKey,
    q: query,
    limit: limit-1,
    
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const limit = $('#js-max-results').val();
    getParks(searchTerm, limit);
  });
}

$(watchForm);