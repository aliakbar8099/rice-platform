import { NextApiResponse } from "next"

export function response(status: number, res: NextApiResponse, text = undefined, data: [] | undefined) {
    const messages: any = {
        200: 'موفقیت آمیز بود',
        400: 'درخواست نامعتبر',
        401: 'غیرمجاز',
        403: 'ممنوع‌شده',
        404: 'پیدا نشد',
        500: 'خطای داخلی سرور',
        503: 'سرویس در دسترس نیست'
    };
    return res.status(status).json({ msg: { statusMsg: messages[status], text }, statusCode: status, data });
}