const fields = require('./fields');

const SubCategorySchema = new MongooseSchema(fields, {
    timestamp: true
});

module.exports = MongooseConnect.model("SubCategory", SubCategorySchema)
