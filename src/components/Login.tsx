'use client'
import { signIn, signOut } from "next-auth/react"


function LoginForm() {
    const onSubmit = (e) => {
        e.preventDefault();
        fetch("/api/user/login", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ description: "123" })
        });
    }
    return (
        <div className="bg-[#11A37F] flex flex-col items-center h-screen justify-center">
            <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
                <div className="w-full p-6 m-auto bg-[#434654] rounded-md shadow-md lg:max-w-xl">
                    <h1 className="text-3xl font-semibold text-center text-white">
                        二手GPT
                    </h1>
                    <form className="mt-6" onSubmit={onSubmit}>
                        <div className="mb-2">
                            <p
                                className="block text-sm font-semibold text-white"
                            >
                                电邮
                            </p>
                            <input
                                type="email"
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>
                        <div className="mb-2">
                            <p
                                className="block text-sm font-semibold text-white"
                            >
                                密码
                            </p>
                            <input
                                type="password"
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>
                        <a
                            href="#"
                            className="text-xs text-white hover:underline"
                        >
                            忘记密码?
                        </a>
                        <div className="mt-6 flex justify-center">
                            <button
                                onClick={() => signIn()}
                                className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed">
                                登陆
                            </button>
                            {/* <button
                                type="submit"
                                className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed">
                                登陆
                            </button> */}
                        </div>
                    </form>


                    <p className="mt-8 text-xs font-light text-center text-white">
                        {" "}
                        还没有账号?{" "}
                        <a
                            href="#"
                            className="font-medium text-white hover:underline"
                        >
                            注册
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginForm 
