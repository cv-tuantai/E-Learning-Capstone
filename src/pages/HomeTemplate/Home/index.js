import React from "react";
import Carousel from "./Carousel";
import About from "./About";
import Counter from "./Counter";
import Courses from "./Courses";
import Trainers from "./Trainers";

export default function Home() {
  return (
    <div>
      <Carousel />
      <About />
      <Counter />
      <Courses />
      <Trainers />
    </div>
  );
}
