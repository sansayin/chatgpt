import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline"
import { TrashIcon } from "@heroicons/react/24/solid";
import { collection, query,orderBy, deleteDoc,doc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Link from 'next/link'
import Router, { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useEffect, useState } from 'react'
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "~/firebase";
type Props = {
    id: string;
}
function ChatRow({ id }: Props) {
    const pathname = usePathname();
    const { data: session } = useSession();
    const [active, setActive] = useState(false)
    const router = useRouter()
    const [messages] = useCollection(query(
        collection(db, 'users', session?.user?.email!, 'chats', id, 'messages'),
        orderBy('createdAt', 'asc')
    ))

    useEffect(() => {
      if(!pathname) return;
      setActive(pathname.includes(id))
    }, [pathname]);

    const removeChat = async()=>{
        await deleteDoc(doc(db, 'users', session?.user?.email!, 'chats', id))
        router.replace("/");
    }

    return (
        <Link href={`/chat/${id}`} className={`chatRow justify-center border`}>
            <ChatBubbleLeftIcon className="flex-shrink-0 h-5 w-5" />
            <p className="grow hidden md:inline-flex truncate justify-center">
                {messages?.docs[messages.docs.length-1]?.data().text || "开始对话"}
            </p>
            <TrashIcon onClick={removeChat} className="flex-shrink-0 h-5 w-5 text-gray-700 hover:text-red-700" />
        </Link>
    )
}

export default ChatRow