import computeStats from '../service/computeStats.js';

export const statController = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        
        // 1. Added await and renamed to 'response' to avoid shadowing Express 'res'
        const response = await fetch(`${process.env.APPLICATION_URL}/api/applications/${userId}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        if (!response.ok) {
            return res.status(response.status).json({ msg: data.msg || "Fetch failed" });
        }
        
        const analytics = computeStats(data);
        return res.status(200).json(analytics);

    } catch (err) {
        console.error("Analytics Error:", err); // Helpful for debugging
        return res.status(500).json({ msg: "Analytics Failed" });
    }
};