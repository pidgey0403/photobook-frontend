//DONE

import { render } from '@testing-library/react';
import React from 'react';
import Album from '../Components/Album';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// render the entire component
test('renders Album component test', () => {
    const client = new ApolloClient({
        uri: 'https://photobook-be.herokuapp.com/graphql',
        cache: new InMemoryCache(),
    });

    render(
        <ApolloProvider client={client}>
            <Album />
        </ApolloProvider>,
    );
});
