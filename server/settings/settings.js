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

var utilsSettings = {
    images: './server/resources/images',
    outputDir: './server/resources/old_pdfs'
};

var error = {

};

module.exports = {
    paths: paths,
    utilsSettings: utilsSettings,
    apiRotues: apis,
    fileRoutes: routes,
    error:error
};

