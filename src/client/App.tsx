import React from "react";
import { RootView } from "./view";
import fetch from "cross-fetch";

import {
    ApolloProvider,
    ApolloClient,
    InMemoryCache,
    HttpLink,
} from "@apollo/client";
import { Router } from "./view/router";
import { GlobalStyles } from "./service/styled-components/global";

export const App = () => {
    // let address = "http://localhost:8080/graphql";
    // if (window && window.location && window.location.protocol) {
    //     address = `${window.location.protocol}//${window.location.host}/graphql`;
    // }
    // console.log(window.location);
    const client = new ApolloClient({
        link: new HttpLink({ uri: "/graphql", fetch }),
        cache: new InMemoryCache(),
    });
    // if (typeof window === "undefined") {
    //     return (
    //         <ApolloProvider client={client}>
    //             <RootView />
    //         </ApolloProvider>
    //     );
    // }
    return (
        <ApolloProvider client={client}>
            <Router />
            <GlobalStyles />
            {/* <RootView /> */}
        </ApolloProvider>
    );
};
