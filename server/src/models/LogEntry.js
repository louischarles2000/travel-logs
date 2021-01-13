const mongoose = require('mongoose');

const { Schema } = mongoose;

// * Title - Text
// * Description - Text
// * Comments - Text
// * Rating -  scale of 1 - 10
// * Image - Text - URL
// * Start Date -Date
// * End Date - Date
// * Latitude - Number
// * Longitude - Number
// * Created at - Date
// * Updated at - Date

const requiredNumber = {
    type: Number,
    required: true
}

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    comments: String,
    rating: {
        type: Number,
        min: 1,
        max: 10,
        default: 0
    },
    image: String,
    latitude: {
        ...requiredNumber,
        min: -90,
        max: 90
    },
    longitude: {
        ...requiredNumber,
        min: -180,
        max: 180
    },
    visitDate: {
        required: true,
        type: Date
    }
}, {
    timestamps: true
});

const LogEntry = mongoose.model('LogEntry', blogSchema);

module.exports = LogEntry;