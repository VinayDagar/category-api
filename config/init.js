const bodyParser = require('body-parser');
const helmet = require('helmet');
const hpp = require('hpp');
const cors = require('cors');
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(helmet())
app.use(hpp())
app.use(cors())

const init = () => {
    app.listen(process.env.PORT, () => {
        Logger.info(`Express server starting at port ${process.env.PORT} in ${process.env.NODE_ENV}`)
    })
}

init();
