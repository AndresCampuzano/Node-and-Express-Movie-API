const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const movies = [
    {
        genre: 'action',
        list: [
            { id: 1, name: 'action movie 01' },
            { id: 2, name: 'action movie 02' }
        ]
    },
    {
        genre: 'comedy',
        list: [
            { id: 3, name: 'comedy movie 01' },
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

app.get('/api/movies/:genre', (req, res) => {
    const genre = movies.find(m => m.genre === req.params.genre);
    if (!genre) {
        return res.status(404).send('Genre was now found');
    }
    res.send(genre);
});

app.get('/api/movies/:genre/:id', (req, res) => {
    const genre = movies.find(m => m.genre === req.params.genre);
    const movie = genre.list.find(m => m.id === parseInt(req.params.id));
    if (!movie) {
        return res.status(404).send('Movie was now found');
    }
    res.send(movie);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
