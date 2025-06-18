'use client'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import { ApolloProvider } from '@apollo/client'
import client from '@/lib/apolloClient'
type Props = {
    children: React.ReactNode;
}

const ReduxProvider = ({ children }: Props) => {
    return <Provider store={store}>
                <ApolloProvider client={client}>
                    {children}
                </ApolloProvider>
            </Provider>
}

export default ReduxProvider
