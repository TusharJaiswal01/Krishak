
const mongoose = require('mongoose');

const forumSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    farmName: {
        type: String,
        required: true,
    },
    cropType: {
        type: String,
        required: true,

    },

    cropVariety: {
        type: String,
        required: true,
    },

    growthStage: {
        type: String,
        required: true,
    },
    problemType: {
        type: String,
        required: true,
    },
    detailedDescription: {
        type: String,
        required: true,
    },
    images: {
        type: String,
        required: true,
    },
    imageDescriptions: {
        type: String,
        required: true,
    },
    desiredOutcome: {
        type: String,
        required: true,
    },
    previousTreatments: {
        type: String,
        required: true,
    },


});

module.exports = mongoose.model('Forum', forumSchema);


