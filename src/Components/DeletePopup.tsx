import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { gql, useMutation, useQuery } from '@apollo/client';

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

// Write out the query using apollo-client
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

export interface DelProps {
    photoID: number;
}

const DeletePopup: React.FC<DelProps> = ({ photoID }: DelProps) => {
    const [open, setOpen] = React.useState(false);
    const [err, setErr] = React.useState(false);
    const { data } = useQuery(GET_IMAGES);
    const [deleteImage] = useMutation(DELETE_IMAGE, {
        refetchQueries: ['images'],
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (genre: string) => {
        const userInput = (document.getElementById('name') as HTMLInputElement)
            .value;
        if (genre === 'Cancel') setOpen(false);
        else if (userInput !== process.env.REACT_APP_PASSWORD) {
            setErr(true);
        } else {
            // Password was valid
            setOpen(false);
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
                setErr(false);
            }, 1000);
        }
    };

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
