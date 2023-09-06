import React from "react";
import Carousel from "./Carousel";
import About from "./About";
import Counter from "./Counter";
import Courses from "./Courses";

export default function Home() {
  return (
    <div>
      <Carousel />
      <About />
      <Counter />
      <Courses />
    </div>
  );
}
