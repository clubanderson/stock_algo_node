// const Pool = require('pg').Pool;
// const pool = new Pool({
//     user: 'postgresadmin',
//     host: 'postgres',
//     // host: 'localhost',
//     database: 'postgresdb',
//     password: 'admin123',
//     port: 5432,
// });
const Pool = require('mysql');
const pool = Pool.createConnection({
    user: 'root',
    // host: 'localhost',
    host: 'mysql',
    database: 'mysql',
    password: 'admin123',
    port: 3306,
});

const getMovies = () => {
    return new Promise(function(resolve, reject) {
        pool.query('SELECT * FROM movies ORDER BY id ASC', (error, results) => {
            // pool.query('SELECT * FROM movies ORDER BY id ASC', (error, results) => {
            if (error) {
                reject(error)
            }
            console.log(results);
            resolve(results);
        })
    })
};

const getMovie = (id) => {
    return new Promise(function(resolve, reject) {
        pool.query('SELECT * FROM movies WHERE id = $1', [id], (error, results) => {
            // pool.query('SELECT * FROM movies WHERE id = $1', [id], (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows);
        })
    })
}

const createMovie = (body) => {
    return new Promise(function(resolve, reject) {
        const { budget, homepage, id, original_language, original_title, overview, popularity, release_date, revenue, runtime, status, tagline, title, vote_average, vote_count } = body;
        pool.query('INSERT INTO movies (budget, homepage, id, original_language, original_title, overview, popularity, release_date, revenue, runtime, status, tagline, title, vote_average, vote_count) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *', [budget, homepage, id, original_language, original_title, overview, popularity, release_date, revenue, runtime, status, tagline, title, vote_average, vote_count], (error, results) => {
            // pool.query('INSERT INTO movies (budget, homepage, id, original_language, original_title, overview, popularity, release_date, revenue, runtime, status, tagline, title, vote_average, vote_count) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *', [budget, homepage, id, original_language, original_title, overview, popularity, release_date, revenue, runtime, status, tagline, title, vote_average, vote_count], (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(`A new movie has been added added: ${results.rows[0]}`)
        })
    })
};

const deleteMovie = (id) => {
    return new Promise(function(resolve, reject) {
        // const id = parseInt(request.params.id);
        pool.query('DELETE FROM movies WHERE id = $1', [id], (error, results) => {
            // pool.query('DELETE FROM movies WHERE id = $1', [id], (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(`Movie deleted with ID: ${id}`)
        })
    })
};

module.exports = {
    getMovies,
    getMovie,
    createMovie,
    deleteMovie,
};