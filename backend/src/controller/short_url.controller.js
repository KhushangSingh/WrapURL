import { getShortUrl, getUserUrls as getUserUrlsFromDb, deleteShortUrl as deleteShortUrlFromDb } from "../dao/short_url.js"
import { createShortUrlWithoutUser, createShortUrlWithUser} from "../services/short_url.service.js"
import wrapAsync from "../utils/tryCatchWrapper.js"

export const createShortUrl = wrapAsync(async (req,res)=>{
    const data = req.body
    const baseUrl = process.env.APP_URL;
    if(req.user){
        const result = await createShortUrlWithUser(data.url,req.user._id,data.slug)
        if (result.alreadyExists) {
            return res.status(200).json({
                ...result,
                shortUrl: baseUrl + result.shortUrl,
            });
        }
        return res.status(200).json({ shortUrl : baseUrl + result.shortUrl})
    }else{  
        const shortUrl = await createShortUrlWithoutUser(data.url)
        return res.status(200).json({shortUrl : baseUrl + shortUrl})
    }
})

export const getUserUrls = wrapAsync(async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "User not authenticated" });
    }
    const urls = await getUserUrlsFromDb(req.user._id);
    res.status(200).json({ urls: urls || [] });
});

export const deleteShortUrl = wrapAsync(async (req, res) => {
    const { id } = req.params;
    if (!req.user) {
        return res.status(401).json({ message: "User not authenticated" });
    }
    await deleteShortUrlFromDb(id, req.user._id);
    res.status(200).json({ message: "URL deleted successfully" });
});


export const redirectFromShortUrl = wrapAsync(async (req,res)=>{
    const {id} = req.params
    const url = await getShortUrl(id)
    if(!url) throw new Error("Short URL not found")
    res.redirect(url.full_url)
})

export const createCustomShortUrl = wrapAsync(async (req,res)=>{
    const {url,slug} = req.body
    const shortUrl = await createShortUrlWithoutUser(url,customUrl)
    res.status(200).json({shortUrl : process.env.APP_URL + shortUrl})
})