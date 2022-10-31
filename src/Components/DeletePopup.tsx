import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

export default function DeletePopup() {
    const [open, setOpen] = React.useState(false);
    const [error, setErr] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (genre: string) => {
        const userInput = (document.getElementById('name') as HTMLInputElement)
            .value;
        if (genre === 'Cancel') setOpen(false);
        else if (userInput !== '123p') {
            //TODO: add password encryption + verification
            setErr(true);
        } else {
            //correct password
            setOpen(false);
            //TODO: add graphql mutation to delete image from db + re-render application
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
                        {error
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
}
