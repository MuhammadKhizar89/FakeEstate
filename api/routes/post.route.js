import express from 'express';
const router = express.Router();
router.get('/test', (res, req) => {
    console.log("routerWorks");
});

export default router;