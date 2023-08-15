const mongoose = require("mongoose");

// Store a JWT into a database with a payload that contains the hashed value of the verification ID using bcrypt
// EmailToken ---> JWT consisting: ---> Payload ---> bcryptjs[Verification ID (UUID)]
const EmailTokenSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    token : {
        type: String,
        required: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('EmailToken', EmailTokenSchema);