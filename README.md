# GYST

# The secret document 
https://docs.google.com/document/d/1foSdUXSuPDHK0UF--nNuwswwAERuknWz4f_IDAHD9dA/edit?usp=sharing

## Install

```
yarn
yarn knex migrate:latest
yarn knex seed:run
yarn dev
```

## Getting Started
  Deploy boilerplate 
  Investigate NPM packages and alternative frameworks
  
## User Stories

### MVP

    * As a user I'd like to customize my personal dashboard
    * Tests written for the code
    * The Dashboard should contain widgets such as
      - Social feeds, exercise/nutrition info, goals & motivation, graphs (weight/budgeting), world map, basic 
      clock, weather, calender, email
    

### Stretch

    * Drag and drop functionality
    * Ability to change color schemes
    * spotify widget
    * fitness tracking
    * daily language tasks
    * youtube playlist / subscriptions

## React (Client Side)
  | name | purpose |
  | --- | --- |
  | AddTodo | Add user to do list| 
  | Calendar | View for calendar | 
  | DateTime | View for user to see the date and time | 
  | Drawer | View for user's profile and Drawer | 
  | Fitness | View for fitness counter with food search and calorie counter | 
  | LoginForm | View for user to enter their login credentials| 
  | Logout |View for user to logout | 
  | Main | Contain body components
  | MapContainer | View for google map| 
  | NavBar | View for google search| 
  | RegisterForm | View for user to sign up for the App | 
  | RssFeed | View for social media | 
  | SpotifyWidget | View for user to use spotify | 
  | WorldMap | View for user to see where they have travelled | 
  | TodoList | View for user to see their to do list | 
  | Weather | View for weather in Wellington| 
  
## Reducers (Client Side)

  | name | purpose |
  | --- | --- |
  | Navigate | Switch pages |
  
## Actions

 | type | data | purpose |
 | --- | --- | --- |
 | WIDGETNAME_ACTIONTYPE| Component_Name | Get information |
 
 ## API (Client - Server)
 
 To be decided
 
 ## DB (Server Side)
 1 table for the user and user preferences (coming at a later stage)
 
## API docs: Request and response formats
Currently in development

## Team Roles

Please refer to the secret document
