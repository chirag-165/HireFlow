import {getUserContext} from '../services/contextservice.js';
import {askGemini} from '../services/geminiservice.js';
import { buildPrompt } from '../services/promptbuilder.js';

export const generateResponse = async(req, res) => {
    try {
        const {message} = req.body;
        const userId = req.headers['x-user-id'];
        const authHeader = req.headers.authorization || '';
        const token = authHeader.split(' ')[1] || null;

        // console.log('AI Controller - incoming request:', {
        //     path: req.path,
        //     body: req.body,
        //     userId,
        // });

        if (!process.env.GOOGLE_API_KEY) {
        console.error('Missing GOOGLE_API_KEY in environment for AI service. Set GOOGLE_API_KEY in .env or your environment.');
        process.exit(1);
}

        if (!token) {
            console.error('AI Controller - missing token');
            return res.status(401).json({ error: 'Missing authorization token' });
        }
        const { user, analytics } = await getUserContext(userId, token);;
        const prompt = buildPrompt(user, analytics, message);
        const aiResponse = await askGemini(prompt);
        res.json({ response: aiResponse });
    } catch (err) {
        console.error('AI Controller error:', err);
        res.status(500).json({ error: err.message });
    }
}