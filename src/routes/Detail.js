import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Movie from '../components/Movie'

const GET_MOVIE = gql`
    query getMovie($id: Int!) {
        movie(id: $id) {
            id
            title
            rating
            medium_cover_image
            language
            description_intro
            isLiked @client
        },
        suggestions(id: $id) {
            id
            medium_cover_image
        }
    }
`;

const Container = styled.div`
    height: 100vh;
    background-image: linear-gradient(-45deg, #d754ab, #fd723a);
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Main = styled.div`
    height: 70%;
    width: 80%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: white;
`

const Column = styled.div`
    margin-left: 10px;
    width: 50%;
`;

const Title = styled.h1`
    font-size: 65px;
    margin-bottom: 15px;
`;

const Subtitle = styled.h4`
    font-size: 35px;
    margin-bottom: 10px;
    color: white;
`;

const Description = styled.p`
    font-size: 28px;
`;

const Poster = styled.div`
    width: 20%;
    background-color: transparent;
    height: 60%;
    background-image: url(${props => props.bg});
    background-position: center center;
    background-size: cover;
`;

const Suggestions = styled.div`
    height: 25%;
    width: 55%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 120px;
    margin-top: 15px;
`



const Detail = () => {
    const { id } = useParams()
    const { loading, data } = useQuery(GET_MOVIE, {
        variables: { id: parseInt(id) }
    })
    console.log(loading, data)
    return(
        <Container>
            <Main>
                <Column>
                    <Title>{loading ? "Loading..." : `${data.movie.title} ${data.movie.isLiked ? '💖' : '😢'}`}</Title>
                    {!loading && (
                        <>
                            <Subtitle>{data?.movie?.language} | {data?.movie?.rating}</Subtitle>
                            <Description>{data?.movie?.description_intro}</Description>
                        </>
                    )}
                </Column>
                {!loading && <Poster bg={data?.movie?.medium_cover_image } />}
            </Main>
            {!loading && <Subtitle>Suggestions</Subtitle>}
            <Suggestions>
                {!loading && data?.suggestions?.map(m => <Movie suggestions={true} id={m.id} key={m.id} bg={m.medium_cover_image} />)}
            </Suggestions>
        </Container>
    )
}

export default Detail;