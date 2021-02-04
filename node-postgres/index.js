const express = require('express');
const app = express();
const port = 3001;

const movie_model = require('./movie_model');

app.use(express.json());
app.use(function (req, res, next) {
    var allowedOrigins = ['http://localhost:30002', 'http://localhost:30003','http://localhost:3000','http://localhost:8081'];
    var origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
});

app.get('/', (req, res) => {
    movie_model.getMovies()
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        });
});

app.get('/movie/:id', (req, res) => {
    movie_model.getMovie(req.params.id)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        });
});

app.post('/movies', (req, res) => {
    movie_model.createMovie(req.body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        });
});

app.post('/update/:id', (req, res) => {
    movie_model.deleteMovie(req.params.id)
        .then(response => {
            movie_model.createMovie(req.body)
                    .then(response => {
                        res.status(200).send(response);
                    })
                    .catch(error => {
                        res.status(500).send(error);
                    });
            })
        .catch(error => {
            res.status(500).send(error);
        });
});

app.delete('/movies/:id', (req, res) => {
    movie_model.deleteMovie(req.params.id)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        });
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});
