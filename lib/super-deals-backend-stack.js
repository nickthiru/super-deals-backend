const { Stack } = require('aws-cdk-lib');
const { DbStack } = require('./util/db/stack');
const { ApiStack } = require('./util/api/stack');
const { DealsServiceStack } = require('./domain/deals/stack');

class SuperDealsBackendStack extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);
    console.log("(+) Inside 'SuperDealsBackendStack'");


    /*** Utilities ***/

    const dbStack = new DbStack(this, "DbStack");

    const apiStack = new ApiStack(this, "ApiStack");


    /*** Services ***/

    new DealsServiceStack(this, "DealsServiceStack", {
      dbStack,
      apiStack,
    });


  }
}

module.exports = { SuperDealsBackendStack }
