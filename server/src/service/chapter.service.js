import { httpStatus, apiStatus } from "../constants/index.js";
import CustomError from "../error/custom.error.js";
import {Chapter} from "../models/index.js";

const ChapterService = {};

ChapterService.findChapterById = async (chapterId) => {
    let chapter = await Chapter.findById(chapterId);
    if(!chapter){
        throw new CustomError(
            httpStatus.INTERNAL_SERVER_ERROR,
            apiStatus.DATABASE_ERROR,
            `Did not find chapter with id: ${chapterId}`
        );
    }
    return chapter;
}

ChapterService.getListChapter = async (page, size) => {
    const limit = size ? size : 10;
    const offset = page ? (page - 1) * limit : 1;
    let condition = {sort: {'name': 1}}

    let response = await Chapter.paginate(condition, {offset, limit}).then((data) => {
        return {
            totalItems: data.totalDocs,
            items: data.docs,
            totalPages: data.totalPages,
            currentPage: parseInt(page ? page : offset)
        }
    });
    return response;

}

ChapterService.countNumberChapter = async () => {
    let count = await Chapter.countDocuments();
    return count;
}
export default ChapterService;