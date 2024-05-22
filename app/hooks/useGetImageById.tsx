import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import ApiService from "../ApiService";

export function useGetImageById() {
  const [image, setImage] = useState<any | null>(null); //TODO add image type from API response
  const [loading, setLoading] = useState<boolean>(false);
  let { id: imageId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const _image = await ApiService.getImageDataById(imageId as string);
        setImage(_image);
      } catch (error) {
        //TODO handle error properly
        console.log(error, "Error fetching the image with id:" + imageId);
      }
      setLoading(false);
    };
    fetchData();
  }, [imageId]);

  return { loading, image };
}

export default useGetImageById;
