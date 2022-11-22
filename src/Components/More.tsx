import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Showcase from './Showcase';

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
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button onClick={handleClickOpen} sx={{ color: '#000000' }}>
                View More
            </Button>
            <Dialog open={open} onClose={handleClose}>
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
