var AWS = require('aws-sdk');


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

sns.listTopics({}, function(err, data){
  if (err) console.log(err, err.stack);
  else console.log(data);
});
