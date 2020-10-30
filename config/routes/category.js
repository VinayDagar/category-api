const router = require('express').Router();
const controller = require('../../app/controllers');
const { validate } = Validate;

// const validationSchema = require('../../app/validation');

router.post('/create-category',
    // validate(validationSchema.category.createCategory),
    controller.categoryController.createCategory
).post('/create-sub-category',
    // validate(validationSchema.category.createSubCategory),
    controller.categoryController.createSubCategory
)

router.get('/sub-category-list',
    // validate(validationSchema.category.createCategory),
    controller.categoryController.getCategoryList
)
    .put('/update-sub-category/:categoryId',
        // validate(validationSchema.category.createCategory),
        controller.categoryController.updateCategoriesOrder
    )

module.exports = router
