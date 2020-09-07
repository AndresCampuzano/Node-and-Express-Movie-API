const Joi = require('joi');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const movies = [
    {
        genre: 'action',
        list: [
            {
                id: 1,
                name: 'action movie 01'
            },
            { id: 2, name: 'action movie 02' }
        ]
    },
    {
        genre: 'comedy',
        list: [
            {
                id: 3,
                name: 'comedy movie 01'
            },
            { id: 4, name: 'comedy movie 02' }
        ]
    },
    {
        genre: 'drama',
        list: [
            { id: 5, name: 'drama movie 01' },
            { id: 6, name: 'drama movie 02' }
        ]
    }
];

app.get('/api/movies', (req, res) => {
    res.send(movies);
});

// Get by genre
app.get('/api/movies/:genre', (req, res) => {
    const genre = movies.find(m => m.genre === req.params.genre);
    if (!genre) {
        return res.status(404).send('Genre was now found');
    }
    res.send(genre);
});

// Get by genre and id
app.get('/api/movies/:genre/:id', (req, res) => {
    const genre = movies.find(m => m.genre === req.params.genre);
    const movie = genre.list.find(m => m.id === parseInt(req.params.id));
    if (!movie) {
        return res.status(404).send('Movie was now found');
    }
    res.send(movie);
});

// Delete by genre
app.delete('/api/movies/:genre', (req, res) => {
    const genre = movies.find(m => m.genre === req.params.genre);
    if (!genre) {
        return res.status(404).send('Genre was now found');
    }
    const index = movies.indexOf(genre);
    movies.splice(index, 1);
    res.send(genre);
});

// Delete an item inside a genre <<<<<<<<<<<<<<<<<<<<<< FIX >>>>>>>>>>>>>>>>>>>>>>>
app.delete('/api/movies/:genre/:id', (req, res) => {
    const genre = movies.find(m => m.genre === req.params.genre);
    const movie = genre.list.find(m => m.id === parseInt(req.params.id));
    if (!movie) {
        return res.status(404).send('Movie was now found');
    }
    const index = genre.list.indexOf(movie);
    genre.list.splice(index, 1);
    res.send(movie);
});

// Create a genre
app.post('/api/movies', (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const genreToPush = {
        genre: req.body.genre,
        list: []
    };
    movies.push(genreToPush);
    res.send(genreToPush);
});

// Create a movie inside a genre
app.post('/api/movies/:genre', (req, res) => {
    const { error } = validateMovie(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    const genre = movies.find(m => m.genre === req.params.genre);
    const movieToPush = {
        id: Math.floor(Math.random() * 9999999),
        name: req.body.name
    };
    genre.list.push(movieToPush);
    res.send(movieToPush);
});

// Update a genre
app.put('/api/movies/:genre', (req, res) => {
    const genre = movies.find(m => m.genre === req.params.genre);
    if (!genre) {
        return res.status(404).send('Genre was now found');
    }
    const { error } = validateGenre(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    genre.genre = req.body.genre;
    res.send(genre);
});

// Update a movie inside a genre
app.put('/api/movies/:genre/:id', (req, res) => {
    const genre = movies.find(m => m.genre === req.params.genre);
    const { error } = validateMovie(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    const movie = genre.list.find(m => m.id === parseInt(req.params.id));
    movie.name = req.body.name;
    res.send(movie);
});

// Validation function genre
function validateGenre(genre) {
    const schema = Joi.object({ genre: Joi.string().min(3).required() });
    return schema.validate(genre);
}

// Validation function movie
function validateMovie(movie) {
    const schema = Joi.object({ name: Joi.string().min(3).required() });
    return schema.validate(movie);
}

const port = process.env.PORT || 9000;
app.listen(port, () => console.log(`Listening on port ${port}`));
