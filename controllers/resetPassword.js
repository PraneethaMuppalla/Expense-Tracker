exports.forgotPassword = (req, res, next) => {
  try {
    const { email } = req.body;
  } catch (err) {
    console.error(err);
  }
};
