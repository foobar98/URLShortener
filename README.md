# URLShortener
This is a basic URL shortening web service made using NodeJS and Express. It returns a 5 digit key corresponding to a long URL and saves it in the database.
On opening the short URL, the original link is fetched from the database using the key generated.

## Steps to run the app
```
1. clone this repo
2. cd into this repo's directory
3. run the following command to start the server - node app.js
```
Open your favorite browser and go to https://localhost:3000/

*Note: The database is hosted on MongoLab.*
