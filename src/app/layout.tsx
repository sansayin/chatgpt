import "../styles/globals.css";
import Sidebar from "../components/Sidebar";
import SessionProvider from "../components/SessionProvider";
import { getServerSession } from "next-auth";
import Login from "~/components/Login";
import ClientProvider from "~/components/ClientProvider";
export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()
  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          {!session?(
            <Login/>
          ):(
          <div className="flex">
            <div className=" bg-[#202123] max-w-xs h-screen overflow-y-auto md:min-w-[20rem]">
              <Sidebar />
            </div>
            <ClientProvider/>
            {/* ClientProvider - Notification */}
            <div className="bg-[#343541] flex-1">{children}</div>
          </div>
          )}
        </SessionProvider>
      </body>
    </html>
  )
}
