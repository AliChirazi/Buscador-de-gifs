import { CustomHeader } from './shared/components/CustomHeader';
import { SearchBar } from './shared/components/SearchBar';
import { PreviousSearches } from './gifs/PreviousSearches';
import { GifList } from './gifs/GifList';
import { useState } from 'react';
import { getGiphsByQuery } from './gifs/actions/get-gifs-by-query-.actions';
import type { Gif } from './gifs/interfaces/gif.interfaces';

const gifsCache: Record<string, Gif[]> = {}

export const GifsApp = () => {
    const [gifs, setGifs] = useState<Gif[]>([])

    const [previousTerms, setPreviousTerms] = useState<string[]>(() => {
        const storedTerms = localStorage.getItem('previousTerms')
        return storedTerms ? JSON.parse(storedTerms) : []
    })

    const handleTermClicked = async (term: string) => {
        if (gifsCache[term]) {
            setGifs(gifsCache[term])
            return
        }

        const gifs = await getGiphsByQuery(term)
        setGifs(gifs)
        gifsCache[term] = gifs
    }

    const handleSearch = async (query: string) => {
        query = query.trim().toLowerCase()

        if (query.length === 0) return
        if (previousTerms.includes(query)) return

        const updatedTerms = [query, ...previousTerms].slice(0, 8)
        setPreviousTerms(updatedTerms)
        localStorage.setItem('previousTerms', JSON.stringify(updatedTerms))

        const gifs = await getGiphsByQuery(query)
        setGifs(gifs)
        gifsCache[query] = gifs

        console.log(gifs)
    }

    return (
        <>
            <CustomHeader
                title='Buscador de gifs'
                description='Descubre y comparte el gif perfecto'
            />

            <SearchBar
                placeholder='busca por ejemplo "saitama"'
                onQuery={handleSearch}
            />

            <PreviousSearches
                searches={previousTerms}
                onLabelClicked={handleTermClicked}
            />

            <GifList gifs={gifs} />
        </>
    )
}