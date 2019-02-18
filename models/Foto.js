const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FotoSchema = new Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },
    image: String,
    information: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Foto = mongoose.model("Artist", FotoSchema);

module.exports = Foto;