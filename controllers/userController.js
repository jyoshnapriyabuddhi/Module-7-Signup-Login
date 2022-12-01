const User = require('./../models/userModel');
const APIFeatures = require('../databaseManager/loanDbContext.JS');


exports.getLandingPAge = async (req, res) => {
  res.status(200).render('overview', {title: `overview`});
};

exports.getSignInForm = (req, res) => {
  res.status(200).render('register', {
    title: `register`
  });
};

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'LogIn'
  });
};


exports.getusers =   async (req, res) => {
  try {
    // EXECUTE QUERY
    const features = new APIFeatures(User.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const users = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};