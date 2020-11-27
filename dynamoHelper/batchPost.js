var Q = require('q');
var AWS = require('aws-sdk');

module.exports.createDynamoClient = function () {

  var dynamoClient = new AWS.DynamoDB.DocumentClient({
    apiVersion: '2012-08-10',
    region: process.env.AWS_REGION,
    accessKeyId: process.env.REALM_DYNAMODB_DATA_ACCESS_KEY_ID,
    secretAccessKey: process.env.REALM_DYNAMODB_DATA_SECRET_ACCESS_KEY
  });

  return dynamoClient;
};

module.exports.batchPostEntities = function (dynamoClient, postData) {
  var deferred = Q.defer();

  if (dynamoClient) {
    var params = {
      RequestItems: {
        [postData.collection]: []
      }
    };
    for (var idx = 0; idx < postData.body.length; idx++) {
      params.RequestItems[postData.collection].push(postData.body[idx]);
    }
    dynamoClient.batchWrite(params, function (err, data) {
      if (err) {
        deferred.reject(err);
      }
      else {
        deferred.resolve(data);
      }
    });
  }
  else {
    deferred.reject({ message: 'Dynamo Client Not Initialized!' });
  }

  return deferred.promise;
};
