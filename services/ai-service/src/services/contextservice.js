export const getUserContext = async(userId, token) => {
    try {
        const[userRes, analyticsRes] = await Promise.all([
            fetch(`${process.env.USER_SERVICE_URL}/api/user/getUser`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }),
            fetch(`${process.env.GATEWAY_URL}/api/analytics/stats`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        ]);
        if (!userRes.ok) {
            const text = await userRes.text();
            throw new Error(`User service error ${userRes.status}: ${text}`);
        }
        if (!analyticsRes.ok) {
            const text = await analyticsRes.text();
            throw new Error(`Analytics service error ${analyticsRes.status}: ${text}`);
        }

        const [user, analytics] = await Promise.all([userRes.json(), analyticsRes.json()]);
        return { user, analytics };
    } catch (err) {
        throw new Error(err.message);
    }
}