'use client'
import { signIn, signOut } from "next-auth/react"
import { FormEventHandler, useState } from "react";
import { FaDiscord, FaGoogle } from "react-icons/fa"
function LoginForm() {
  const [userInfo, setUserInfo] = useState({ email: "aaa@bbb.com", password: "ccccccc", password1: "" });
  const [regist, setRegist] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    if (regist) {
      if (userInfo.password != userInfo.password1) {
        setMessage("Password Not Match!")
      }
      alert("TBD") 
    } else {
      await signIn("credentials", {
        email: userInfo.email,
        password: userInfo.password,
        callbackUrl: "/"
      })
    }
  }
  return (
    <div className="bg-[#11A37F] flex flex-col items-center h-screen justify-center">
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-[#434654] rounded-md shadow-md lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-white">
            二手GPT
          </h1>
          <form className="mt-6" onSubmit={handleSubmit}>
            <div className="mb-2">
              <p
                className="block text-sm font-semibold text-white"
              >
                电邮
              </p>
              <input
                type="email" value={userInfo.email} onChange={({ target }) =>
                  setUserInfo({ ...userInfo, email: target.value })
                }
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <p
                className="block text-sm font-semibold text-white"
              >
                密码
              </p>
              <input value={userInfo.password}
                onChange={({ target }) =>
                  setUserInfo({ ...userInfo, password: target.value })
                }
                type="password"
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            {regist && (
              <div className="mb-2">
                <p
                  className="block text-sm font-semibold text-white"
                >
                  确认密码
                </p>
                <input value={userInfo.password1}
                  onChange={({ target }) =>
                    setUserInfo({ ...userInfo, password1: target.value })
                  }
                  type="password"
                  className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
            )}

            <a
              href="#"
              className="text-xs text-white hover:underline"
            >
              {!regist &&
                <> 忘记密码?</>
              }
            </a>
            <div className="mt-6 flex justify-center">
              <button
                type="submit"
                className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed">
                {regist ? (
                  <>注册</>
                ) : (
                  <> 登陆</>
                )}
              </button>
            </div>
          </form>
          {!regist &&
            <p className="mt-8 text-xs font-light text-center text-white">
              {" "}
              还没有账号?{" "}
              <a
                href="#" onClick={() => { setRegist(true) }}
                className="font-medium text-white hover:underline"
              >
                注册
              </a>
            </p>
          }
          <p className="mt-8 text-xs font-light text-center text-red-500">
            {message}</p>
          <div className="flex flex-row text-center justify-center text-white">
            <FaDiscord onClick={() => { signIn("discord", { callbackUrl: "/" }) }} />
            &nbsp;
            <FaGoogle onClick={() => { signIn("google", { callbackUrl: "/" }) }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm 
