var AWS = require('aws-sdk');

var args = process.argv.slice(2);
if(args.length != 2) {
  console.log("Usage: node subcribe-queue-to-topic <topic ARN> <queue ARN>")
  process.exit(1);
}

AWS.config.update({region: 'us-east-1'});
AWS.config.loadFromPath('../config.json');

var httpProxy = process.env.http_proxy;
if(httpProxy !== undefined) {

  var HttpProxyAgent = require('https-proxy-agent');
  var proxyAgent = new HttpProxyAgent(httpProxy);
  AWS.config.httpOptions = { agent: proxyAgent };

} else {
  console.log("No proxy settings found");
}

var sns = new AWS.SNS();

var params = {
  TopicArn : args[0],
  Protocol : "sqs",
  Endpoint : args[1]
};

sns.subscribe(params, function(err, data) {
  if(err) console.log(err);
  else {
    console.log("subscribed");
  }
});
