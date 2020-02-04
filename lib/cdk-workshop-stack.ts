import path = require('path');
import lambda = require('@aws-cdk/aws-lambda');
import cdk = require('@aws-cdk/core');
import apigw = require('@aws-cdk/aws-apigateway');
import { TableViewer } from 'cdk-dynamo-table-viewer';
import { HitCounter } from './hitcounter';

export class CdkWorkshopStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Simple "hello" lambda
    const hello = new lambda.Function(this, 'HelloHandler', {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset(path.join(__dirname, '../lambda')),
      handler: 'hello.handler'
    });

    // Hit Counter Construct
    const helloWithCounter = new HitCounter(this, 'HelloHitCounter', {
      downstream: hello,
    });

    // API Gateway
    new apigw.LambdaRestApi(this, 'Endpoint', {
      handler: helloWithCounter.handler,
    });

    // Table Viewer
    new TableViewer(this, 'HitCounter TableViewer', {
      table: helloWithCounter.table,
      title: 'Hit Counter',
      sortBy: '-hits',
    });

  }
}
