import Grid from "../components/Grid";
import React from "react";
export default function Home() {
  return (
    <div className="lg:mt-20 lg:mx-20 lg:p-12 bg-white mt-4 mx-4 p-8 mb-4 lg:mb-24 rounded">
      <div>
        <div className="flex flex-row">
          <h2 className="font-normal text-3xl sm:text-4xl text-black">
            Browse & Explore
          </h2>
        </div>

        <p className="">
          Browse and explore your favorite images from Unsplash.<br></br>Click
          on a image to learn more.
        </p>
        <a
          href="https://github.com/johannafransn/zora_images"
          target="_blank"
          className="text-xs font-bold"
        >
          Made by Johanna{" "}
        </a>
      </div>
      <Grid />
    </div>
  );
}
