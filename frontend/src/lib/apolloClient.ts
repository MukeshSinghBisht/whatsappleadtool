import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://localhost:3004/graphql',
    cache: new InMemoryCache(),
    credentials: 'include'
});
export default client;
