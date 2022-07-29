import { apiStatus, httpStatus } from '../constants/index.js';
import CustomError from '../error/custom.error.js';
import Grammar from '../models/grammar.js';
import ChapterService from '../service/chapter.service.js';
import GrammarService from '../service/grammar.service.js';
import UserService from '../service/user.service.js';

export const getGrammarById = async (req, res) => {
  try {
    let grammarId = req.query.grammarId;
    let grammar = await GrammarService.findGrammarById(grammarId);
    return res.status(httpStatus.OK).send({
      status: apiStatus.SUCCESS,
      message: 'get grammar successfully',
      data: grammar,
    });
  } catch (err) {
    if (err instanceof CustomError) {
      return res.status(err.httpStatus).send({
        status: err.apiStatus,
        message: err.message,
      });
    }
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      status: apiStatus.OTHER_ERROR,
      message: err.message,
    });
  }
};

export const addGrammar = async (req, res) => {
  try {
    const addGrammarRequest = new Grammar({
      chapter: req.body.chapter,
      title: req.body.title,
      sound: req.body.sound,
      image: req.body.image,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    let newGrammar = await GrammarService.addGrammar(addGrammarRequest);
    return res.status(httpStatus.OK).send({
      status: apiStatus.SUCCESS,
      message: 'add grammar successfully',
      data: newGrammar,
    });
  } catch (err) {
    if (err instanceof CustomError) {
      return res.status(err.httpStatus).send({
        status: err.apiStatus,
        message: err.message,
      });
    }
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      status: apiStatus.OTHER_ERROR,
      message: err.message,
    });
  }
};

export const updateGrammar = async (req, res) => {
  try {
    let grammarId = req.params.grammarId;
    let listProps = ['chapter', 'title', 'sound', 'image'];
    let updateRequest = {};
    for (let i = 0; i < listProps.length; i++) {
      let props = listProps[i];
      if (req.body[props] !== undefined) {
        updateRequest[props] = req.body[props];
      }
    }
    updateRequest['updatedAt'] = Date.now();
    let updateGrammar = await GrammarService.updateGrammar(updateRequest, grammarId);

    return res.status(httpStatus.OK).send({
      status: apiStatus.SUCCESS,
      message: 'update grammar successfully',
      data: updateGrammar,
    });
  } catch (err) {
    if (err instanceof CustomError) {
      return res.status(err.httpStatus).send({
        status: err.apiStatus,
        message: err.message,
      });
    }
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      status: apiStatus.OTHER_ERROR,
      message: err.message,
    });
  }
};

export const deleteGrammar = async (req, res) => {
  try {
    let grammarId = req.params.grammarId;
    let deleteGrammar = await GrammarService.deleteGrammar(grammarId);
    return res.status(httpStatus.OK).send({
      status: apiStatus.SUCCESS,
      message: 'delete grammar successfully',
      data: deleteGrammar,
    });
  } catch (err) {
    if (err instanceof CustomError) {
      return res.status(err.httpStatus).send({
        status: err.apiStatus,
        message: err.message,
      });
    }
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      status: apiStatus.OTHER_ERROR,
      message: err.message,
    });
  }
};

export const getListGrammarByChapter = async (req, res) => {
  try{
    let userId = req.userId;
    let chapterId = req.query.chapterId;
    let user = await UserService.findUserById(userId);
    let status = user.progressGrammar.includes(chapterId) ? 1 : 0;
    let chapter = await ChapterService.findChapterById(chapterId);
    let listGrammar = await GrammarService.findAllGrammarByChapter(chapterId);
    return res.status(httpStatus.OK).send({
      status: apiStatus.SUCCESS,
      message: "Get list grammar successfully",
      data: {
        items: listGrammar,
        totalItems: listGrammar.length,
        chapterName: chapter.name,
        status: status
      }
    });
  }catch(err){
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      status: apiStatus.OTHER_ERROR,
      message: err.message,
    });
  }
}

export const getListGrammarWithPaginationAndKeyword = async (req, res) => {
  try{
    let size = req.query.limit;
    let page = req.query.offset;
    if(page <= 0 || size <= 0 ) {
      return res.status(httpStatus.BAD_REQUEST).send({
        status: apiStatus.INVALID_PARAM,
        message: "Limit and Offset must be greater than 0"
      });
    }
    let keyword = req.query.keyword;

    let listGrammar = await GrammarService.findAllGrammarWithPaginationAndKeyword(page, size, keyword);
    return res.status(httpStatus.OK).send({
      status: apiStatus.SUCCESS,
      message: "Get list grammar successfully",
      data: listGrammar
    });
  }catch(err){
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      status: apiStatus.OTHER_ERROR,
      message: err.message,
    });
  }
}