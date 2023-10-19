const prodConfig = {
    server: './server.js',
    serverBuildPath: '.netlify/functions-internal/server.js',
};

/**
 * @type {import('@remix-run/dev').AppConfig}
 */
export default {
    cacheDirectory: './node_modules/.cache/remix',
    ignoredRouteFiles: ['**/.*', '**/*.css', '**/*.test.{js,jsx,ts,tsx}'],
    serverDependenciesToBundle: ['normalize-url'],
    tailwind: true,
    ...(process.env['NODE_ENV'] == 'production' ? prodConfig : {}),
};
