Sample utilities for setting up and using SNS notification. Here, messages
published via SNS are stuck in an SQS queue
(arn:aws:sqs:us-east-1:nnnnn:testQueue).

Note on the queue side I had to update the permissions policy document
to enable access from the topic. Since I had some other test topics
I added blanket acess from my account, e.g.

     "Action": "sqs:SendMessage",
     "Resource": "arn:aws:sqs:us-east-1:nnnn:testQueue",
     "Condition": {
       "ArnLike": {
             "aws:SourceArn": "arn:aws:sns:us-east-1:nnnn:*"
        }
      }
