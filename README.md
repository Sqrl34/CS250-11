# UrbanYield

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.1.3.

## Architecture Overview

### Frontend
The primary responsibility and function of the frontend is to display the map of the local produce locations. It is also to be interactive with 2 main faces, the provider and the reciever screens. To be done with HTML, CSS, JavaScript, and a mapping api
* Display interactive map with produce listings
* Allow users to log into the website with a Google account
* Provide the giver with a form with many options to cater to their needs (type, quantity, best buy date, ect)

### Backend
The primary responsibility of the backend is to handle to handle the logistics and communication betwen the database, OAuth, and frontend. To be done with Node.js or Express.js
* Verification with OAuth
* Manage roles, giver and receiver
* Handle API requests from the frontend
* Possibly handle AI logic for the AI implementation
* Handle errors and ensure no data is leaked

### Database
The primary responsibility of the database is to ensure the data is clean and organized. It will store:
* User account data from Google OAuth
* Handle listins, creating and deleting
* List expiration data

### External Services
Urban Yield will use Google OAuth for login and account creation. Alongside that it we will use Apple Maps or Google Maps for location display. We will use AWS Cloud Services to host the database for storing information

### User Interaction Flow
1. User logs into Urban Yield through their Google Account
2. User will either choose to receive or give; this will assign them the role for the session
3. User will either create a listing, which will interact with the backend and database to fill info or if the user is a reciever the backend will interact to get a list of locations within the proximity of the user
4. Once a receiver picks up the produce, the giver will be able to edit the quantity in the listing. If the listing has a quantity of 0, the listing will be removed from the database.


## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
