import axiosInstance from "../utils/axiosInstance"

export const createShortUrl = async (url,slug) =>{
    const {data} = await axiosInstance.post("/api/url/create",{url,slug})
    return data
}

export const deleteShortUrl = async (id) => {
    const { data } = await axiosInstance.delete(`/api/url/${id}`);
    return data;
};