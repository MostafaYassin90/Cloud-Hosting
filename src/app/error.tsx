"use client";
import Lottie from "lottie-react";
import notFound from "../fedback/lottieFiles/notfound.json"
import Link from "next/link";

type TProps = {
  error: {
    message: string
  };
  rest: () => void;
}

function ErrorPage(props: TProps) {
  const errorMessage = props.error.message;

  return (
    <div className="flex items-center justify-center flex-col fix-height">
      <Lottie animationData={notFound} className="max-w-[600px]" />
      <h2 className="mt-5 text-3xl text-red-900 font-bold">{errorMessage}</h2>
      <div className="flex w-full items-center justify-center gap-3">
        <button className="block w-30 p-3 text-bold text-white bg-blue-700 hover:bg-blue-900 rounded-full"
          onClick={() => { props.rest() }}>Rest</button>
        <Link href="/" className="w-30 rounded-full bg-teal-700 hover:bg-teal-900 p-3 text-white text-semibold">Go To Home</Link>
      </div>
    </div>
  )
}
export default ErrorPage;