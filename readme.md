# REST API

resource: song

**C** reate
**R** ead
**U** pdate
**D** elete

**POST /songs**        // create a song
```javascript
{
    "titulo": "Times go by",
    "artista": "Madona",
    "año": "199"
}
```

**GET /songs**         // read songs

**GET /songs/:id**     // read the song :id

**PATCH /songs/:id**   // update the song :id
```javascript
{
    "artista": "Ray Conniff"
}
```

**PUT   /songs/:id**   // update the song :id
```javascript
{
    "titulo": "Bésame mucho",
    "artista": "Ray Conniff",
    "año": "1995"
}
```

**DELETE /songs/:id**  // delete the song :id

[heroku link](https://x-express-web.herokuapp.com/)