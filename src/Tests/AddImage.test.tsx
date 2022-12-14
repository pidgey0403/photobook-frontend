//DONE

import { render } from '@testing-library/react';
import React from 'react';
import AddImage from '../Components/AddImage';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// render the entire component
test('renders AddImage component test', () => {
    // Connect to backend using ApolloClient to be able to render the tests
    const client = new ApolloClient({
        uri: 'https://photobook-be.herokuapp.com/graphql',
        cache: new InMemoryCache(),
    });

    render(
        <ApolloProvider client={client}>
            <AddImage />
        </ApolloProvider>,
    );
});
