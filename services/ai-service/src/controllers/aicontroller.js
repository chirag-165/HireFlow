import {getUserContext} from '../services/contextservice.js';
import {askGemini} from '../services/geminiservice.js';
import { buildPrompt } from '../services/promptbuilder.js';

export const generateResponse = async(req, res) => {
    try {
        const {message} = req.body;
        const userId = req.headers['x-user-id'];
        const authHeader = req.headers.authorization || '';
        const token = authHeader.split(' ')[1] || null;

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