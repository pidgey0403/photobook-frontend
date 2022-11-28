import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Button, Link } from '@mui/material';

// Props for Showcase component
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
        // Formatting individual Image information passed down from More component
        <div style={{ padding: 20 }}>
            <img
                style={{
                    margin: 'auto',
                    display: 'block',
                    maxWidth: '70%',
                }}
                src={`${image}`}
                srcSet={`${image}`}
                alt={title}
                loading="lazy"
                data-testid="img"
            />

            <Typography style={{ wordWrap: 'break-word', textAlign: 'left' }}>
                <h2 data-testid="title">{title}</h2>
                <div data-testid="author">
                    By: {author} <br />
                </div>
                <div data-testid="date">
                    Date: {date} <br />
                </div>
                <div data-testid="descrip">
                    Description: {description} <br />
                </div>
                <a
                    onClick={() => {
                        const iframe =
                            "<iframe width='100%' style='border:none;' height='100%' src='" +
                            image +
                            "'==></iframe>";
                        const x = window.open();
                        x?.document.open();
                        x?.document.write(iframe);
                        x?.document.close();
                    }}
                >
                    Full Resolution
                </a>
            </Typography>
        </div>
    );
};

export default Showcase;
