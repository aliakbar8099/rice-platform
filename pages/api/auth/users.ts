
import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcryptjs"
const jwt = require("jsonwebtoken");
import clientPromise from 'lib/mongodb';
import axios from 'axios';

interface IBody {
    userId: string | undefined,
    phoneNumber: string,
    password: string,
    email: string | undefined | null,
    firstname: string | undefined | null,
    lastname: string | undefined | null,
    nativeCode?: string | undefined | null,
    city: string | undefined | null,
    address: string | undefined | null,
    profile_img: string | undefined | null,
    isSeller: 0 | 1
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const client = await clientPromise;
        const db = client.db("rice-platform");
        let user = db.collection("users");
        let { phoneNumber, password, firstname, lastname, nativeCode, city, address, isSeller = 0 }: IBody = req.body;
        switch (req.method) {
            case "POST":
                if (!phoneNumber) {
                    return res.status(400).send({ msg: "شماره موبایل وارد نشده است" })
                }
                if (!(/^(\+98|0)?9\d{9}$/.test(phoneNumber === "0" ? phoneNumber.substring(1,) : phoneNumber))) {
                    return res.status(400).send({ msg: "شماره موبایل را درست وارد کنید" })
                }
                if (await user.findOne({ phoneNumber })) {
                    return res.status(400).send({ msg: "شماره موبایل قبلا ثبت شده" })
                }
                if (isSeller && await user.findOne({ nativeCode })) {
                    return res.status(400).send({ msg: "کد ملی قبلا در سیستم ثبت شده" })
                }
                // if (!password) {
                //     return res.status(400).send({ msg: "پسورد را وارد کنید" })
                // }
                // if (password.length < 4) {
                //     return res.status(400).send({ msg: "رمز عبور باید حداقل چهار رقم باشد" })
                // }
                if (!firstname || !lastname) {
                    return res.status(400).send({ msg: "هیچ پارامتری نباید خالی بمونه" })
                }
                const salt = await bcrypt.genSalt(10);
                password = !/^(\+98)/.test(phoneNumber) ? "+98" + (phoneNumber[0] === "0" ? phoneNumber.substring(1,) : phoneNumber).substring(3,) : phoneNumber.substring(3,) + "abc" + new Date().getTime().toString().substring(9,)

                const options: any = {
                    method: 'POST',
                    url: 'http://rest.ippanel.com/v1/messages/patterns/send',
                    headers: {
                        Authorization: 'AccessKey  ryCRighv3VcdytZU4AkhJXG9bhf9V9HTjL-QiVVW7CU=',
                        'Content-Type': 'application/json'
                    },
                    data: {
                        pattern_code: 'lphs2x14biqij7f',
                        originator: '+985000125475',
                        recipient: !/^(\+98)/.test(phoneNumber) ? "+98" + (phoneNumber[0] === "0" ? phoneNumber.substring(1,) : phoneNumber) : phoneNumber,
                        values: { 'password': JSON.stringify(password) }
                    }
                };

                axios.request(options).then().catch(function (error: Error) {
                    return res.status(500).send(error)
                });

                password = await bcrypt.hash(password, salt);
                const userId = uuidv4();

                let data: IBody = {
                    userId,
                    phoneNumber: phoneNumber,
                    password,
                    firstname,
                    lastname,
                    nativeCode: !isSeller ? null : nativeCode,
                    city,
                    address,
                    email: null,
                    profile_img: null,
                    isSeller
                }

                user.insertOne(data);

                const payload = {
                    user: {
                        userId,
                        isSeller
                    }
                };

                jwt.sign(
                    payload,
                    "randomString",
                    {
                        expiresIn: 3600 * 24
                    },
                    (err: Error, token: string) => {
                        if (err) throw err;
                        res.status(200).json({ token })
                    }
                );
                break;

        }
    } catch (error) {
        res.status(500).send({ error })
        console.log(error);
    }
}