'use client'

import { Session } from "next-auth";
import { SessionProvider as Provider } from "next-auth/react";
import React from "react";

function SessionProvider({
    children, session
}: {
    children: React.ReactNode;
    session: Session | null;
}) {
    return (
        <Provider>{children}</Provider>
    )
}

export default SessionProvider