"use client";
import useGetImageById from "@/app/hooks/useGetImageById";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ImageDetail() {
  const { image, loading } = useGetImageById();
  const router = useRouter();

  console.log(image, "whats img?");
  return (
    <div className="lg:mt-20 lg:mx-20 lg:p-12 bg-white mt-4 mx-4 p-8 mb-4 lg:mb-24 rounded">
      <div className="flex-1 sm:flex-auto w-full sm:w-auto">
        <button
          onClick={() => router.back()}
          className="mb-3 w-full sm:w-auto block  rounded-sm bg-activeButton py-3 px-4 font-medium text-white shadow hover:bg-activeButton disabled:cursor-not-allowed"
        >
          Go back
        </button>
      </div>
      {image && !loading ? (
        <div className="flex flex-row">
          <Image
            className="img-responsive rounded-lg"
            width={200}
            height={200}
            src={image.urls.regular}
            alt="SDK Logo"
          />
          <div className="flex flex-col ml-3">
            <h2 className="font-normal text-3xl sm:text-4xl text-black">
              {image.alt_description}
            </h2>
            <p className="font-bold">{image.description}</p>
            <p className="mt-3">Created: {image.created_at}</p>
          </div>
        </div>
      ) : (
        <div>Loading image data...</div>
      )}
    </div>
  );
}
