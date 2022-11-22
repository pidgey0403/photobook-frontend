import * as React from 'react';
import Badge from '@mui/material/Badge';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { gql, useMutation } from '@apollo/client';

// Props for Heart component
export interface HeartProps {
    countLike: number;
    photoID: number;
}

// INCREMENT_LIKES mutation to update a single Image
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
    // state to track number of likes an image has
    const [count, setCount] = React.useState(countLike);
    // state to toggle the like count of an image
    const [active, setActive] = React.useState(true);
    // state to hold promise returned by INCREMENT_LIKES mutation
    const [increaseLikes, { error, reset }] = useMutation(INCREMENT_LIKES);

    // function to toggle likes a photo receives by 1 or -1
    const handleBadgeNum = () => {
        setActive(!active);
        if (active == true) {
            setCount(count + 1);
            // call the INCREMENT_LIKES mutation and pass in image ID and likes
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

    if (error) console.log(`Submission error! ${error.message}`);

    return (
        <Badge
            color="primary"
            badgeContent={count}
            data-testid="count"
            onClick={() => handleBadgeNum()}
        >
            <FavoriteIcon
                sx={{
                    color: '#ad0202',
                    '&:hover': { color: '#8b0000' },
                }}
            />
        </Badge>
    );
};

export default Heart;
