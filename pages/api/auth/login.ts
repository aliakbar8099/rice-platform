
import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from "bcryptjs"
const jwt = require("jsonwebtoken");
import clientPromise from 'lib/mongodb';

interface IBody {
    userId: string | undefined,
    phoneNumber: string,
    password: string,
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const client = await clientPromise;
        const db = client.db("rice-platform");
        let user = db.collection("users");
        let { phoneNumber, password }: IBody = req.body;
        switch (req.method) {
            case "POST":
                if (!phoneNumber) {
                    return res.status(400).send({ msg: "شماره موبایل وارد نشده است" })
                }
                if (!(/^(\+98|0)?9\d{9}$/.test(phoneNumber === "0" ? phoneNumber.substring(1,) : phoneNumber))) {
                    return res.status(400).send({ msg: "شماره موبایل را درست وارد کنید" })
                }
                if (!password) {
                    return res.status(400).send({ msg: "پسورد را وارد کنید" })
                }

                let findUser: any = await user.findOne({ phoneNumber });

                if(!findUser){
                    return res.status(404).send({msg:"چنین شماره ثبت نشده است"})
                }

                const isMatch = await bcrypt.compareSync(password, findUser.password);

                if (!isMatch) {
                    return res.status(401).send({ msg: "اطلاعات اشتباه وارد شده است" })
                }

                const payload = {
                    user: {
                        userId: findUser.userId,
                        isSeller: findUser.isSeller
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