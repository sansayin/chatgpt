import type { NextApiRequest, NextApiResponse } from "next"
import { db } from "~/firebase";
import { collection, query, orderBy } from 'firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const { email,pass } = req.body;
    

    res.status(200).json({ modelOptions   });
}
