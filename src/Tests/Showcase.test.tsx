import { render, screen } from '@testing-library/react';
//DONE
import React from 'react';
import Showcase from '../Components/Showcase';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// render the entire component
test('renders Showcase component test', () => {
    const client = new ApolloClient({
        uri: 'https://photobook-be.herokuapp.com/graphql',
        cache: new InMemoryCache(),
    });

    render(
        <ApolloProvider client={client}>
            {/* need to check if expected input matches the returned output from IDs */}

            <Showcase
                title={''}
                author={''}
                date={''}
                description={''}
                image={''}
            />
        </ApolloProvider>,
    );
});

// render the entire component and verifies props
test('renders Showcase and verifies passed in props', () => {
    const client = new ApolloClient({
        uri: 'https://photobook-be.herokuapp.com/graphql',
        cache: new InMemoryCache(),
    });

    render(
        <ApolloProvider client={client}>
            <Showcase
                title={'Title'}
                author={'Author'}
                date={'Today'}
                description={'Descrip'}
                image={'img.url'}
            />
        </ApolloProvider>,
    );

    const title = screen.getByTestId('title');
    expect(title).toHaveTextContent(/Title/i);

    const author = screen.getByTestId('author');
    expect(author).toHaveTextContent(/Author/i);

    const date = screen.getByTestId('date');
    expect(date).toHaveTextContent(/Today/i);

    const descrip = screen.getByTestId('descrip');
    expect(descrip).toHaveTextContent(/Descrip/i);

    const img = screen.getByTestId('img');
    expect(img).toHaveAttribute('src', 'img.url');
});
