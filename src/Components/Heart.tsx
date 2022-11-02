import * as React from 'react';
import Badge from '@mui/material/Badge';
import FavoriteIcon from '@mui/icons-material/Favorite';

export interface HeartProps {
    countLike: number;
}

const Heart: React.FC<HeartProps> = ({ countLike = 0 }: HeartProps) => {
    const [count, setCount] = React.useState(countLike);
    const [active, setActive] = React.useState(true);

    const handleBadgeNum = () => {
        setActive(!active);
        if (active == true) {
            // do POST operation to increase amount of likes stored
            setCount(count + 1);
        } else {
            // do POST operation to decrease amount of likes stored
            setCount(count - 1);
        }
    };

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
