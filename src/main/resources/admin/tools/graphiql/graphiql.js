var portalLib = require('/lib/xp/portal');
var mustacheLib = require('/lib/xp/mustache');

exports.get = function () {
    var view = resolve('./graphiql.html');
    var assetsUrl = portalLib.assetUrl({path: ""});
    var params = {
        graphiQLAssetsUrl: assetsUrl + '/graphiql',
        toolAssetsUrl: assetsUrl + '/tool',
        graphQlServiceUrl: portalLib.serviceUrl({
            service: 'graphql',
            application: 'com.enonic.app.myapp'
        })
    };

    return {
        body: mustacheLib.render(view, params)
    };
};
