var portalLib = require('/lib/xp/portal');
var contentLib = require('/lib/xp/content');
var mustacheLib = require('/lib/xp/mustache');
var timestamp = Date.now();

exports.get = function (req) {
    var view = resolve('./graphiql.html');
    var assetsUrl = portalLib.assetUrl({path: ""});
    var params = {
        graphiQLAssetsUrl: assetsUrl + '/graphiql',
        toolAssetsUrl: assetsUrl + '/tool',
        query: req.params.query,
        graphQlServiceUrl: req.params.location || generateServiceUrl(),
        launcherConfig : {
            adminUrl: portalLib.url({path: "/admin"}),
            assetsUri: portalLib.url({path: "/admin/assets/" + timestamp}),
            appId: app.name,
            appName: 'GraphiQL'
        }
    };

    return {
        body: mustacheLib.render(view, params)
    };
};

function generateServiceUrl() {
    var bean = __.newBean('com.enonic.app.guillotine.GraphiQLBean');
    var sites = contentLib.query({query: 'type = "portal:site"'}).hits;
    for (var i = 0; i < sites.length; i++) {
        var site = sites[i];
        var siteConfig = site.data.siteConfig;
        if (siteConfig) {
            for (var j = 0; j < siteConfig.length; j++) {
                var applicationKey = siteConfig[j].applicationKey;
                if (bean.hasGraphQLService(applicationKey)) {
                    return generateGraphQLUrl('draft', site._path, applicationKey);
                }
            }
        }
    }
    return generateGraphQLUrl('draft', '/mysite', 'com.enonic.app.myapp');
}

function generateGraphQLUrl(branch, path, applicationKey) {
    var path = '/admin/portal/preview/' + branch + path + '/_/service/' + applicationKey + '/graphql';
    return portalLib.url({path: path, type: 'absolute'});
}
