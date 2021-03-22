const getHomePage = (_req, res) => {
  const renderOptions = {
    pageTitle: 'Home',
    path: '/',
  };

  return res.render('HomePage', renderOptions);
}

module.exports = {
  getHomePage,
};