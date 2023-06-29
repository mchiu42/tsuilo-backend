const Board = require('../Models/boardModel.js');
const { appError } = require('../service/errorHandler');
const board = {
  async getBoardInfo(req, res, next) {
    const boardInfo = await Board.findById(req.params.boardId);
    res.status(200).json({
        success: true,
        status: 'success',
        data: boardInfo,
      });
  },
  async postBoard(req, res, next) {
    const { title } = req.body;
    const newBoard = await Board.create({
      title,
    });
    res.status(200).json({
      success: true,
      status: 'success',
      data: newBoard,
    });
  },
};
module.exports = board;
