import { DocumentData } from "firebase/firestore";
type Props = {
    message: DocumentData
}

function Message({ message }: Props) {
    const isChatGPT = message.user.name === "ChatGPT"
    const avatar = message.user.avatar || "/ChatGPT_logo.svg"
    return (
        <div className={`py-5 text-white ${isChatGPT && "bg-[#434654]"}`}>
            <div className="flex space-x-5  max-w-2xl mx-4">
                    <img src={avatar} className="h-8 w-8"></img>
                    <p className="flex-1 pt-1 text-sm">{message.text}</p>
            </div>
        </div>

    )

}
export default Message