import { useQuery } from '@apollo/client'
import { css } from '@emotion/react'
import React from 'react'
import { useParams } from 'react-router-dom'
import { ApolloEpisodeInterface } from '../../common/interfaces/Episode'
import { ONE_EPISODE } from '../../common/queries/queries'
import CharacterTileListing from '../components/CharacterTileListing'
import Loading from '../components/Loading'

const Episode = () => {

    const {id} = useParams<{id?: string}>()

    const {data, loading, error} = useQuery<ApolloEpisodeInterface>(ONE_EPISODE, {variables: {id}})

    if(loading) return <Loading />
    if(error) return <p>An error: {error} has occurred.</p>

    return (
        <section id={String(data.episode.id)}
            css={css`
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
                color: var(--text);
        `}>
            <div css={css`width: 70%`}>
                <article 
                    css={css`
                        display: flex; 
                        flex-direction: column; 
                        align-items: center;
                        margin-bottom: 3rem;
                    `}
                >
                    <p css={css`font-size: 2.8rem; text-align:center;`}>{data.episode.name}</p>
                    <p css={css`font-size: 2.1rem;`}>{data.episode.episode}</p>
                    <p css={css`font-size: 2.1rem;`}>{data.episode.air_date}</p>
                </article>

                <CharacterTileListing characters={data.episode.characters} />

            </div>
            
        </section>
    )
}

export default Episode