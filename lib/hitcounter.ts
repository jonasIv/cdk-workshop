import path = require('path');
import cdk = require ('@aws-cdk/core');
import lambda = require('@aws-cdk/aws-lambda');
import dynamodb = require('@aws-cdk/aws-dynamodb');

export interface HitCounterProps {
  downstream: lambda.IFunction;
}

export class HitCounter extends cdk.Construct {
  /** allows accessing the counter function **/
  public readonly handler: lambda.Function;

  constructor(scope: cdk.Construct, id: string, props: HitCounterProps) {
    super(scope, id);

    const table = new dynamodb.Table(this, 'Hits', {
      partitionKey: { name: 'path', type: dynamodb.AttributeType.STRING }
    });

    this.handler = new lambda.Function(this, 'HitCounterHandler', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'hitcounter.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../lambda')),
      environment: {
        DOWNSTREAM_FUNCTION_NAME: props.downstream.functionName,
        HITS_TABLE_NAME: table.tableName,
      }
    });

    // Grant permission to lambda function to write to table
    table.grantReadWriteData(this.handler);

    // Grant permission to lambda function to invoke other function
    props.downstream.grantInvoke(this.handler);

  }
}
