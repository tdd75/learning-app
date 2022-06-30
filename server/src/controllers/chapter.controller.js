import { httpStatus, apiStatus } from "../constants/index.js";
import CustomError from "../error/custom.error.js";
import ChapterService from "../service/chapter.service.js";
import UserService from "../service/user.service.js";

export const submitFinishChapter = async (req, res) => {
    try{
        let userId = req.userId;
        let type = req.body.type;
        let chapterId = req.body.chapterId;


        let chapter = await ChapterService.findChapterById(chapterId);

        let user = await UserService.findUserById(userId);

        if(type === 'SUBMIT'){
            if(user.progressGrammar.includes(chapterId)){
                return res.status(httpStatus.BAD_REQUEST).send({
                    status: apiStatus.INVALID_PARAM,
                    message: "This chapter has already been finished"
                });
            }else{
                user.progressGrammar.push(chapter._id);
            }
        }else if (type === 'UNSUBMIT'){
            if(!user.progressGrammar.includes(chapterId)){
                return res.status(httpStatus.BAD_REQUEST).send({
                    status: apiStatus.INVALID_PARAM,
                    message: "This chapter hasn't been finished"
                });
            }else{
                user.progressGrammar.splice(user.progressGrammar.indexOf(chapter._id), 1);
            }
        }else {
            return res.status(httpStatus.BAD_REQUEST).send({
                status: apiStatus.INVALID_PARAM,
                message: "Invalid request type! Only SUBMIT or UNSUBMIT"
            });
        }
        
        let updateUser = await UserService.updateUser(user);
        return res.status(httpStatus.OK).send({
            status: apiStatus.SUCCESS,
            message: "submit finish chapter successfully",
            data: updateUser
        });
    }catch(err){
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
}

export const getListChapterWithPagination = async (req, res) => {
    try{
        let size = req.query.limit;
        let page = req.query.offset;
        if(page <= 0 || size <= 0 ) {
            return res.status(httpStatus.BAD_REQUEST).send({
                status: apiStatus.INVALID_PARAM,
                message: "Limit and Offset must be greater than 0"
            });
        }
        let userId = req.userId;
        let user = await UserService.findUserById(userId);
        let chapterProgress = user.progressGrammar;

        const countFinishGrammarChapter = chapterProgress.length;
        const numberOfChapter = await ChapterService.countNumberChapter();

        let response = await ChapterService.getListChapter(page, size);
        let listChapter = response.items;
        response.items = [];
        for (let i = 0; i< listChapter.length; i++){
            let chapterId = listChapter[i]._id;
            let chapterObject = listChapter[i].toObject();
            if(chapterProgress.includes(chapterId)){
                chapterObject.status = 1;
            }else{
                chapterObject.status = 0;
            }
            response.items.push(chapterObject);
        }
        response.globalProcess = `${countFinishGrammarChapter}/${numberOfChapter}`
        
        return res.status(httpStatus.OK).send({
            status: apiStatus.SUCCESS,
            message: "get list chapter successfully",
            data: response
        });
    }catch(err){
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
}