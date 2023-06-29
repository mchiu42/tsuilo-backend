const mongoose = require('mongoose');

const workSpaceSchema = new mongoose.Schema({
  ownerName: {
    type: String,
    required: [true, '擁有者 未填寫'],
  },
  ownerId: {
    type: String,
    required: [true, '擁有者 未填寫'],
  },
  spaceName: {
    type: String,
    required: [true, '標題 未填寫'],
  },
  description: {
    type: String,
    default: '',
  },
  // 新增日期
  createdAt: {
    type: Date, // 資料格式為日期格式
    default: Date.now(),
    // select: false, // 預設不顯示
  },
  // 更新日期
  updatedAt: {
    type: Date, // 資料格式為日期格式
    default: Date.now(),
    // select: false, // 預設不顯示
  },
  isPublic: {
    type: Boolean,
    default: false,
  },
});

const WorkSpace = mongoose.model('WorkSpaces', workSpaceSchema);
module.exports = WorkSpace;
