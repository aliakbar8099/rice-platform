import clientPromise from 'lib/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next'
const jwt = require('jsonwebtoken');
import { numberToSmerinke, smerinkeToNumber } from 'utils/helpers';
import rateLimit from 'utils/rate-limit';

const axios = require('axios');
const { response } = require('middleware/response')

const limiter = rateLimit({
    interval: 3600 * 1000, // 3600 seconds = 1 hours
    uniqueTokenPerInterval: 500, // Max 500 users per second
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let { phone, code }: { phone: string, code: string, password: string } = req.body;
    const secretKey = 'your-256-bit-secret';

    let randomNum = Math.floor(Math.random() * 9000) + 1000;

    const payload = {
        code: numberToSmerinke(randomNum),
    };

    const client = await clientPromise;
    const db = client.db("rice-platform");
    let user = db.collection("users");

    if (req.method === "POST") {
        try {
            await limiter.check(res, 5, 'CACHE_TOKEN') // 10 requests per minute
            if (req.query.token) {
                try {

                    if (!code) {
                        return response(400, res, "کد تایید وارد نشده")
                    }

                    const decodedToken = jwt.verify(req.query.token, secretKey);

                    if (code === JSON.stringify(smerinkeToNumber(decodedToken.code))) {
                        return response(200, res, "کد تاییداست")
                    } else {
                        return response(401, res, "کد درست نیست")
                    }

                } catch (err) {
                    console.error(err);
                    response(401, res, "کد نا معتبر است")
                }
            } else {
                if (!phone) {
                    response(400, res, "شماره موبایل وارد نشده")
                }
                if (await user.findOne({
                    phoneNumber: !/^(\+98)/.test(phone) ? "+98" + (phone[0] === "0" ? phone.substring(1,) : phone) : phone
                })) {
                    response(200, res, "با این شماره قبلا ثبت نام کرده اید", { isExist: true })
                } else {
                    const token = jwt.sign(payload, secretKey, { expiresIn: 60 * 10 });

                    const options: any = {
                        method: 'POST',
                        url: 'http://rest.ippanel.com/v1/messages/patterns/send',
                        headers: {
                            Authorization: 'AccessKey  ryCRighv3VcdytZU4AkhJXG9bhf9V9HTjL-QiVVW7CU=',
                            'Content-Type': 'application/json'
                        },
                        data: {
                            pattern_code: 't5kyo1t4y41cxr3',
                            originator: '+985000125475',
                            recipient: '+98' + (phone[0] === "0" ? phone.substring(1) : phone),
                            values: { 'verification-code': JSON.stringify(randomNum) }
                        }
                    };
                    axios.request(options).then(function (_: any) {
                        response(200, res, "پیامک با کد ارسال شد", { isExist: false, token })
                    }).catch(function (error: Error) {
                        console.error(error);
                    });
                }

            }
        } catch {
            res.status(429).json({ error: 'Rate limit exceeded' })
        }


    }
}