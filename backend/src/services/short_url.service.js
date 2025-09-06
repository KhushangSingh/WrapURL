import { generateNanoId } from "../utils/helper.js"
import urlSchema from "../models/short_url.model.js"
import { getCustomShortUrl, saveShortUrl, getUserUrls as getUserUrlsFromDao } from "../dao/short_url.js"

export const createShortUrlWithoutUser = async (url) => {
    const shortUrl = generateNanoId(7)
    if(!shortUrl) throw new Error("Short URL not generated")
    await saveShortUrl(shortUrl,url)
    return shortUrl
}

export const createShortUrlWithUser = async (url,userId,slug=null) => {
    if (slug) {
        const existingUrl = await getCustomShortUrl(slug);
        if (existingUrl) {
            if (existingUrl.user && existingUrl.user.toString() === userId.toString()) {
                // URL with this slug already exists for this user
                return {
                    shortUrl: existingUrl.short_url,
                    alreadyExists: true,
                    message: "You have already created a short URL with this slug."
                };
            } else {
                // Slug is taken by someone else
                throw new Error("This custom URL is already taken.");
            }
        }
    }

    const shortUrl = slug || generateNanoId(7)
    await saveShortUrl(shortUrl,url,userId)
    return { shortUrl };
}

export const getUserUrls = async (userId) => {
    const urls = await getUserUrlsFromDao(userId);
    return urls;
};