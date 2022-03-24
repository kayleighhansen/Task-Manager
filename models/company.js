const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
   _id: {
      type: Number,
      required: true,
   },
   company_name: {
      type: String,
      required: true,
   },
   logo: {
      type: String,
      required: true,
   },
   employees: [
     {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
     }
   ],
   tasks: [
      {
         type: Schema.Types.ObjectId,
         ref: "Task"
      },
   ],
});

module.exports = mongoose.model('User', userSchema)