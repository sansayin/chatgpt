'use client'
import { PlusIcon } from '@heroicons/react/24/solid'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '~/firebase';

function NewChat() {
    const router = useRouter()
    const { data: session } = useSession()
    const creatNewChat = async () => {
        if (session) {
            const doc = await addDoc(
                collection(db, "users", session?.user?.email!, 'chats'),
                {
                    messages: [],
                    userId: session?.user?.email,
                    createAt: serverTimestamp()
                }
            );
            router.push(`/chat/${doc.id}`)
        }else{
            
        }
    };
    return (
        <div onClick={creatNewChat} className='border-gray-700 border chatRow'>
            <PlusIcon className='h-4 w-4' />
            <p>新的对话</p>
        </div>
    );
}

export default NewChat
