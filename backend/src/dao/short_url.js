import urlSchema from "../models/short_url.model.js";
import { ConflictError } from "../utils/errorHandler.js";

export const saveShortUrl = async (shortUrl, longUrl, userId) => {
    try{
        const newUrl = new urlSchema({
            full_url:longUrl,
            short_url:shortUrl
        })
        if(userId){
            newUrl.user = userId
        }
        await newUrl.save()
    }catch(err){
        if(err.code == 11000){
            throw new ConflictError("Short URL already exists")
        }
        throw new Error(err)
    }
};

export const getShortUrl = async (shortUrl) => {
    return await urlSchema.findOneAndUpdate({short_url:shortUrl},{$inc:{clicks:1}});
}

export const getCustomShortUrl = async (slug) => {
    return await urlSchema.findOne({short_url:slug});
}

export const getUserUrls = async (userId) => {
    return await urlSchema.find({ user: userId }).sort({ createdAt: -1 });
};

export const deleteShortUrl = async (id, userId) => {
    const result = await urlSchema.findOneAndDelete({ _id: id, user: userId });
    if (!result) {
        throw new Error("URL not found or you don't have permission to delete it.");
    }
    return result;
};