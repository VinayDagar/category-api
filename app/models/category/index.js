const fields = require('./fields');

const CategorySchema = new MongooseSchema(fields, {
    timestamp: true
});

module.exports = MongooseConnect.model('Category', CategorySchema);