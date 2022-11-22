/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { gql, useMutation } from '@apollo/client';

// ADD_IMAGE mutation to create a new image
const ADD_IMAGE = gql`
    mutation Mutation($createImageInput: CreateImageInput!) {
        createImage(createImageInput: $createImageInput) {
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

export default function AddImage() {
    // control component display
    const [open, setOpen] = React.useState(false);

    // states to store user inputted data
    const [title, setTitle] = React.useState('');
    const [date, setDate] = React.useState('');
    const [author, setAuthor] = React.useState('');
    const [description, setDescrip] = React.useState('');
    const [file, setFile] = React.useState('');

    // state to hold promise returned by mutation
    const [createImage] = useMutation(ADD_IMAGE, {
        refetchQueries: ['images'],
    });

    // function to send mutation using apollo-client and refetch image query
    const sendData = () => {
        if (title && date && author && description && file) {
            createImage({
                variables: {
                    createImageInput: {
                        author: author,
                        date: date,
                        description: description,
                        file: file,
                        title: title,
                    },
                },
                refetchQueries: () => [
                    {
                        query: GET_IMAGES,
                    },
                ],
            });
        }
        // Reset user input states to empty
        setTitle('');
        setDate('');
        setAuthor('');
        setDescrip('');
        setFile('');
    };

    // Function to get image file and call convertBase64 helper
    const handleFileRead = async (event: any) => {
        const file = event.target.files[0];
        console.log(typeof file);
        const base64 = await convertBase64(file);
        console.log(base64);
        setFile(base64 as string);
    };

    // Function to convert inputted img file into Base64 String
    const convertBase64 = (file: any) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result?.toString() || '');
            };
            fileReader.onerror = (error) => {
                reject(error);
                console.log(error);
            };
        });
    };

    return (
        <div>
            {/* Open popup component */}
            <Button
                variant="outlined"
                onClick={() => {
                    setOpen(true);
                }}
                sx={{
                    color: '#ffffff',
                    borderColor: '#7f5539',
                    '&:hover': {
                        borderColor: '#7f5539',
                        backgroundColor: '#7f5539',
                    },
                }}
            >
                Add a Memory
            </Button>
            <Dialog
                open={open}
                onClose={() => {
                    setOpen(false);
                }}
            >
                {/* Get user inputted information */}
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        label="Title"
                        type="text"
                        fullWidth
                        value={title}
                        // Capture user inputted information as soon as field changes
                        onChange={(event) => {
                            setTitle(event.target.value);
                        }}
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        type="date"
                        fullWidth
                        value={date}
                        onChange={(event) => {
                            setDate(event.target.value);
                        }}
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        label="Author"
                        type="text"
                        fullWidth
                        value={author}
                        onChange={(event) => {
                            setAuthor(event.target.value);
                        }}
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        label="Description"
                        type="text"
                        fullWidth
                        value={description}
                        onChange={(event) => {
                            setDescrip(event.target.value);
                        }}
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        label="Photo"
                        type="file"
                        fullWidth
                        onChange={(e) => handleFileRead(e)}
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    {/* Close component window */}
                    <Button
                        onClick={() => {
                            setOpen(false);
                        }}
                    >
                        Cancel
                    </Button>
                    {/* Submit component window */}
                    <Button
                        onClick={() => {
                            setOpen(false);
                            sendData();
                        }}
                    >
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
