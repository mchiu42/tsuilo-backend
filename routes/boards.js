const express = require('express');
const router = express.Router();
const BoardControllers = require('../controllers/board.js');
const { handleAsyncError } = require('../service/errorHandler');
const { isAuth } = require('../service/auth');

router.get(
  '/:boardId',
  handleAsyncError((req, res, next) => BoardControllers.getBoardInfo(req, res, next))
);

router.post(
    '/',
    handleAsyncError((req, res, next) => BoardControllers.postBoard(req, res, next))
  );

module.exports = router;
