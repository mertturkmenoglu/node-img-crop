const getHomePage = (_req, res) => {
  const renderOptions = {
    pageTitle: 'Home',
    path: '/',
  };

  return res.render('HomePage', renderOptions);
}

const getImageUploadPage = (_req, res) => {
  const renderOptions = {
    path: '/image-upload',
    pageTitle: 'Image Upload',
    error: null,
    message: null
  }

  return res.render('ImageUpload', renderOptions);
}

const postImageUpload = (req, res) => {
  const image = req.file;
  console.log('here', image);
  let statusCode;
  const renderOptions = {
    pageTitle: 'Image Upload',
    path: '/image-upload',
    error: null,
    message: null,
  };

  if (!image) {
    statusCode = 422;
    renderOptions.error = "File is not an image";
  } else {
    statusCode = 201;
    renderOptions.message = "File uploaded";
  }

  return res.status(statusCode).render('ImageUpload', renderOptions);
}

module.exports = {
  getHomePage,
  getImageUploadPage,
  postImageUpload,
};