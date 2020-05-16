# Not Quite Perfect Quotes

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

Create a `.env` file for environment variables in your server.
We're going to need to add an API key to the `.env` file for the project to work, please contact Matt for the API key or generate your own at `https://favqs.com/`

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

The React application will run on port 3000 and the server port 3001.

# Code Overview

## Server

The Node.JS (Express) server has been chosen to handle most of the business logic of the application, by fetching the quotes from the available APIs and returning the normalized payload to the client.

A few design priorities were established:

1. The implementation should allow for easy extendability of new API end points and put the logic for normalizing that data in a location close to the configuration.
2. The Promise.all fetch api implementation should allow for errors to occur in individual endpoints without preventing the successful api responses to fail. This should not be a silent failure, however, and some kind of logging should be implemented to alert the developer.

## Front End

The front end react app was designed in order to be as light-weight as possible and perform as little business logic as needed. It's primarily only a view layer, which has handlers for few common sitations:

1. No results from the API
2. Error handling from the API
3. A loading spinner to indicate loading time
