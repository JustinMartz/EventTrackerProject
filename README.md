# EventTrackerProject

Homework by Justin Martz

## Description

GuitarTech is a REST API serving the need of keeping track of your guitars' setups (maintenance records). Create a new setup for an existing guitar with attributes like tuning, string gauge, string brand, and setup date. Never forget which set of strings works best for your guitar ever again! 

GuitarTech can also keep track of the guitars in your collection with functionality like searching by color, getting a guitar's most recent setup, and adding new guitars!

### How To Use

- Return all setups

    <code>GET</code> api/setups

- Return setup by ID (<em>ID is an integer value</em>)

    <code>GET</code> api/setups/ID

- Return all setups by tuning

    <code>GET</code> api/setups/tuning/ID

    <code>ID</code> is an integer mapped to a tuning:
    
    - <strong>1</strong>: E Standard
    - <strong>2</strong>: Eb Standard
    - <strong>3</strong>: D Standard
    - <strong>4</strong>: C# Standard

- 

## Technologies Used

## Lessons Learned