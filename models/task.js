const mongoose = require('mongoose');

const Schema = mongoose.Schema;

module.exports = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date_created: {
        type: Date,
        default: Date.now(),
        required: true
    },
    due_date: {
        type: Date,
        required: true
    },
    status: {
        type: string,
        required: true
    },
    creator_user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    assigned_to: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    taskId: {
        type: Schema.Types.ObjectId,
        ref: 'Task',
        required: true
    }
});