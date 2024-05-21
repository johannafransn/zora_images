import { Grid } from "@/components";

export default function Home() {
  return (
    <div className="lg:mt-20 lg:mx-20 lg:p-12 bg-white mt-4 mx-4 p-8 mb-4 lg:mb-24 rounded">
      <div>
        <h2 className="font-normal text-3xl sm:text-4xl text-black">
          Browse & Explore
        </h2>
        <p className="">
          Browse and explore your favorite images from Unsplash.<br></br>Click
          on a image to learn more.
        </p>
      </div>
      <Grid />
    </div>
  );
}
