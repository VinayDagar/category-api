/**
*   @author: Vinay Dagar
*   configuration is define to make connection with the database for the different environment.
*/

const dotenv = require('dotenv');

module.exports = () => {
    dotenv.config({
        path: `${__dirname}/../env/${process.env.NODE_ENV}.env`,
    });

    const options = {
        useNewUrlParser: true,
        socketTimeoutMS: 10000,
        useUnifiedTopology: true,
    };

    Mongoose.connect(process.env.DATABASE_URL, options);

    Mongoose.set('debug', true)

    const db = Mongoose.connection;

    db.on('error', (err) => {
        Logger.error(err)
    });

    db.on('open', () => {
        Logger.info('Database connected!')
    })

    return db;
}