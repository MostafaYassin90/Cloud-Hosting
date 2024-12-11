"use client";
import Lottie from 'lottie-react';
import notfound_animation from "../fedback/lottieFiles/notfound.json";

function NotFoundPage() {
  return (
    <div className="bg-gray-200">
      <div className="fix-height max-w-screen-xl mx-auto flex  flex-col items-center justify-center">
        <Lottie animationData={notfound_animation} className="w-[600px]" />
        <h2 className="!text-bold text-3xl text-red-900">404 Page Not Found!</h2>
      </div>
    </div>
  )
}
export default NotFoundPage;