"use client";

import { ArrowDownCircleIcon } from '@heroicons/react/24/solid';
import { collection, query, orderBy } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { db } from '~/firebase'
import Message from './Message';
import { useEffect, useRef } from 'react';
type Props = {
  chatId: string
}
export default function Chat({ chatId }: Props) {
  const bottom = useRef<null | HTMLDivElement>(null)
  const { data: session } = useSession()
  const [messages] = useCollection(session && query(
    collection(
      db,
      "users",
      session?.user?.email!,
      "chats",
      chatId,
      "messages"),
    orderBy("createdAt", "asc")
  ))
  useEffect(() => {
    if (messages && bottom.current) {
      bottom.current.scrollIntoView({
        behavior: "smooth",
      })
    }
  }, [messages])
  return (
    <div className='flex-1 overflow-y-auto overflow-x-hidden'>
      {messages?.empty && (
        <>
          <p className='mt-10 text-center text-white'>请在下面输入您的问题～</p>
          <ArrowDownCircleIcon className='h-10 w-10 mx-auto mt-5 text-white animate-bounce'></ArrowDownCircleIcon>
        </>
      )}
      {messages?.docs.map((message) => (
        <Message key={message?.id} message={message?.data()} />
      ))}
      <div ref={bottom} />
    </div>
  )
}
