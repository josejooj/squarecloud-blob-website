import { NextApiRequest, NextApiResponse } from 'next'
import { default_errors } from './default_errors';

function get_error(code: keyof typeof default_errors) {

    const error = default_errors[code];

    return { code: code, message: error }

}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method !== 'POST') return res.status(405).json(get_error(5))

    try {

        const { authorization } = req.headers;
        const response = await fetch('https://api.squarecloud.app/v2/user', {
            headers: { Authorization: authorization! }
        })

        if (response.status === 401) return res.status(403).json(get_error(1000));
        if (response.status === 429) return res.status(429).json(get_error(1));
        if (response.status === 403) return res.status(403).json(get_error(3));
        if (response.status === 524) return res.status(524).json(get_error(4));
        if (response.status !== 200) return res.status(500).json(get_error(0));

        res.status(200).json({ success: true })

    } catch (error) {
        // Prevent in case of Square Cloud API Offline
        res.status(503).json(get_error(2))
    }
}