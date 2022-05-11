import { Router } from 'express';
import { tokenService } from '../services/tokenServices.js';

const router = Router();
const tokenSer = new tokenService()

router.get('/login', async(req, res) => {
    const token = await tokenSer.getToken();

    return res.status(200).json(token);
});

export default router;