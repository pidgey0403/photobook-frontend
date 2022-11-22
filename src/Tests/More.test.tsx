//DONE?

import { render } from '@testing-library/react';
import React from 'react';
import More from '../Components/More';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// renders the entire component
test('renders More component test', () => {
    const client = new ApolloClient({
        uri: 'https://photobook-be.herokuapp.com/graphql',
        cache: new InMemoryCache(),
    });

    render(
        <ApolloProvider client={client}>
            <More
                title={''}
                author={''}
                date={''}
                description={''}
                image={''}
            />
        </ApolloProvider>,
    );
});
