const { Stack } = require("aws-cdk-lib");
const { ApiEndpointsStack } = require("./api-endpoints/stack");
const { AddDealWorkflowContruct } = require("./workflow/add-deal/construct");


class DealsServiceStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);
    console.log("(+) Inside 'MapStack'");

    const {
      api,
    } = props;

    // Location of Service's src files (for Lambda)
    // const serviceWorkflowSrcDir = "../../../../../src/service/deals/workflow";



    /*** Workflows ***/

    const addDealWorkflow = new AddDealWorkflowContruct(this, "AddDealWorkflowContruct", {
      // serviceWorkflowSrcDir,
    });



    /*** API Endpoints */

    new ApiEndpointsStack(this, "ApiEndpointsStack", {
      api,
      addDealWorkflow,
    });
  }
}

module.exports = { DealsServiceStack };