import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DeletePopup from './DeletePopup';
import AddImage from './AddImage';
import More from './More';
import myJson from '../Temporary Data/database.json';
import Heart from './Heart';

//TODO: populate with GraphQL query

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default function Album() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <main>
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            Photobook 2022 📸
                        </Typography>
                        <Typography
                            variant="h5"
                            align="center"
                            color="text.secondary"
                            paragraph
                        >
                            A collection of your most memorable moments from
                            2022.
                        </Typography>
                        <Stack
                            sx={{ pt: 4 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                            <AddImage />
                        </Stack>
                    </Container>
                </Box>
                <Container sx={{ py: 8 }} maxWidth="md">
                    <Grid container spacing={4}>
                        {myJson.photos.map((card: any) => (
                            <Grid item key={card.photoID} xs={12} sm={6} md={4}>
                                <Card
                                    sx={{
                                        height: '100%',
                                        width: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        image={card.image}
                                        alt={card.title}
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography variant="h5" component="h2">
                                            {card.title}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        {/* TODO: click on it will show the full details: image + descrip */}
                                        <More
                                            title={card.title}
                                            author={card.author}
                                            date={card.date}
                                            description={card.description}
                                            image={card.image}
                                        />

                                        {/* TODO: add delete mutation ONLY if password is correct*/}
                                        <DeletePopup />
                                        <Heart countLike={card.count} />
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
        </ThemeProvider>
    );
}
