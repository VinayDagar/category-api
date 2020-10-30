const { Joi } = Validate;

const createCategory = {
    body: Joi.object({
        name: Joi.string()
            .required()
            .min(3)
            .message('Category name is required!')
    })
};

const createSubCategory = {
    body: Joi.object({
        name: Joi.string()
            .required()
            .message('name is required!'),
        // category: Joi.string()
        //     // .required()
        //     .message("Category is required!")
    })
};

module.exports = {
    createCategory,
    createSubCategory
}