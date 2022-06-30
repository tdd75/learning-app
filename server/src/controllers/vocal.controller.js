import { httpStatus, apiStatus } from '../constants/index.js';
import CustomError from '../error/custom.error.js';
import WordService from '../service/word.service.js';
import UserService from '../service/user.service.js';
import Word from '../models/word.js';


export const getQuiz = async (req, res) => {
  try {
    let topicId  = req.query.topicId; 
 
    let wordInTopic = await WordService.findByTopic(topicId);
    let randMeaningSet = new Set()

    for(let i = 0; i< wordInTopic.length;i++){
      let word = wordInTopic[i];
      randMeaningSet.add(word.shortDesc)
    }

    let dataReturn = [];

    function getRandomItem(set) {
      let items = Array.from(set);
      return items[Math.floor(Math.random() * items.length)];
    }

    for(let i = 0; i< wordInTopic.length;i++){

      let word = wordInTopic[i];
      let trueMeaning = word.shortDesc;
      let wrongMeaning = new Set()

      while(wrongMeaning.size < 3){
        let rand = getRandomItem(randMeaningSet)
        if (wrongMeaning.has(rand)){
            continue;
        }else{
          wrongMeaning.add(rand)
          
        }
      }

      console.log(wrongMeaning)

      let quiz = {
        word: word,
        trueMeaning: trueMeaning,
        wrongMeaning: Array.from(wrongMeaning)
      }

      dataReturn.push(quiz)
 
    }


    let dataReturnFinal = {

      "items": dataReturn,
      "totalItems" : dataReturn.length
    }
 

    return res.status(httpStatus.OK).send({
      status: apiStatus.SUCCESS,
      message: 'Get quiz successfuly ',
      data: dataReturnFinal,
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

/**
 * Get All Volcabulary (has paging)
 * @param {Object} res response API
 * @returns status API + message + data
 */
export const getAllVol = async (req, res) => {
  try {
    let limit = req.query.limit;
    let offset = req.query.offset;

    let word = await WordService.findWordPaging(limit, offset);
    let totalPage = await WordService.countTotalPage();

    let dataReturn = {

      "items": word,
      "totalItems" : totalPage
    }
 

    return res.status(httpStatus.OK).send({
      status: apiStatus.SUCCESS,
      message: 'Get list word successfuly ',
      data: dataReturn,
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

/**
 * Get Process list vol for USER role
 * @param {Header: Authorization} req
 * @param {Object} res response API
 * @returns status API + message + page index process (600 word -> /10 topic. 60 word by topic)
 */
export const getDoneWord = async (req, res) => {
  try {
 
    let userId = req.userId; 
    let user = await UserService.findUserById(userId);

    // drop duplicate
    let currentProcess = Array.from(user.progressVocabulary);

    return res.status(httpStatus.OK).send({
      status: apiStatus.SUCCESS,
      message: 'get vol process successfully!',
      data: currentProcess,
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
      // message: err.message,
    });
  }
};

/**
 * mark a topic done
 * @param {Header: Authorization} req
 * @param {Object} res response API
 * @returns status API + message
 */
export const markDoneWord = async (req, res) => {
  try {
    // get info
    let userId = req.userId;
    let wordDone = req.query.wordId;
    let user = await UserService.findUserById(userId);

    // drop duplicate
    let currentProcess = Array.from(user.progressVocabulary); // user.progressVocabulary is object
    var setcurrentProcess = new Set(currentProcess);
    setcurrentProcess.add(wordDone);

    // update
    user.progressVocabulary = Array.from(setcurrentProcess);
    let userUpdate = await UserService.updateUser(user);

    // return
    return res.status(httpStatus.OK).send({
      status: apiStatus.SUCCESS,
      message: 'update vol process successfully!',
      data: userUpdate,
    });
  } catch (err) {
    console.log(err);

    if (err instanceof CustomError) {
      return res.status(err.httpStatus).send({
        status: err.apiStatus,
        message: err.message,
      });
    }

    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      status: apiStatus.OTHER_ERROR,
      // message: err.message,
    });
  }
};

/**
 * unmark a topic done
 * @param {Header: Authorization} req
 * @param {Object} res response API
 * @returns status API + message
 */
export const unMarkWord = async (req, res) => {
  try {
    let userId = req.userId;
    let wordDone = req.query.wordId;
    let user = await UserService.findUserById(userId);

    // drop duplicate
    let currentProcess = Array.from(user.progressVocabulary);
    var setcurrentProcess = new Set(currentProcess);
    setcurrentProcess.delete(wordDone);

    // update
    user.progressVocabulary = Array.from(setcurrentProcess);
    let userUpdate = await UserService.updateUser(user);

    return res.status(httpStatus.OK).send({
      status: apiStatus.SUCCESS,
      message: 'update vol process successfully!',
      data: userUpdate,
    });
  } catch (err) {
    console.log(err);

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
 


// ========== volcab 

export const getVolById = async (req, res) => {

  try {

    let volId = req.query.volId; 

    console.log(volId)
    let word = await WordService.findWordById(volId);

    return res.status(httpStatus.OK).send({
      status: apiStatus.SUCCESS,
      message: 'get word successfuly ',
      data: word,
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

export const putVolById = async (req, res) => {

  try {

    let volId = req.query.volId
    const volModel = req.body
    
 
    volModel.updatedAt= Date.now();
    let word = await WordService.updateWord(volId, volModel);

    return res.status(httpStatus.OK).send({
      status: apiStatus.SUCCESS,
      message:'update word successfuly ',
      data: word,
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

export const deleteVolById = async (req, res) => {

  try { 

    let volId = req.query.volId
    let word = await WordService.deleteWordById(volId);

    return res.status(httpStatus.OK).send({
      status: apiStatus.SUCCESS,
      message:'delete word successfuly ',
      data: word,
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


export const createVol = async (req, res) => {

  try {
 
    const volModel = new Word(
      req.body
    );

    volModel.createdAt= Date.now();
    volModel.updatedAt= Date.now();

    let word = await WordService.createWord(volModel);

    return res.status(httpStatus.OK).send({
      status: apiStatus.SUCCESS,
      message:'create word successfuly ',
      data: word,
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


export const getAllTopicWithProcess = async (req, res) => {
  try {

    let userId = req.userId;

    let offset=  parseInt(req.query.offset, 10) || 0
    let limit=  parseInt(req.query.limit, 10) || 10

    let topicProcessObj = await WordService.getAllTopicWithProcess(userId);

    let topicProcess = topicProcessObj.items
    let okTopic = topicProcessObj.topicDone

    let arrProcess =  Array.from(topicProcess)
    let length=  topicProcess.length 

    const begin = parseInt(limit*offset)
    const end = begin + limit 
    let returnProcess = arrProcess.slice(begin ,end)

    let dataReturn = {

      "items": returnProcess,
      "totalItems": length,
      "globalProcess": okTopic +"/"+ length
    }
 

    return res.status(httpStatus.OK).send({
      status: apiStatus.SUCCESS,
      message: 'Get topic process successfuly ',
      data: dataReturn,
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

export const getSpecialTopicWithProcess = async (req, res) => {
  try {

    let userId = req.userId;

    console.log("check user "+ userId)
    let topicId = req.query.idTopic

    let topicProcess = await WordService.getSpecialTopicWithProcess(userId,topicId);

    let dataReturn = topicProcess
    dataReturn.total = dataReturn.items.length
 
    return res.status(httpStatus.OK).send({
      status: apiStatus.SUCCESS,
      message: 'Get list word by topic successfuly ',
      data: dataReturn,
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
 
