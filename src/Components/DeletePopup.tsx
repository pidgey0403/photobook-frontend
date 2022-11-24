import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { gql, useMutation } from '@apollo/client';
import {} from 'dotenv/config';

// DELETE_IMAGE mutation to delete a specified Image
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

// GET_IMAGES query to fetch a list of all images
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

// Props interface for DeletePopup component
export interface DelProps {
    photoID: number;
}

const DeletePopup: React.FC<DelProps> = ({ photoID }: DelProps) => {
    const [open, setOpen] = React.useState(false); // control display of component
    const [passwordError, setPassErr] = React.useState(false); // password validation state

    // state to hold promise returned by DELETE_IMAGE mutation + refetch list of images
    const [deleteImage] = useMutation(DELETE_IMAGE, {
        refetchQueries: ['images'],
    });

    // Open component
    const handleClickOpen = () => {
        setOpen(true);
    };

    // Close component and prompt user
    const handleClose = (genre: string) => {
        // get user input for password key
        const userInput = (
            document.getElementById('passKey') as HTMLInputElement
        ).value;
        // If we select cancel button always close component
        if (genre === 'Cancel') setOpen(false);
        // display error prompt if password key was incorrect
        else if (userInput !== process.env.REACT_APP_PASSWORD) {
            setPassErr(true);
        } else {
            // Password was valid
            setOpen(false);
            // Call delete image mutation and refetch list of images
            deleteImage({
                variables: {
                    id: photoID,
                },
                refetchQueries: () => [
                    {
                        query: GET_IMAGES,
                    },
                ],
            });
            setTimeout(() => {
                setPassErr(false);
            }, 1000);
        }
    };

    return (
        <div>
            <Button onClick={handleClickOpen} sx={{ color: '#000000' }}>
                Delete
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <DialogContentText>
                        {passwordError
                            ? `The provided password was incorrect, please try again.`
                            : `To delete this image, please enter the secure key given to you.`}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="passKey"
                        label="Admin key"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        sx={{ color: '#000000' }}
                        onClick={() => handleClose('Cancel')}
                    >
                        Cancel
                    </Button>
                    <Button
                        sx={{ color: '#000000' }}
                        onClick={() => handleClose('Delete')}
                    >
                        Confirm Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DeletePopup;
