const { handler } = require("../lib/domain/deals/workflow/add-deal/lambda.js");
const fs = require("fs");

const eventDataFilePath = "./data/workflow-event/sns-event.json";

const main = async () => {

  const data = fs.readFileSync(eventDataFilePath);
  const event = JSON.parse(data);

  // const response = await handler({}, {});

  const response = await handler(event, {});

  // console.log("(+) response: " + JSON.stringify(response, null, 2));
}

// const readJson = async (path) => {
//   return fs.readFile(require.resolve(path));
// }

main();