const { PutItemCommand } = require("@aws-sdk/client-dynamodb");
const { marshall } = require("@aws-sdk/util-dynamodb");
const KSUID = require("ksuid");

const Api = require("#src/util/api/service.js");


exports.handler = async (event) => {
  console.log("Inside 'lib/domain/deals/workflow/add-deal/lambda-handler.js'");
  console.log("process.env: \n" + JSON.stringify(process.env, null, 2));
  console.log("event: \n" + JSON.stringify(event, null, 2));

  const { tableName } = getProcessEnvData(process);

  const [
    merchantId,
    title,
    emailAddress,
  ] = getEventData(event);

  // Generate KSUID for PK, SK, and Deal
  const ksuId = KSUID.randomSync();

  // Save Logo image to S3 and get URL

  // Validate Category data?

  // Anything to do with 'Expiration' data i.e. Date

  const data = {
    PK: `DEAL#${ksuId}`,
    SK: `DEAL#${ksuId}`,
    EntityType: "Deal",
    Id: `${ksuId}`,
    Title: "",
    OriginalPrice: 100,
    Discount: 50,
    LogoUrl: "PNG / JPEG / SVG file S3 Url",
    Category: "Food & Drink",
    Expiration: date,
    MerchantId: "",
  };

  try {
    console.log("(+) Saving to DDB...");

    const result = await ddbClient.send(new PutItemCommand({
      TableName: tableName,
      Item: marshall(data),
    }));

    console.log("(+) result: \n" + JSON.stringify(result, null, 2));

    return {
      statusCode: 201,
      message: "Item successfully saved in DDB"
    };

  } catch (error) {
    console.log("(-) Error: " + error);
  };
}



function getProcessEnvData(process) {
  console.log("Inside 'getProcessData()'");

  const tableName = process.env.TABLE_NAME;
  console.log("tableName: " + tableName);

  return {
    tableName,
  }
}


function getEventData(event) {
  console.log("Inside 'getEventData()'");

  const body = JSON.parse(event.body);
  console.log("(+) body.Username: " + body.Username);
  console.log("(+) body.Password: " + body.Password);
  console.log("(+) body.EmailAddress: " + body.EmailAddress);

  const username = body.Username;
  const password = body.Password;
  const emailAddress = body.EmailAddress;
  console.log("(+) username: " + username);
  console.log("(+) password: " + password);
  console.log("(+) emailAddress: " + emailAddress);

  return {
    username,
    password,
    emailAddress,
  };
}


function prepareResponse() {
  console.log("Inside 'prepareResponse()'");

  const corsHeader = Api.addCorsHeader();
  console.log("(+) corsHeadear: " + JSON.stringify(corsHeader));

  const headers = {
    ...corsHeader,
  };
  console.log("(+) headers: " + JSON.stringify(headers));

  // const body = JSON.stringify(signUpResult);
  // console.log("(+) body: " + JSON.stringify(body));

  const body = JSON.stringify({
    Message: "User account registered. Needs confirmation via OTP."
  });
  console.log("(+) body: " + JSON.stringify(body));

  return {
    statusCode: 200,
    headers: headers,
    body: body,
  };
}