var json = require('./CRUD_Operations/Entity.json');
console.log(JSON.stringify(json))

var dynamoHelper = require('./dynamoHelper/batchpost');
var dynamoClient = dynamoHelper.createDynamoClient();

var batchWriteGroupParams = {
  collection: 'Realm_global.development_learning_graph',
  body: [
    {
      pk: 'Store$GreterThan$400Kb',
      sk: 'Success$UnprocessedItem$NotError'
    }
  ]
};
batchWriteGroupParams.body['dataGreater400Kb'] = json.dataGreater400Kb;

dynamoHelper.batchPostEntities(dynamoClient, batchWriteGroupParams)
  .then(function (res) {
    console.info('#success.' + JSON.stringify(res, 0, 4));
  })
  .catch(function (err) {
    console.error('#err.', err)
  });


/** Output:
 * {
 * ...,
 *  message: 'Supplied AttributeValue has more than one datatypes set, must contain exactly one of  the supported datatypes',
  code: 'ValidationException',
  time: 2020-11-27T14:59:36.926Z,
  requestId: 'H91IKTLQV2QL3DJEN9QFQ1F933VV4KQNSO5AEMVJF66Q9ASUAAJG',
  statusCode: 400,
  retryable: false,
  retryDelay: 0
 }
 */
