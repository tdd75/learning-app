import { httpStatus, apiStatus } from '../constants/index.js';
import CustomError from '../error/custom.error.js';

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

/**
 * Get All Vocabulary (has paging)
 * @param {Object} res response API
 * @returns status API + message + data(url clouddarry)
 */
export const upload = async (req, res) => {
  try {
    console.log('Got file:', req.file);
    console.log('Extra form fields:', req.body);

    cloudinary.uploader
      .upload_stream({ resource_type: 'image', folder: 'new-upload' }, cloudinaryDone)
      .end(req.file.buffer);

    // eslint-disable-next-line no-inner-declarations
    function cloudinaryDone(error, result) {
      if (error) {
        console.log('Error in cloudinary.uploader.upload_stream\n', error);
        res.json({
          mess: 'upload err',
          data: error,
        });
      } else {
        console.log('Cloudinary url', result);
        res.json({ cdn_url: result.url });
      }
    }
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
