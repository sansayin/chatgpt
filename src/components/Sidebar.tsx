'use client';
import { signOut, useSession } from 'next-auth/react';
import React from 'react'
import NewChat from './NewChat'
import { useCollection } from "react-firebase-hooks/firestore"
import { collection, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase'
import ChatRow from './ChatRow';
import ModelSelection from './ModelSelection';

function Sidebar() {
    const { data: session } = useSession();
    const [chats, loading, error] = useCollection(
        session && query(collection(db, 'users', session?.user?.email!, "chats"), orderBy('createAt', 'asc'))
    )
    console.log(chats?.docs)
    return (
        <div className="p-2 flex flex-col h-screen">
            <div className="flex-1">
                <>
                    <NewChat />
                    <div className='hidden sm:inline'>
                        <ModelSelection/>
                    </div>
                    <div className='flex flex-col space-y-2 my-2'>
                    {loading && (
                        <div className='animate-pulse text-center text-white'>
                            <p>加载对话...</p>
                        </div>
                    )}
                    
                    {chats?.docs.map((chat) => { 
                       return <ChatRow key={chat.id} id={chat.id} />
                    })}
                    </div>
                </>
            </div>
            {session && (
                <img onClick={() => signOut()}
                    src={session?.user?.image!}
                    alt=""
                    className="h-12 w-12 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50"
                />
            )}
        </div>
    )
}

export default Sidebar