import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Link } from '@mui/material';

export interface ShowcaseProps {
    title: string;
    author: string;
    date: string;
    description: string;
    image: string;
}

const Showcase: React.FC<ShowcaseProps> = ({
    title = '',
    author = '',
    date = '',
    description = '',
    image = '',
}: ShowcaseProps) => {
    return (
        <div style={{ padding: 20 }}>
            <img
                style={{ margin: 'auto', display: 'block' }}
                src={`${image}?&auto=format`}
                srcSet={`${image}?w=400&fit=crop&auto=format&dpr=2 2x`}
                alt={title}
                loading="lazy"
            />

            <Typography style={{ wordWrap: 'break-word', textAlign: 'left' }}>
                <h2>{title}</h2>
                By: {author} <br />
                Date: {date} <br />
                Description: {description} <br />
                <Link href={image} underline="none">
                    {'Full resolution'}
                </Link>
            </Typography>
        </div>
    );
};

export default Showcase;
