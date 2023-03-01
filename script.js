// Load client secret file
fetch('./client_secret_794410266864-fkn82o8epd3lobrrhvs7snqifm0vu8o3.apps.googleusercontent.com.json')
  .then(response => response.json())
  .then(credentials => {
    // Client ID and API key from the Google Developers Console
    const CLIENT_ID = credentials.web.client_id;
    const API_KEY = 'AIzaSyArJy12iRsjikObadW3YfEv4f34Afw_dJA';

    // ID of the Google Spreadsheet where the data will be stored
    const SPREADSHEET_ID = '1m52vnOawXxE10fV3vG4Rruy2M-j8Z-0lTvPns-0wvCc';

    // Array of API discovery doc URLs for APIs used by the quickstart
    const DISCOVERY_DOCS = ['https://sheets.googleapis.com/$discovery/rest?version=v4'];

    // Authorization scopes required by the API
    const SCOPES = 'https://www.googleapis.com/auth/spreadsheets';

    // Load the API client and sign in the user
    function handleClientLoad() {
      gapi.load('client:auth2', initClient);
    }

    function initClient() {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
      }).then(() => {
        // Listen for form submission
        const form = document.getElementById('myForm');
        form.addEventListener('submit', handleFormSubmit);
      });
    }

    // Handle form submission
    function handleFormSubmit(event) {
      event.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      // Create a new row in the spreadsheet with the form data
      gapi.client.sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: 'Sheet1',
        valueInputOption: 'USER_ENTERED',
        resource: {
          values: [[name, email, message]]
        }
      }).then((response) => {
        console.log(`${response.result.updates.updatedCells} cells updated.`);
        alert('Your message has been sent!');
        form.reset();
      }, (reason) => {
        console.error(`Error: ${reason.result.error.message}`);
        alert('An error occurred. Please try again later.');
      });
    }

    // Initialize the client when the page is loaded
    window.addEventListener('load', handleClientLoad);
  });