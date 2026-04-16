import type { GiphyResponse } from "../interfaces/giphy.response"
import type { Gif } from "../interfaces/gif.interfaces"
import { giphyApi } from "./api/giphy.api"

export const getGiphsByQuery = async (query: string): Promise<Gif[]> => {
    const resp = await giphyApi.get<GiphyResponse>(
        '/search',
        {
            params: {
                q: query,
                limit: 10,
            }
        }
    )


    return resp.data.data.map((gif) => ({
        id: gif.id,
        title: gif.title,
        url: gif.images.original.url,
        width: Number(gif.images.original.width),
        height: Number(gif.images.original.height)
    }))
}