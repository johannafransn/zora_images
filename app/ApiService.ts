import axios from "axios";
import { buildUrl } from "@/helpers";
import { TColor } from "./types/types";

const clientId = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
const ApiService = {


    getImagesData: async function (pageNumber: number, searchText: string, color: TColor, sortBy: string) {
        const baseUrl = 'https://api.unsplash.com/search/photos';
        const requiredParams = ['query'];
        const url = buildUrl(baseUrl, {
            page: pageNumber,
            query: searchText,
            color: color,
            order_by: sortBy,
            client_id: clientId
        }, requiredParams);

        try {
            const response = await axios.get(url);
            return response.data.results
        } catch (error) {
            console.error('Failed to fetch images:', error);
            throw error;
        }
    },

    getImageDataById: async function (id: string) {
        const baseUrl = 'https://api.unsplash.com/photos';
        try {
            const response = await axios.get(`${baseUrl}/${id}?client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`);
            return response.data
        } catch (error) {
            console.error('Failed to fetch images:', error);
            throw error;
        }
    },



}
export default ApiService;
