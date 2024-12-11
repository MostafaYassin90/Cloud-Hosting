import { TiTick } from "react-icons/ti";
import "./WebPlan.css";

type TProps = {
  title: string;
  text: string;
  discount: number;
  saved: number;
  price: number
}

function WebPlan(props: TProps) {
  const { title, text, discount, saved, price } = props;
  return (
    <div className="plan p-3 rounded-md bg-gray-200 w:3/4 md:2/4 sm:1/4 text-center">
      <h2 className="title font-bold text-3xl text-gray-950 mb-5">{title}</h2>
      <p className="text-gray-500 text-sm mb-5">{text}</p>
      <p className="dicount mb-5">
        <s className="text-dark font-bold me-2">${discount}</s>
        <strong className="bg-gray-400 p-1 rounded-full border">SAVED {saved}%</strong>
      </p>
      <p className="price mb-5 text-3xl text-gray-900 font-bold">${price}</p>
      <p className="free mb-5 text-blue-900 font-bold text-xl">+3 Month Free</p>
      <button className="free block bg-blue-900 rounded-md text-white font-bold mx-auto py-2 px-3">Add To Cart</button>
      <span className="block w-full h-[1px] my-3 bg-gray-400" />
      <h3 className="font-semibold text-xl text-left mb-5">Top Features</h3>
      {/* Fatures */}
      <div className="features flex-col items-start">
        <div className="feat flex items-center justify-start gap-1 mb-2">
          <TiTick className="text-xl text-green-800" />
          <p>Standad Performance</p>
        </div>
        <div className="feat flex items-center justify-start gap-1 mb-2">
          <TiTick className="text-xl text-green-800" />
          <p>Standad Performance</p>
        </div>
        <div className="feat flex items-center justify-start gap-1 mb-2">
          <TiTick className="text-xl text-green-800" />
          <p>Standad Performance</p>
        </div>
        <div className="feat flex items-center justify-start gap-1 mb-2">
          <TiTick className="text-xl text-green-800" />
          <p>Standad Performance</p>
        </div>
        <div className="feat flex items-center justify-start gap-1 mb-2">
          <TiTick className="text-xl text-green-800" />
          <p>Standad Performance</p>
        </div>
      </div>
    </div>
  )
}
export default WebPlan;