const Task = require('../models/task');
const User = require('../models/user');

exports.createTask = (res, req, next) => {
    const title = req.body.title;
    const description = req.body.description;
    const dateCreated = req.body.created;
    const dueDate = req.body.dueDate;
    const status = req.body.status;
    const creatorUserId = req.body.userId;
    const assignedTo = req.body.assignedTo;
    const priority = req.body.priority;

    let creator;
    const task = new Task({
        title: title,
        description: description,
        date_created: dateCreated,
        due_date: dueDate,
        status: status,
        creator_user_id: creatorUserId,
        assigned_to: assignedTo,
        priority: priority
    });
    task
        .save()
        .then(result => {
            return User.findById(creatorUserId);
        })
        .then(user => {
            creator = user;
            user.tasks.push(task);
            return user.save();
        })
        .then(result => {
            
        })
};