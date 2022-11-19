import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { gql, useMutation } from '@apollo/client';

// Define mutation to delete a specified Image
const DELETE_IMAGE = gql`
    mutation RemoveImage($id: Int!) {
        removeImage(id: $id) {
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

export interface DelProps {
    photoID: number;
}

const DeletePopup: React.FC<DelProps> = ({ photoID }: DelProps) => {
    const [open, setOpen] = React.useState(false);
    const [err, setErr] = React.useState(false);
    const [deleteImage, { data, loading, error }] = useMutation(DELETE_IMAGE);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (genre: string) => {
        const userInput = (document.getElementById('name') as HTMLInputElement)
            .value;
        if (genre === 'Cancel') setOpen(false);
        else if (userInput !== process.env.PASSWORD) {
            setErr(true);
        } else {
            // Password was valid
            setOpen(false);
            deleteImage({
                variables: {
                    id: photoID,
                },
            });
            setTimeout(() => {
                setErr(false);
            }, 1000);
        }
    };

    if (loading) console.log('Submitting...');
    if (error) console.log(`Submission error! ${error.message}`);

    return (
        <div>
            <Button onClick={handleClickOpen}>Delete</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <DialogContentText>
                        {err
                            ? `The provided password was incorrect, please try again.`
                            : `To delete this image, please enter the secure key given to you.`}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Admin key"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose('Cancel')}>
                        Cancel
                    </Button>
                    <Button onClick={() => handleClose('Delete')}>
                        Confirm Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DeletePopup;
