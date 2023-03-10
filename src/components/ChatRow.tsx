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
        <Link href={`/chat/${id}`} className={`chatRow justify-center`}>
            <div className="flex flex-row">
            <ChatBubbleLeftIcon className="flex-1 h-5 w-5" />
            <p className="flex=2 hidden md:inline-flex truncate">
                {messages?.docs[messages.docs.length-1]?.data().text || "New Chat"}
            </p>
            <TrashIcon onClick={removeChat} className="flex-3 h-5 w-5 text-gray-700 hover:text-red-700" />
            </div>
        </Link>
    )
}

export default ChatRow