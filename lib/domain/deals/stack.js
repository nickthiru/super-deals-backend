const { Stack } = require("aws-cdk-lib");
const { ApiEndpointsStack } = require("./api-endpoints/stack");
const { AddDealWorkflowContruct } = require("./workflow/add-deal/construct");


class DealsServiceStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);
    console.log("(+) Inside 'MapStack'");

    const {
      dbStack,
      apiStack,
    } = props;


    /*** Workflows ***/

    const addDealWorkflowConstruct = new AddDealWorkflowContruct(this, "AddDealWorkflowContruct", {
      dbStack,
    });



    /*** API Endpoints */

    new ApiEndpointsStack(this, "ApiEndpointsStack", {
      apiStack,
      addDealWorkflowConstruct,
    });
  }
}

module.exports = { DealsServiceStack };