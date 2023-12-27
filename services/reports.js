const Expenses = require("../model/expense");
const Sequelize = require("sequelize");
const { Op } = require("sequelize");
const AWS = require("aws-sdk");

exports.getTimelyExpense = async (userId, type) => {
  let response;
  switch (type) {
    case "today":
      response = await Expenses.findAll({
        where: { userId, date: new Date() },
      });
      break;
    case "month":
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      response = await Expenses.findAll({
        where: {
          userId,
          date: {
            [Op.lte]: new Date(),
            [Op.gte]: startOfMonth,
          },
        },
      });
      break;
    case "year":
      const startOfYear = new Date();
      startOfYear.setMonth(1);
      response = await Expenses.findAll({
        where: {
          userId,
          date: {
            [Op.lte]: new Date(),
            [Op.gte]: startOfYear,
          },
        },
      });
      break;
    default:
      response = await Expenses.findAll({ where: { userId } });
  }
  return response;
};

// exports.uploadToS3 = (stringifiedResponse, fileName) => {
//   let s3Bucket = new AWS.S3({
//     accessKeyId: process.env.IAM_USER_KEY,
//     secretAccessKey: process.env.IAM_USER_SECRET,
//   });
//   let params = {
//     Bucket: process.env.BUCKET_NAME,
//     Key: fileName,
//     Body: stringifiedResponse,
//     ACL: "public-read",
//   };
//   return new Promise((res, rej) => {
//     s3Bucket.upload(params, (err, response) => {
//       if (err) {
//         console.log(err);
//         reject(err);
//       } else {
//         console.log(response);
//         res(response.Location);
//       }
//     });
//   });
// };
