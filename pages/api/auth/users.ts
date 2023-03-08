// import clientPromise from 'lib/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next'

// interface IBody {
//     main: {
//         phoneNumber: string | null,
//         password?: string | null,
//         verificationCode: string | null,
//     },
//     default: {
//         firsName: string | null,
//         lastName: string | null,
//         nativeCode: string | null,
//         adderess: string | null,
//         city: string | null,
//         persenImg: string | null,
//         email: string | null,
//         timeCreateAccount: string
//     }
// }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // const client = await clientPromise;
    // const db = client.db("rice-platform");
    // const users = await db.collection("users");

    // let defaultData : IBody{} = {
    //     firsName: null,
    //     lastName: null,
    //     nativeCode: null,
    //     adderess: null,
    //     city: null,
    //     persenImg: null,
    //     email: null,
    //     timeCreateAccount: new Date().toISOString()
    // }

    // let { }: IBody = req.body

    // switch (req.method) {
    //     case "POST":

    //         break;

    //     default:
    //         break;
    // }
}