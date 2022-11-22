import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Showcase from './Showcase';

// Props for DeletePopup
export interface DeleteProps {
    title: string;
    author: string;
    date: string;
    description: string;
    image: string;
}

const DeletePopup: React.FC<DeleteProps> = ({
    title = '',
    author = '',
    date = '',
    description = '',
    image = '',
}: DeleteProps) => {
    // State to control display of component
    const [open, setOpen] = React.useState(false);

    return (
        <div>
            {/* View More button to show component */}
            <Button
                onClick={() => setOpen(true)}
                sx={{ color: '#000000' }}
                data-testid="view"
            >
                View More
            </Button>
            {/* Render out all inputted data to the component */}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <Showcase
                    title={title}
                    author={author}
                    date={date}
                    description={description}
                    image={image}
                />
            </Dialog>
        </div>
    );
};

export default DeletePopup;
