const { Stack, RemovalPolicy } = require("aws-cdk-lib");
const { TableV2, AttributeType, BillingMode } = require("aws-cdk-lib/aws-dynamodb");

class StorageStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);
    console.log("(+) Inside 'StorageStack'");

    //   this.mainTable = new TableV2(this, "MainTable", {
    //     partitionKey: {
    //       name: "PK",
    //       type: AttributeType.STRING
    //     },
    //     sortKey: {
    //       name: "SK",
    //       type: AttributeType.STRING
    //     },
    //     globalSecondaryIndexes: [
    //       {
    //         indexName: "GSI1",
    //         partitionKey: {
    //           name: "GSI1PK",
    //           type: AttributeType.STRING,
    //         },
    //         sortKey: {
    //           name: "GSI1SK",
    //           type: AttributeType.STRING,
    //         },
    //       },
    //     ],
    //     removalPolicy: RemovalPolicy.DESTROY,
    //     billingMode: BillingMode.PAY_PER_REQUEST,
    //   });
    // };
  }

module.exports = { StorageStack };