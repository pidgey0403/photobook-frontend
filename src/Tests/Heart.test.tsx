//DONE

import { render, screen } from '@testing-library/react';
import React from 'react';
import Heart from '../Components/Heart';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// render the entire component
test('renders Heart component test', () => {
    const client = new ApolloClient({
        uri: 'https://photobook-be.herokuapp.com/graphql',
        cache: new InMemoryCache(),
    });

    render(
        <ApolloProvider client={client}>
            <Heart countLike={0} photoID={0} />
        </ApolloProvider>,
    );
});

// render the entire component and verify props
test('renders Heart component and verifies props', () => {
    const client = new ApolloClient({
        uri: 'https://photobook-be.herokuapp.com/graphql',
        cache: new InMemoryCache(),
    });

    render(
        <ApolloProvider client={client}>
            <Heart countLike={1} photoID={0} />
        </ApolloProvider>,
    );

    const count = screen.getByTestId('count');
    expect(count).toHaveTextContent(/1/);
});
