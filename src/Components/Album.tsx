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
import Heart from './Heart';
import { useQuery, gql } from '@apollo/client';
import Loading from './Loading';

// Generate MUI theme
const theme = createTheme({
    palette: {
        mode: 'light',
    },
});

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

export default function Album() {
    // run the GET_IMAGES query and set the results into a state
    const { loading, error, data } = useQuery(GET_IMAGES);
    // state for holding all retrived images
    const [imageDict, setImageDict] = React.useState({ images: [] });

    React.useEffect(() => {
        // If query successfully completed
        if (loading === false && data) {
            setImageDict(data);
        }
    }, [loading, data]);

    if (error) console.log(`Error! ${error.message}`);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {/* Include a loading screen if the API is fetching data */}
            {loading ? (
                <Loading />
            ) : (
                <main
                    style={{
                        backgroundColor: '#9c6644',
                        paddingBottom: '10%',
                    }}
                >
                    <Box
                        sx={{
                            pt: 8,
                            pb: 6,
                        }}
                    >
                        <Container maxWidth="sm">
                            <Typography
                                component="h1"
                                variant="h2"
                                align="center"
                                fontWeight="bold"
                                color="#eef4ed"
                                gutterBottom
                            >
                                Photobook 2022 📸
                            </Typography>
                            <Typography
                                variant="h5"
                                align="center"
                                color="#eef4ed"
                                paragraph
                            >
                                A collection of your most memorable moments from
                                2022.
                            </Typography>
                            <Stack
                                direction="row"
                                spacing={2}
                                justifyContent="center"
                            >
                                <AddImage />
                            </Stack>
                        </Container>
                    </Box>
                    <Container maxWidth="md">
                        <Grid container spacing={4}>
                            {/* Map over the array of images returned from query and populate each Card with the fetched fields */}
                            {imageDict.images.map(
                                (card: {
                                    author: string;
                                    date: string;
                                    description: string;
                                    file: string;
                                    id: number;
                                    likes: number;
                                    title: string;
                                }) => (
                                    <Grid
                                        item
                                        key={card.id}
                                        xs={12}
                                        sm={6}
                                        md={4}
                                    >
                                        <Card
                                            sx={{
                                                height: '100%',
                                                width: '100%',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                bgcolor: '#ffffff',
                                                padding: '2%',
                                            }}
                                        >
                                            <CardMedia
                                                component="img"
                                                image={card.file}
                                                alt={card.title}
                                            />
                                            <CardContent
                                                sx={{
                                                    flexGrow: 1,
                                                }}
                                            >
                                                <Typography
                                                    variant="h5"
                                                    component="h2"
                                                    color="#7f5539"
                                                >
                                                    {`"${card.title}"`}
                                                    <br />
                                                </Typography>
                                                <Typography
                                                    variant="h6"
                                                    component="h2"
                                                >
                                                    {card.date}
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <More
                                                    title={card.title}
                                                    author={card.author}
                                                    date={card.date}
                                                    description={
                                                        card.description
                                                    }
                                                    image={card.file}
                                                />

                                                <DeletePopup
                                                    photoID={card.id}
                                                />
                                                <Heart
                                                    countLike={card.likes}
                                                    photoID={card.id}
                                                />
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ),
                            )}
                        </Grid>
                    </Container>
                </main>
            )}
        </ThemeProvider>
    );
}
