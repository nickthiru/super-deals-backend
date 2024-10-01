const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const { marshall } = require("@aws-sdk/util-dynamodb");
const KSUID = require("ksuid");
var multipart = require('parse-multipart-data');
const { Buffer } = require('node:buffer');

const Api = require("#src/util/api/service.js");


const s3Client = new S3Client();
// const ddbClient = new DynamoDBClient();


exports.handler = async (event) => {
  console.log("Inside 'lib/domain/deals/workflow/add-deal/lambda-handler.js'");
  console.log("process.env: \n" + JSON.stringify(process.env, null, 2));
  console.log("event: \n" + JSON.stringify(event, null, 2));

  // Decode Base64 Event Body
  let decodedBody = atob(event.body);
  console.log("decodedBody: " + decodedBody);

  // const body = event.body;
  // console.log("body: " + body);

  const contentType = event.headers["content-type"];
  console.log("contentType: " + contentType);

  const boundaryStartIdx = contentType.indexOf("=") + 1;
  console.log("boundaryStartIdx: " + boundaryStartIdx);

  const boundary = contentType.slice(boundaryStartIdx);
  console.log("boundary: " + boundary);

  // const parts = multipart.parse(decodedBody, boundary);
  // console.log("parts: " + parts);

  const parts = multipart.parse(Buffer.from(decodedBody), boundary);
  console.log("parts: " + JSON.stringify(parts, null, 2));

  // const parts = multipart.parse(Buffer.from(event.body, "base64"), boundary);
  // console.log("parts: " + parts);

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    // will be: { filename: 'A.txt', type: 'text/plain', data: <Buffer 41 41 41 41 42 42 42 42> }
    console.log("part.filename: " + part.filename);
    console.log("part.type: " + part.type);
    console.log("part.data.toString(): " + part.data.toString());
  }

  // const str = "multipart/form-data; boundary=----formdata-undici-005609975406";

  // const idx = str.indexOf("=");

  // console.log("idx: " + idx);

  // const boundary = str.slice(idx + 1);



  // Validate Category data?

  // const {
  //   bucketName,
  //   tableName
  // } = getProcessEnvData(process);

  // const [
  //   merchantId,
  //   title,
  //   emailAddress,
  // ] = getEventData(event);


  // Generate KSUID for PK, SK, and Deal
  // const ksuId = KSUID.randomSync();
  // console.log("ksuId: " + ksuId);

  // Save Logo image to S3 and get URL
  // try {
  //   console.log("(+) Saving to Bucket...");

  //   const result = await s3Client.send(new PutObjectCommand({
  //     Bucket: bucketName,
  //     Key: "logo.png",
  //     Body: event.body.logo,
  //   }));

  //   console.log("(+) result: \n" + JSON.stringify(result, null, 2));

  //   return {
  //     statusCode: 201,
  //     message: "Item successfully saved in S3"
  //   };

  // } catch (error) {
  //   console.log("(-) Error: " + error);
  // };

  // Anything to do with the 'Expiration' data i.e. Date

  // const dealData = {
  //   PK: `DEAL#${ksuId}`,
  //   SK: `DEAL#${ksuId}`,
  //   EntityType: "Deal",
  //   Id: `${ksuId}`,
  //   Title: "",
  //   OriginalPrice: 100,
  //   Discount: 50,
  //   LogoUrl: "PNG / JPEG / SVG file S3 Url",
  //   Category: "Food & Drink",
  //   Expiration: date,
  //   MerchantId: "",
  // };

  // try {
  //   console.log("(+) Saving to DDB...");

  //   const result = await ddbClient.send(new PutItemCommand({
  //     TableName: tableName,
  //     Item: marshall(dealData),
  //   }));

  //   console.log("(+) result: \n" + JSON.stringify(result, null, 2));

  //   return {
  //     statusCode: 201,
  //     message: "Item successfully saved in DDB"
  //   };

  // } catch (error) {
  //   console.log("(-) Error: " + error);
  // };

  return {
    statusCode: 200,
    message: "Done!"
  };
}



function getProcessEnvData(process) {
  console.log("Inside 'getProcessEnvData()'");

  const bucketName = process.env.S3_BUCKET_NAME;
  console.log("bucketName: " + bucketName);

  const tableName = process.env.DDB_TABLE_NAME;
  console.log("tableName: " + tableName);

  return {
    bucketName,
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