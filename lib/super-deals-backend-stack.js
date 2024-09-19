const { Stack } = require('aws-cdk-lib');
const { DbStack } = require('./util/db/stack');
const { ApiStack } = require('./util/api/stack');

class SuperDealsBackendStack extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    /*** Utilities ***/

    const dbStack = new DbStack(this, "DbStack");

    const apiStack = new ApiStack(this, "ApiStack");


    /*** Business Domains ***/


  }
}

module.exports = { SuperDealsBackendStack }
