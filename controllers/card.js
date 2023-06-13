const Card = require('../Models/cardModel.js');
const { appError } = require('../service/errorHandler');
const card = {
  async getCards(req, res, next) {
    const cards = await Card.find().populate('comments.commenter');
    res.status(200).json({
      status: 'success',
      data: cards,
    });
  },
  async getCard(req, res, next) {
    const searchPost = await Card.findById(req.params.cardId).populate('comments.commenter');
    if (searchPost) {
      res.status(200).json({
        status: 'success',
        data: searchPost,
      });
    } else {
      res.status(200).json({
        status: 'failed',
        data: '無資料',
      });
    }
  },
  async patchCard(req, res, next) {
    const searchPost = await Card.findById(req.params.cardId);
    if (searchPost) {
      const {
        headerCover,
        title,
        description,
        isPinned,
        tags,
        notification,
        dateRange,
        workingHours,
        importance,
        content,
      } = req.body;
      const patchData = {
        headerCover: headerCover,
        title: title,
        description: description,
        isPinned: isPinned,
        tags: tags,
        notification: notification,
        dateRange: dateRange,
        workingHours: workingHours,
        importance: importance,
        content: content,
      };
      await Card.findByIdAndUpdate(req.params.cardId, { ...patchData });
      res.status(200).json({
        status: 'success',
        data: '修改資料成功',
      });
    }
  },
  async patchCardContent(req, res, next) {
    const searchPost = await Card.findById(req.params.cardId);
    if (searchPost) {
      const { content } = req.body;
      if (typeof content === 'string') {
        await Card.findByIdAndUpdate(req.params.cardId, { content: content });
        res.status(200).json({
          status: 'success',
          data: '修改資料成功',
        });
      }
    }
  },
  async postCard(req, res, next) {
    const { title, dateRange, workingHours } = req.body;
    if (title === undefined || '') return;
    if (workingHours >= 0) {
      const newPost = await Card.create({
        title,
        dateRange,
        workingHours,
      });
      res.status(200).json({
        status: 'success',
        data: newPost,
      });
    } else {
      const newPost = await Card.create({
        title,
      });
      res.status(200).json({
        status: 'success',
        data: newPost,
      });
    }
  },
  async deleteCard(req, res, next) {
    const searchCard = await Card.findById(req.params.cardId);
    if (!searchCard) {
      res.status(200).json({
        status: 'failed',
        data: '刪除資料失敗',
      });
      return;
    }
    await Card.findByIdAndDelete(req.params.cardId);
    res.status(200).json({
      status: 'success',
      data: '刪除資料成功',
    });
  },
  async postCardComment(req, res, next) {
    const cardData = await Card.findById(req.params.cardId);
    if (cardData) {
      const { comment } = req.body;
      const newComment = {
        commenter: req.user.id,
        comment: comment,
      };
      cardData.comments.push(newComment);
      await cardData.save();
      res.status(200).json({
        status: 'success',
        data: '新增卡片評論成功',
      });
    }
  },
  async deleteCardComment(req, res, next) {
    const cardId = req.params.cardId;
    const commentId = req.params.commentId;
    const cardData = await Card.findById(cardId);
    const findComment = cardData.comments.filter(comment => comment._id == commentId);
    if (cardData && findComment.length > 0) {
      // 過濾掉要刪除的評論
      cardData.comments = cardData.comments.filter(comment => comment._id != commentId);
      await cardData.save();
      res.status(200).json({
        status: 'success',
        data: '刪除卡片評論成功',
      });
    } else {
      res.status(400).json({
        status: 'failed',
        data: '刪除卡片評論失敗',
      });
    }
  },
  async postCardToDo(req, res, next) {
    const cardData = await Card.findById(req.params.cardId);
    if (cardData) {
      const { title } = req.body;
      const toDo = {
        title: title,
      };
      cardData.toDoList.push(toDo);
      console.log(cardData.toDoList);
      await cardData.save();
      res.status(200).json({
        status: 'success',
        data: '新增卡片待辦清單成功',
      });
    }
  },
  async patchCardToDo(req, res, next) {
    const { title, workingHours, dateRange, isFinished } = req.body;
    const result = await Card.updateOne(
      { _id: req.params.cardId, 'toDoList._id': req.params.toDoId },
      {
        $set: {
          'toDoList.$.title': title,
          'toDoList.$.workingHours': workingHours,
          'toDoList.$.dateRange': dateRange,
          'toDoList.$.isFinished': isFinished,
        },
      }
    );
    if (result.matchedCount > 0) {
      res.status(200).json({
        status: 'success',
        data: '修改資料成功',
      });
    }
  },
  async deleteCardToDo(req, res, next) {
    const cardId = req.params.cardId;
    const toDoId = req.params.toDoId;
    const cardData = await Card.findById(cardId);
    const findToDo = cardData.toDoList.filter(toDo => toDo._id == toDoId);
    if (cardData && findToDo.length > 0) {
      // 過濾掉要刪除的 toDo
      cardData.toDoList = cardData.toDoList.filter(toDo => toDo._id != toDoId);
      await cardData.save();
      res.status(200).json({
        status: 'success',
        data: '刪除卡片待辦清單成功',
      });
    } else {
      res.status(400).json({
        status: 'failed',
        data: '刪除卡片待辦清單失敗',
      });
    }
  },
};
module.exports = card;
