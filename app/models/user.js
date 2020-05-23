const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    //Schema Data
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },

    password: {
        type: String,
        required: false
    },

    created_at: {
        type: Date,
        default: Date.now
    },
    modified_at: Date,
    created_by: { type : String },
    modified_by: { type : String }
});

UsersSchema.methods.setCreatedBy = function(user) {
    return this.created_by = user;
}

UsersSchema.methods.setModifiedBy = function(user) {
    return this.modified_by = user;
}

UsersSchema.methods.setModifiedAt = function() {
    return this.modified_at = new Date();
}


module.exports = mongoose.model('User', UsersSchema);
