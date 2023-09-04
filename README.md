# EventTrackerProject
![](readme.png)

Homework by Justin Martz

## Description

[GuitarTech](http://3.13.216.67:8080/GuitarTech) is an Angular frontend using a RESTful API serve the need of keeping track of your guitars and their setups (maintenance records). 

Create a new setup for an existing guitar with attributes like tuning, string gauge, string brand, and setup date. Never forget which set of strings works best for your guitar ever again! 

GuitarTech can also keep track of the guitars in your collection with functionality like searching by color, getting a guitar's most recent setup, and adding new guitars!

### How To Use

| HTTP Verb | URI                      | Request Body | Response Body |
|-----------|--------------------------|--------------|---------------|
| GET       | `/api/setups`            |              | List of setups |
| GET       | `/api/setups/{setupId}`  |              | Retrieved setup by setupId |
| GET       | `/api/setups/tuning/{tuningId}`  |              | List of setups by tuningId |
| GET       | `/api/setups/guitar/{guitarId}`  |              | List of setups by guitarId |
| GET       | `/api/setups/current/{guitarId}`  |              | Retreived setup by guitarId |
| POST      | `/api/setups`            | Representation of a new setup| Created setup |
| PUT       | `/api/setups/{setupId}`  | Representation of a new version of existing setup | Updated setup|
| DELETE    | `/api/setups/{setupId}`  |              |                |


<strong>More info:</strong>

- Return all setups

    <code>GET</code> http://3.13.216.67:8080/GuitarTech/api/setups

- Return setup by ID (<em>ID is an integer value</em>)

    <code>GET</code> http://3.13.216.67:8080/GuitarTech/api/setups/ID

- Return all setups by tuning

    <code>GET</code> http://3.13.216.67:8080/GuitarTech/api/setups/tuning/ID

    <code>ID</code> is an integer mapped to a tuning:
    
    - <strong>1</strong>: E Standard
    - <strong>2</strong>: Eb Standard
    - <strong>3</strong>: D Standard
    - <strong>4</strong>: C# Standard

- Return all setups by guitar

    <code>GET</code> http://3.13.216.67:8080/GuitarTech/api/setups/guitar/ID

- Return current setup for guitar

    <code>GET</code> http://3.13.216.67:8080/GuitarTech/api/setups/current/ID

- Create a new setup

    <code>POST</code> http://3.13.216.67:8080/GuitarTech/api/setups

    <strong>Required fields for new Setup:</strong> <code>stringGauge, dateOfSetup, guitar, tuning</code>
    
    Example JSON:
    ```
    {
    "stringGauge": "10-42",
    "stringBrand": "Ernie Ball",
    "dateOfSetup": "2023-08-10",
    "actionTreble": 3,
    "actionBass", 4,
    "notes": "I really like this setup for this guitar."
    "guitar": { "id": 2 },
    "tuning": { "id": 2}
    }
    ```
- Edit an existing setup

    <code>PUT</code> http://3.13.216.67:8080/GuitarTech/api/setups/ID

- Delete an existing setup

    <code>DELETE</code> http://3.13.216.67:8080/GuitarTech/api/setups/ID

| HTTP Verb | URI                      | Request Body | Response Body |
|-----------|--------------------------|--------------|---------------|
| GET       | `/api/guitars`            |              | List of guitars |
| GET       | `/api/guitars/{guitarId}`  |              | Retrieved guitar by guitarId |
| GET       | `/api/guitars/tuning/{tuningId}`  |              | List of guitars by tuningId |
| GET       | `/api/guitars/bridge/{bridge_string}`  |              | List of guitars by bridge_string |
| GET       | `/api/guitars/color/{color_string}`  |              | List of guitars by color_string |
| POST      | `/api/guitars`            | Representation of a new guitar| Created guitar |
| PUT       | `/api/guitars/{guitarId}`  | Representation of a new version of existing guitar | Updated setup|
| DELETE    | `/api/guitars/{guitarId}`  |              |                |


## Technologies Used

- Spring Boot

- Spring Data JPA

- MySQL / MySQL Workbench

- Angular / TypeScript


## Lessons Learned

I learned how create my own REST API from scratch using MySQL to model the diagram and forward engineer it to a database, and using Spring Data JPA to handle the REST endpoints.