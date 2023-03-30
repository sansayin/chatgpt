import type { NextApiRequest, NextApiResponse } from "next"
import queryAi from "../../lib/queryApi"
import admin from "firebase-admin"
import { adminDb } from "~/firebase-admin";

type Data = {
    answer: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { prompt, chatId, model, session } = req.body;
    console.log(req.body)
    if (!prompt) {
        res.status(400).json({ answer: "Prompt is empty" }) 
        return;
    }
    if (!chatId) {
        res.status(400).json({ answer: "ChatId is empty" })
        return;
    }
    const response:any = await queryAi(prompt, chatId, model)
    const message: Message = {
        text: response || "ChatGPT was unable to find answer for that!",
        createdAt: admin.firestore.Timestamp.now(),
        user: {
            _id: "ChatGPT",
            name: "ChatGPT",
            avatar: ""
        },
    };
    await adminDb
        .collection("users")
        .doc(session.user.email)
        .collection("chats")
        .doc(chatId)
        .collection("messages")
        .add(message);

    res.status(200).json({ answer: message.text });
}
