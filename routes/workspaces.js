var express = require('express');
var router = express.Router();
const WorkSpace = require('../Models/workspaceModel');

// get 所有 workSpace 的資料
router.get('/', async (request, response) => {
  const data = await WorkSpace.find();
  console.log(data);
  response.status(200).json({
    success: true,
    data,
  });
});

// // get 所有有 updateTime 的資料
// router.get('/updated', async (request, response) => {
//   const currentDate = new Date();
//   console.log(currentDate);
//   const data = await WorkSpace.find({
//     $or: [{ updatedAt: { $lte: currentDate } }, { createdAt: { $lte: currentDate } }],
//   });
//   console.log(data);
//   response.status(200).json({
//     success: true,
//     data,
//   });
// });

// get 單一 workSpace 的資料
router.get('/:workspaceID', async (request, response) => {
  console.log(request.params);
  const workSpace = await WorkSpace.findById(request.params.workspaceID);
  console.log(workSpace);
  response.status(200).json({
    workSpace,
  });
});

// post 新增一筆 workspace
router.post('/', async (request, response) => {
  console.log('body', request.body);
  try {
    const data = await WorkSpace.create({
      ownerId: request.body.ownerId,
      ownerName: request.body.ownerName,
      spaceName: request.body.spaceName,
      isPublic: request.body.isPublic,
    });
    console.log('data', data);
    response.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log('error', error);
  }
});

// 刪除 單一筆 workspace 的資料
router.delete('/:workspaceID', async (request, response) => {
  const id = request.params.workspaceID;
  try {
    const deleteData = await WorkSpace.findByIdAndDelete(id);
    console.log('deleteData', deleteData);
    response.status(200).json({
      deleteData,
    });
    console.log(deleteData);
  } catch (error) {
    console.log('error', error);
  }
});

// 修改 單一筆 workspace 的資料
router.patch('/:workspaceID', async (request, response) => {
  const id = request.params.workspaceID;
  const currentDate = new Date();
  console.log(currentDate);
  try {
    const data = await WorkSpace.findByIdAndUpdate(id, {
      updatedAt: currentDate,
      spaceName: request.body.spaceName,
      description: request.body.description,
      isPublic: request.body.isPublic,
    });
    console.log('data', data);
    response.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log('error', error);
  }
});

module.exports = router;
