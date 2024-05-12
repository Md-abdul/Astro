import axios from "axios";
import { Astrologer } from "../redux/astrologersSlice"; //http://localhost:4000/api/astrologers
const baseURL = "https://astro-backend-p4ss.onrender.com/api/astrologers"; //https://astro-backend-p4ss.onrender.com/

export const fetchAstrologers = async () => {
  const response = await axios.get(baseURL);
  return response.data;
};

export const postAstrologer = async (astrologerData: Partial<Astrologer>) => {
  const response = await axios.post(`${baseURL}/register`, astrologerData);
  return response.data;
};

export const editAstrologer = async (
  id: string,
  astrologerData: Partial<Astrologer>
) => {
  const response = await axios.put(`${baseURL}/${id}`, astrologerData);
  return response.data;
};
