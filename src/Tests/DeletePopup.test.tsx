//DONE

import { render } from '@testing-library/react';
import React from 'react';
import DeletePopup from '../Components/DeletePopup';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// render the entire component
test('renders DeletePopup component test', () => {
    const client = new ApolloClient({
        uri: 'https://photobook-be.herokuapp.com/graphql',
        cache: new InMemoryCache(),
    });

    render(
        <ApolloProvider client={client}>
            <DeletePopup photoID={0} />
        </ApolloProvider>,
    );
});
