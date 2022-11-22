/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { gql, useMutation } from '@apollo/client';

// Write out the query using apollo-client
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

export default function AddImage() {
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

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
        setTitle('');
        setDate('');
        setAuthor('');
        setDescrip('');
        setFile('');
    };

    // Process the inputted file and convert it to Base64 string
    const handleFileRead = async (event: any) => {
        const file = event.target.files[0];
        console.log(typeof file);
        const base64 = await convertBase64(file);
        console.log(base64);
        setFile(base64 as string);
    };

    // Convert the inputted file into Base64 String
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
            <Button
                variant="outlined"
                onClick={handleClickOpen}
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
            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        label="Title"
                        type="text"
                        fullWidth
                        value={title}
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
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        onClick={() => {
                            handleClose();
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
