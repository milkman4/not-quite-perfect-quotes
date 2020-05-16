# Not Quite Perfect Quotes

## Notice:

This project was cloned from a create-react-app + express.js starter kit https://github.com/philnash/react-express-starter - all commits in this repo prior to May 16 2020 are from another author.

### Purpose

This project is created with the inspiration to showcase Asyncronous Logic and Data Manipulation. This achieves these two goals by sending a query to two different quote APIs [FavQ](https://favqs.com/) and [Advice Slip](https://api.adviceslip.com/)

This approach was chosen due to the desire to demonstrate a solution to the "many sources, one destination" search problem. 

## Using this project

Clone the project, change into the directory and install the dependencies.

```bash
git clone https://github.com/milkman4/not-quite-perfect-quotes.git
cd not-quite-perfect
npm install
```

You can start the server on its own with the command:

```bash
npm run server
```

Run the React application on its own with the command:

```bash
npm start
```

Run both applications together with the command:

```bash
npm run dev
```

Run server tests with

```bash
npm run server-test
```

The React application will run on port 3000 and the server port 3001.

# Code Overview

## Server

The Node.JS (Express) server has been chosen to handle most of the business logic of the application, by fetching the quotes from the available APIs and returning the normalized payload to the client.

Note: The API Key that's saved in `.env` is a free api key that is rate-limited and easy to obtain. It's terrible practice to commit this to github but in the interest of reducing friction for folks who are cloning this repo, I broke the number one rule of web development - never commit an API key or token to a public (or private, for that matter) repository. Please forgive me.

A few design priorities were established for the server prior to development:

1. The implementation should allow for easy extendability of new API end points and put the logic for normalizing that data in a location close to the configuration.
2. The Promise.all fetch api implementation should allow for errors to occur in individual endpoints without preventing the successful api responses to fail. This should not be a silent failure, however, and some kind of logging should be implemented to alert the developer.
3. The normalizer functions should be tested to ensure data integrity.
4. Adds a cache to improve performance and reduce unneeded api calls

## Front End

The front end react app was designed in order to be as light-weight as possible and perform as little business logic as needed. It's primarily only a view layer, which has handlers for few common sitations:

1. No results from the API
2. Error handling from the API
3. A loading spinner to indicate loading time
4. API + Quote attribution

# Further Work

Given more time, I'd have continued with development of the following improvements. These improvements don't necessarily increase the feature scope, but improve the functionality as it is while increasing developer confidence, performance and resilience.

1. Rewrite Node API to be in TypeScript. It's important for developers to be confident that the data normalizers, especially, are functioning as expected. Adding typescript and adding interfaces, for the QuoteObject especially, would increase the ability to add new API endpoints with ease in the future.
2. Add some more quote APIs. It would be fun to add some more sources since these ones are a bit limited. There's some really powerful quote APIs out there, it seems, but most of them require payment of some form.
3. Add more tests for the front end that test the submission logic with mocked api calls. 
4. Spend time implementing a component library like MaterialUI to improve the look and feel of the UX. I'd add some animations, too, most likely.


