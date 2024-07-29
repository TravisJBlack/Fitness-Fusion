const { Schema, model } = require('mongoose');

const membershipSchema = new Schema ({
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
})

const Membership = model('Membership', membershipSchema);

module.exports = Membership;