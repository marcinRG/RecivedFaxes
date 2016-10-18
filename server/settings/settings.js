var paths = {
    pdfs: './server/resources/pdfs',
    oldPdfs: './server/resources/old_pdfs',
    page: './src'
};

var routes = {
    pdfs : '/pdfs',
    oldPdfs : '/oldPdfs'
};

var apis = {
    pdfPath: '/api/pdfs',
    oldPdfPaths: '/api/oldPfs'
};

var error = {
   url : '/errors',
   path : './server/errorHandlers/pages'
};

module.exports = {
    paths: paths,
    apiRotues: apis,
    fileRoutes: routes,
    error:error
};

