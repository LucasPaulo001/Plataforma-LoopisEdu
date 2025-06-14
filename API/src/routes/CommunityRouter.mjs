import express from "express";
const communityRouter = express.Router();

//Middlewares
import { authGuard } from "../middlewares/authGuard.mjs";
import validate from "../middlewares/handleValidation.mjs";
import { roleGuard } from "../middlewares/roleGuard.mjs";


//Controllers
import {
    postInCommunity,
    listPosts,
    likeInPostCommunity,
    fixedPost,
    responsePost,
    deletePost,
    editPost,
    listFixedPosts,
    deleteResponse,
    editResponse,
    sendWish,
    listWish,
    aproveWish,
    UpWish,
    editWish,
    wishDelete

} from "../controllers/CommunityController.mjs";


//Rotas
communityRouter.post('/addPublish', authGuard, validate, postInCommunity);

communityRouter.get('/posts', authGuard, listPosts);

communityRouter.patch('/like', authGuard, validate, likeInPostCommunity);

communityRouter.patch('/fixedPost', authGuard, validate, fixedPost);

communityRouter.post('/response', authGuard, validate, responsePost);

communityRouter.delete('/deletePost', authGuard, deletePost);

communityRouter.put('/editPost', authGuard, editPost);

communityRouter.get('/listFixed', authGuard, listFixedPosts);

communityRouter.delete('/response/delete', authGuard, deleteResponse);

communityRouter.put('/response/edit', authGuard, editResponse);

communityRouter.post('/sendWish', authGuard, sendWish);

communityRouter.get('/listWish', authGuard, listWish);

communityRouter.patch('/aproveWish', authGuard, validate, aproveWish);

communityRouter.patch('/Up', authGuard, UpWish);

communityRouter. patch('/editWish', authGuard, validate, editWish);

communityRouter.delete('/wishDelete', authGuard, validate, wishDelete);



export default communityRouter;