import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

export default function AddImage() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add a Memory
            </Button>
            {/* TODO: grab textfield data by ID and then populate a graphql mutation to send to database */}
            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="Title"
                        label="Title"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="Date"
                        type="date"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="Author"
                        label="Author"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="Descrip"
                        label="Description"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="Photo"
                        label="Photo"
                        type="file"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
