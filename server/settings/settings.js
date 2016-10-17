var paths = {
    pdfs: './server/resources/pdfs',
    oldPdfs: './server/resources/old_pdfs',
    page: './src'
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
    apiPaths: apis,
    error:error
};

