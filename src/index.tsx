import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// Create a new ApolloClient object and pass in backend link
const client = new ApolloClient({
    uri: 'https://photobook-be.herokuapp.com/graphql',
    cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
    // Bootstrap the application with ApolloClient
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
);
