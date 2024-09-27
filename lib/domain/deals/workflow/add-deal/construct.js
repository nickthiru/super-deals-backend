const { Construct } = require("constructs");
const { CfnOutput } = require("aws-cdk-lib");
const { NodejsFunction } = require("aws-cdk-lib/aws-lambda-nodejs");
const { Runtime } = require("aws-cdk-lib/aws-lambda");
// const { Duration } = require("aws-cdk-lib");
const { PolicyStatement, Effect } = require("aws-cdk-lib/aws-iam");
// const { LambdaFunctionAction } = require("@aws-cdk/aws-iot-actions-alpha");
// const { TopicRule, IotSql } = require("@aws-cdk/aws-iot-alpha");
// const { Topic } = require("aws-cdk-lib/aws-sns");
// const { SnsToSqs } = require("@aws-solutions-constructs/aws-sns-sqs");
const path = require("path");


class AddDealWorkflowContruct extends Construct {
  constructor(scope, id, props) {
    super(scope, id, props);
    console.log("(+) Inside 'AddDealWorkflowContruct'");

    const {
      dbStack,
    } = props;

    this.lambda = new NodejsFunction(this, "AddDealWorkflowLambda", {
      bundling: {
        externalModules: ["@aws-sdk"]
      },
      runtime: Runtime.NODEJS_18_X,
      // memorySize: 1024,
      // memorySize: 512,
      // timeout: Duration.minutes(1),
      entry: (path.join(__dirname, "./lambda-handler.js")),
      handler: "handler",
      depsLockFilePath: (path.join(__dirname, "../../../../../package-lock.json")),
      environment: {
        TABLE_NAME: dbStack.mainTable.tableName,
      },
      initialPolicy: [
        new PolicyStatement({
          effect: Effect.ALLOW,
          resources: [tableArn],
          actions: ["dynamodb:PutItem"],
        }),
      ]
    });
  }
}

module.exports = { AddDealWorkflowContruct };