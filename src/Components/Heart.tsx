import * as React from 'react';
import Badge from '@mui/material/Badge';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { gql, useMutation } from '@apollo/client';

export interface HeartProps {
    countLike: number;
    photoID: number;
}

// Define mutation to update a single Image
const INCREMENT_LIKES = gql`
    mutation IncrementCounter($updateImageInput: UpdateImageInput!) {
        updateImage(updateImageInput: $updateImageInput) {
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

const Heart: React.FC<HeartProps> = ({ countLike, photoID }: HeartProps) => {
    const [count, setCount] = React.useState(countLike);
    const [active, setActive] = React.useState(true);
    const [increaseLikes, { data, loading, error, reset }] =
        useMutation(INCREMENT_LIKES);

    const handleBadgeNum = () => {
        setActive(!active);
        if (active == true) {
            setCount(count + 1);
            // call the mutation and pass in appropriate Image data
            increaseLikes({
                variables: {
                    updateImageInput: { id: photoID, likes: count + 1 },
                },
            });
        } else {
            setCount(count - 1);
            reset(); // reset mutations cache
            increaseLikes({
                // decrement value of likes by 1
                variables: {
                    updateImageInput: { id: photoID, likes: count - 1 },
                },
            });
        }
    };

    if (loading) console.log('Submitting...');
    if (error) console.log(`Submission error! ${error.message}`);

    return (
        <div>
            <Badge
                color="primary"
                badgeContent={count}
                onClick={() => handleBadgeNum()}
            >
                <FavoriteIcon sx={{ color: '#8b0000' }} />
            </Badge>
        </div>
    );
};

export default Heart;
