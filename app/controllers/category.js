const domain = require("../models");
const views = require("../views");

exports.createCategory = async (req, res, next) => {
    try {
        const { name } = req.body;

        if (!name) {
            const error = new Error('category name not found!');
            error.statusCode = 400;
            return next(error);
        }

        await new domain.Category({ name }).save();
        const response = views.JsonView({ message: 'Category successfully added!' });

        return res.status(201).json(response)
    } catch (err) {
        next(err)
    }
}

exports.createSubCategory = async (req, res, next) => {
    try {
        const { name, order, categoryId } = req.body;

        if (!name || !categoryId) {
            const error = new Error('category and name are required!');
            error.statusCode = 400;
            return next(error);
        }


        console.log({ categoryId })

        const category = await domain.Category.findById(categoryId);

        if (!category) {
            const error = new Error("Category not found!")
            error.statusCode = 404;
            return next(error);
        }

        const subCategories = await domain.SubCategory.find({}, { order: 1 });
        let newOrder = 0;

        if (subCategories && subCategories.length) {
            subCategories.forEach((e, i) => newOrder = i + 1)
        }

        const data = {
            name,
            category,
            order: newOrder
        }

        await new domain.SubCategory(data).save();
        const response = views.JsonView({ message: 'Category successfully added!' });

        return res.status(201).json(response)
    } catch (err) {
        next(err)
    }
}

exports.getCategoryList = async (req, res, next) => {
    try {
        const { limit, skip } = req.query;
        let categories = await domain.SubCategory.aggregate([
            {
                $facet: {
                    metadata: [{ $count: 'count' }],
                    data: [
                        { $skip: parseInt(skip) }, { $limit: parseInt(limit) },
                        {
                            $lookup: {
                                from: "categories",
                                localField: 'category',
                                foreignField: '_id',
                                as: 'category'
                            }
                        }, {
                            $project: {
                                '_id': "$_id",
                                "order": "$order",
                                "name": "$name",
                                "category": {
                                    $first: "$category",
                                },
                            }
                        }, {
                            $project: {
                                '_id': "$_id",
                                "order": "$order",
                                "name": "$name",
                                "category._id": "$category._id",
                                "category.name": "$category.name",

                            }
                        }],
                },
            }
        ])

        categories = categories[0]
        categories = { ...categories, count: categories.metadata[0].count }

        delete categories.metadata

        const response = views.JsonView({ categories })
        return res.status(200).json(response);
    } catch (err) {
        next(err)
    }
}

exports.updateCategoriesOrder = async (req, res, next) => {
    try {
        const { categoryId } = req.params;

        if(!categoryId) {
            const error = new Error("Category id is requried!")
            error.statusCode = 400;
            return next(error)
        }
        
        if(!Object.keys(req.body).length) {
            const error = new Error("content is requried!")
            error.statusCode = 400;
            return next(error)    
        }

        const category = await domain.SubCategory.findOne({_id: categoryId});

        if(!category) {
            const error = new Error('category not found!')
            error.statusCode = 404
            return next(error)
        }

        await domain.SubCategory.findByIdAndUpdate( categoryId, req.body);

        const response = views.JsonView({message: "Sub category successfully updated!"})
        return res.status(200).json(response)

    } catch (err) {
        next(err)
    }
}
