const { Schema, model } = require('mongoose');

const classSchema = new Schema ({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    schedule: {
        type: String,
        required: true
    }
})

const Class = model('Class', classSchema);

module.exports = Class;