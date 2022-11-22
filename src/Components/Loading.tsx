import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import * as React from 'react';

const Loading = () => {
    return (
        <div className="container">
            <h1 id="load">Loading Photobook...</h1>

            <Box sx={{ width: '40%', margin: 'auto' }}>
                <LinearProgress />
            </Box>
        </div>
    );
};

export default Loading;
