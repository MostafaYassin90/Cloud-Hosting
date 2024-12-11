"use client";
import Image from "next/image";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { sliderData } from "@/util/data/heroData";
import "./SliderSection.css";


function SliderSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Handle Right Arrow
  function handleRightArrow() {
    if (currentSlide === 2) {
      return;
    } else {
      setCurrentSlide((prev) => prev + 1)
    }
  }

  // Handle Left Arrow
  function handleLeftArrow() {
    if (currentSlide === 0) {
      return;
    } else {
      setCurrentSlide((prev) => prev - 1)
    }
  }

  // Show Slide
  const showSliderData = sliderData.map((slide, index) => (
    <div className={`slide ${currentSlide === index ? "active" : ""}`} key={slide.id}>
      <div className="slide-info">
        <h2 className="title">{slide.title}</h2>
        <h3 className="description">{slide.description}</h3>
      </div>
      <div className="slide-img">
        <Image src={slide.image} alt={slide.title} priority={true} />
      </div>
    </div>
  ))
  // Show Bulconsts 
  const bulconsts = sliderData.map((_, index) => (
    <li className={currentSlide === index ? "active" : ""} key={index}></li>
  ))

  return (
    <div className="slider">

      <div className={`arrow-right ${currentSlide === 2 ? "off" : ""}`}
        onClick={handleRightArrow}><IoIosArrowForward /></div>

      <div className={`arrow-left ${currentSlide === 0 ? "off" : ""}`}
        onClick={handleLeftArrow}>
        <IoIosArrowBack /></div>

      {showSliderData}
      {/* Bulconsts */}
      <ul className="bulconsts">
        {bulconsts}
      </ul>
    </div>
  )
}
export default SliderSection;