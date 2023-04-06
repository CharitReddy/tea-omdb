### To run the application:
Clone this repository.<br/>
cd into the project and at the same level as package.json, run `npm install`.<br/>
Run `npm start` to run the application.<br/>
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `Additional Libraries Used`
Material UI.
Material UI Icons.
Material UI.
Axios - For API Requests.

### `App Functionality`

## Home Page
Home page has a search bar initially, and displays a grid of cards with basic details of movies once searched.

### Search Bar
Search is triggered when a pause of 1s is detected in between 2 consecutive keystrokes, or when enter is hit, or when search icon is clicked.<br/>
The clear button at the end clears the search and current results.

### List
When any card in the grid is clicked, a Dialog opens displaying all the details of the movie. The dialog has a fixed title on top and close button on bottom, and the rest of the content is scrollable.

### Pages
The limit for number of movies displayed at once is 10, and pages are available on the bottom of home page to view further results.<br/>
A new search will always start from Page 1 irrespective of current page.

### `Technical Details`
-All the components and icons used are from Material UI.<br/>
-The search functionality is Debounced. Search is not triggered for every change in user input, rather triggers on a pause of at least 1000ms/1s.<br/>
-Pagination is implemented as per the API response, with number of pages being total/10. Although the API documentation states valid range for pages is 1-100, pages greater than 100 seem to work fine too.<br/>
-All JSX is present in the folders Pages and Components according to the hierarchy.<br/>
--Entire business logic is present in the useHome hook inside src/pages/Home.<br/>
-The services folder has both BySearch and ByID API calls as functions.<br/>
-The utils folder has any reusable functions not specific to any of the above functionality.<br/>
-The commons folder has interfaces being used at more than a single place.<br/>
-The translations folder has a translate function that accepts keys as input and displays the corresponding text from a given language file.<br/>
-Only en.ts is present, and although change in language has not been implemented, it can easily be switched. A new language file has to be provided. If it has to be dynamic, a context/global state can be used to switch between the languages.<br/>


### `Folder Structure`
<img width="363" alt="image" src="https://user-images.githubusercontent.com/41099525/230244071-e1b82069-b814-4e90-8846-212ffb0edc1e.png">


### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
