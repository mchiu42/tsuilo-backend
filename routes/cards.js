const express = require('express');
const router = express.Router();
const CardControllers = require('../controllers/card.js');
const { handleAsyncError } = require('../service/errorHandler');
const { isAuth } = require('../service/auth');

router.get(
  '/:cardId',
  handleAsyncError((req, res, next) => CardControllers.getCard(req, res, next))
);
router.get(
  '/',
  handleAsyncError((req, res, next) => CardControllers.getCards(req, res, next))
);
router.post(
  '/',
  isAuth,
  handleAsyncError((req, res, next) => CardControllers.postCard(req, res, next))
);
router.post(
  '/:cardId/comment',
  isAuth,
  handleAsyncError((req, res, next) => CardControllers.postCardComment(req, res, next))
);
router.post(
  '/:cardId/toDoList',
  isAuth,
  handleAsyncError((req, res, next) => CardControllers.postCardToDo(req, res, next))
);
router.patch(
  '/:cardId',
  isAuth,
  handleAsyncError((req, res, next) => CardControllers.patchCard(req, res, next))
);
router.patch(
  '/:cardId/content',
  isAuth,
  handleAsyncError((req, res, next) => CardControllers.patchCardContent(req, res, next))
);
router.delete(
  '/:cardId',
  isAuth,
  handleAsyncError((req, res, next) => CardControllers.deleteCard(req, res, next))
);
router.delete(
  '/:cardId/comment/:commentId',
  isAuth,
  handleAsyncError((req, res, next) => CardControllers.deleteCardComment(req, res, next))
);
router.patch(
  '/:cardId/toDoList/:toDoId',
  isAuth,
  handleAsyncError((req, res, next) => CardControllers.patchCardToDo(req, res, next))
);
router.delete(
  '/:cardId/toDoList/:toDoId',
  isAuth,
  handleAsyncError((req, res, next) => CardControllers.deleteCardToDo(req, res, next))
);

module.exports = router;
