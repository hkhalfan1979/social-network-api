const { ObjectId } = require('bson');
const {Schema, Types}= require('mongoose');
const {format_date} = require('../utils/dateFormat')


const reactionSchema = new Schema(
  {
    reactionId:{
      type: Schema.Types.ObjectId,
      default: ()=> new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true, 
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
 createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => format_date(timestamp),
    },
  },
  {
    toJSON: {
       virtuals: true,
     },
     id: false,
   }
 );

 module.exports = reactionSchema ;