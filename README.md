# Node and Express Movie API CRUD

REST API for movies, it can be shorted by genre or id of each movie.
Using **Joi** for validations.

API structure:

> genre
> -- list
> --- movie
> --- movie
> genre
> -- list
> --- movie
> --- movie

### GET

##### Getting all genres and movies

```
http://localhost:9000/api/movies
```

##### Getting a genre

```
http://localhost:9000/api/movies/drama
```

##### Getting a movie inside a genre

```
http://localhost:9000/api/movies/drama/5
```

### DELETE

We can delete an entire genre or a movie inside a genre. _id_ of each movie is required.

### Update

##### Updating a genre

```
http://localhost:9000/api/movies/drama
```

then

```
{
    "genre": "new genre name here (drama02)"
}
```

##### Updating a movie inside a genre

```
http://localhost:9000/api/movies/drama/5
```

then

```
{
    "name": "new movie name here (Harry Potter)"
}
```

### CREATE

##### Creating a genre

```
http://localhost:9000/api/movies
```

then

```
{
    "genre": "Adventure"
}
```

##### Creating a movie inside a genre

```
http://localhost:9000/api/movies/drama
```

then

```
{
    "name": "Another Harry Potter movie"
}
```

👉Since this is my first Node project, any feedback will be appreciated.

**Dependencies**

-   cosr
-   joi
-   express

## Contact me

Reach out to me at one of the following places!

-   Website at <a href="https://andrescampuzano.com" target="_blank">`andrescampuzano.com`</a>
-   Twitter at <a href="http://twitter.com/andrescampuzan0" target="_blank">`@AndresCampuzan0`</a>
-   <a href='mailto:hello@andrescampuzano.com'>Email</a>
