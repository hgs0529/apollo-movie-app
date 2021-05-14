import React from 'react';
import { useQuery, gql } from '@apollo/client';
import styled from "styled-components";
import Movie from '../components/Movie';

const GET_MOVIES = gql`
    {
    movies {
        id
        medium_cover_image
        }
    }
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const Header = styled.div`
    background: linear-gradient(-45deg, #d754ab, #fd723a);
    height: 45vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    color: white;
`

const Title = styled.h1`
  font-size: 60px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const Subtitle = styled.h3`
  font-size: 35px;
`;

const Loading = styled.div`
  font-size: 18px;
  opacity: 0.5;
  font-weight: 500;
  margin-top: 10px;
`;

const Movies = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 25px;
    width: 60%;
    position: relative;
    top: -50px;
`;

const Home = () => {
    const { loading, data } = useQuery(GET_MOVIES);
    console.log( loading, data)
    return (
        <Container>
            <Header>
                <Title>Apollo EDEN</Title>
                <Subtitle>I love graphql</Subtitle>
            </Header>
            {loading && <Loading>Loading...</Loading>}
            {!loading && data.movies && (
            <Movies>
                {data.movies.map(m => (
                    <Movie key={m.id} id={m.id} bg={m.medium_cover_image} />
                ))}
            </Movies>
            )}
        </Container>
    );
};


export default Home;