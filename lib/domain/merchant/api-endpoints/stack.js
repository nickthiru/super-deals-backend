const { Stack } = require("aws-cdk-lib");
const { LambdaIntegration } = require("aws-cdk-lib/aws-apigateway");


class MerchantApiEndpointsStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);
    console.log("(+) Inside 'MerchantApiEndpointsStack'");

    const {
      api,
      mapMarkerShowingDeviceLocation,
    } = props;


    // /merchant
    const merchant = api.http.restApi.root.addResource("merchant", api.http.optionsWithCors);

    // /merchant/deals
    const deals = merchant.addResource("deals");

    // devices.addMethod("GET", new LambdaIntegration(mapMarkerShowingDeviceLocation.getDevices.lambda));

    // const devices = map.addResource("devices");
    // devices.addMethod("GET", new LambdaIntegration( mapMarkerShowingDeviceLocation.getDevices.lambda), api.http.optionsWithAuth);

    // /merchant/deals/add
    const add = deals.addResource("add");

    add.addMethod("POST", new LambdaIntegration())

  }
}

module.exports = { MerchantApiEndpointsStack };