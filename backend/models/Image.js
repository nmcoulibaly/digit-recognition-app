const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    pixels: [Number],
    predict: [Number]
});

module.exports = Image = mongoose.model('Image', ImageSchema, "predict");
