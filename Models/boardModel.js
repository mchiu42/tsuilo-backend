const { Schema, model } = require('mongoose');
const boardSchema = new Schema({
  user_id: 
    {
      type: Schema.ObjectId,
      ref: 'user',
    },
  
  title: {
    type: String,
    default: '未命名看版',
  },
  list: {
    type: Schema.ObjectId,
    ref: 'list',
  },
  isPinned: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    select: false,
  },
});
// Board
const Board = model('board', boardSchema);

module.exports = Board;
