const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
  var params = {
    TableName: "contactsTable"
  };
  documentClient.scan(params, function(err, data) {
    if (err) {
      callback(err, null);
    } else {
      const response = {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        data: data.Items
      };
      callback(null, response);
    }
  });
};
