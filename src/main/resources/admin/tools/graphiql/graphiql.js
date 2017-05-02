var portalLib = require('/lib/xp/portal');
var mustacheLib = require('/lib/xp/mustache');

exports.get = function (req) {
    var view = resolve('./graphiql.html');
    var assetsUrl = portalLib.assetUrl({path: ""});
    var params = {
        graphiQLAssetsUrl: assetsUrl + '/graphiql',
        toolAssetsUrl: assetsUrl + '/tool',
        query: req.params.query,
        graphQlServiceUrl: req.params.location || portalLib.serviceUrl({
            service: 'graphql',
            application: 'com.enonic.app.myapp'
        })
    };

    return {
        body: mustacheLib.render(view, params)
    };
};
