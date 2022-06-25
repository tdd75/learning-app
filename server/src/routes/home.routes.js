import express from 'express'; 

const homeRouter = express.Router();

homeRouter.get('/api/v1/home', (req, res)=>{
    res.send('Hello World!');
});


export default homeRouter;
