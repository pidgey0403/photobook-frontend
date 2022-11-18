/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_IMAGES = gql`
    query Images {
        images {
            author
            date
            description
            file
            id
            likes
            title
        }
    }
`;

function Example() {
    const { loading, error, data } = useQuery(GET_IMAGES);
    if (loading) return <p>Loading...</p>;
    if (error) return console.log(JSON.stringify(error, null, 2));
    return data.images.map(
        ({ id, author, description, date, file, likes, title }: any) => (
            <div key={id}>
                <p>
                    {author}
                    {description}
                    {date}
                    {file}
                    {likes}
                    {title}
                </p>
            </div>
        ),
    );
}

export default Example;
