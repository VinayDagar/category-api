module.exports = {
    name: {
        type: String,
        required: true
    },
    category: {
        type: ObjectId,
        required: true,
        ref: "Category"
    },
    status: {
        type: String,
        required: true,
        default: 'active'
    },
    order: {
        type: Number,
        default: 0
    }
}