'use strict';

var serverPath = './server/';

var paths = {
    pdfs: serverPath + 'resources/pdfs',
    oldPdfs: serverPath + 'resources/old_pdfs',
    page: './src',
    pageProd: './build'
};

var routes = {
    pdfs: '/pdfs',
    oldPdfs: '/oldPdfs'
};

var apis = {
    pdfPath: '/api/pdfs',
    oldPdfPaths: '/api/oldPdfs'
};

var error = {
    url: '/errors',
    path: serverPath + 'errorHandlers/pages',
    error404: '/errors/404.html',
    errorAll: '/errors/errorNS.html'
};

module.exports = {
    app: paths,
    apiRotues: apis,
    fileRoutes: routes,
    error: error,
    defaultPort: 3000
};
