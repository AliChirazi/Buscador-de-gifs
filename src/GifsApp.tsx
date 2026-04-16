
import { CustomHeader } from './shared/components/CustomHeader';
import { SearchBar } from './shared/components/SearchBar';
import { PreviousSearches } from './gifs/PreviousSearches';
import { GifList } from './gifs/GifList';
import { useState } from 'react';
import { getGiphsByQuery } from './gifs/actions/get-gifs-by-query-.actions';
import type { Gif } from './gifs/interfaces/gif.interfaces';


export const GifsApp = () => {
    const [gifs, setGifs] = useState<Gif[]>([])

    const [previousTerms, setPreviousTerms] = useState<string[]>([])

    const handleTermClicked = (term: string) => {
        console.log({ term })

    }
    const handleSearch = async (query: string) => {

        query = query.trim().toLowerCase()
        if (query.length === 0) return
        if (previousTerms.includes(query)) return
        setPreviousTerms([query, ...previousTerms].splice(0, 8))
        const gifs = await getGiphsByQuery(query)
        setGifs(gifs)
        console.log(gifs)

    }

    return (
        <>
            {/* header */}
            <CustomHeader title='Buscador de gifs' description='Descubre y comparte el gif perfecto' />
            {/* search */}
            <SearchBar placeholder='busca por ejemplo "saitama"' onQuery={handleSearch} />
            {/*busquedas previas*/}
            <PreviousSearches searches={previousTerms} onLabelClicked={handleTermClicked} />
            {/*Gifs*/}
            <GifList gifs={gifs} />

        </>
    )
}
