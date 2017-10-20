function graphQLFetcher(graphQLParams) {
    return fetch(window.location.origin + '/graphql', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(graphQLParams),
    }).then(response => response.json());
}

var parameters = {};
ReactDOM.render(React.createElement(GraphiQL, {
    fetcher: graphQLFetcher,
    query: parameters.query,
    variables: parameters.variables,
    operationName: parameters.operationName
}), document.body);