const AWS = require("aws-sdk");
const uuid = require("uuid");
const documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
  var params = {
    Item: {
      id: uuid.v1(),
      name: event.name,
      telephoneNumber: event.telephoneNumber
    },
    TableName: "contactsTable"
  };
  documentClient.put(params, (err, data) => {
    callback(err, data);
  });
};
