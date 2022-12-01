const Loan = require('./../models/loanModel');
const APIFeatures = require('./../databaseManager/loanDbContext');


exports.getallloans =   async (req, res) => {
    try {
      // EXECUTE QUERY
      const features = new APIFeatures(Loan.find({"email":req.user.email}), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
      const loans = await features.query;
      console.log(req.user._id);
      res.render('loandisplay', {loans})
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err
      });
    }
  };
  exports.getloans =   async (req, res) => {
    try {
      // EXECUTE QUERY
      const features = new APIFeatures(Loan.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
      const loans = await features.query;
  
      // SEND RESPONSE
      res.status(200).json({
        status: 'success',
        results: loans.length,
        data: {
          loans
        }
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err
      });
    }
  };



exports.getloan = (req, res) => {
  res.status(200).render('newloan', {
    title: 'create new loan'
  });
};
exports.createloan = async  (req, res) => {
    try {
  
      const newLoan = await Loan.create(req.body);
      res.render('overview',{
        authenticated: true
      });
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: err
      });
    }
  };
