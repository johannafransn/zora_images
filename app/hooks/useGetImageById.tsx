import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import ApiService from "../ApiService";

export function useGetImageById() {
  const [image, setImage] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  let { id: imageId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const _image = await ApiService.getImageDataById(imageId as string);
        console.log(_image, "whats image?");
        setImage(_image);
      } catch (error) {
        //TODO handle error
        console.log(error, "Error fetching the image with id:" + imageId);
      }
      setLoading(false);
    };
    fetchData();
  }, [imageId]);

  return { loading, image };
}

export default useGetImageById;
