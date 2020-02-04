"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const cdk = require("@aws-cdk/core");
const lambda = require("@aws-cdk/aws-lambda");
const dynamodb = require("@aws-cdk/aws-dynamodb");
class HitCounter extends cdk.Construct {
    constructor(scope, id, props) {
        super(scope, id);
        // DynamoDB table
        this.table = new dynamodb.Table(this, 'Hits', {
            partitionKey: { name: 'path', type: dynamodb.AttributeType.STRING }
        });
        // Lambda for counting
        this.handler = new lambda.Function(this, 'HitCounterHandler', {
            runtime: lambda.Runtime.NODEJS_12_X,
            handler: 'hitcounter.handler',
            code: lambda.Code.fromAsset(path.join(__dirname, '../lambda')),
            environment: {
                DOWNSTREAM_FUNCTION_NAME: props.downstream.functionName,
                HITS_TABLE_NAME: this.table.tableName,
            }
        });
        // Grant permission to lambda function to write to table
        this.table.grantReadWriteData(this.handler);
        // Grant permission to lambda function to invoke other function
        props.downstream.grantInvoke(this.handler);
    }
}
exports.HitCounter = HitCounter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGl0Y291bnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhpdGNvdW50ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2QkFBOEI7QUFDOUIscUNBQXVDO0FBQ3ZDLDhDQUErQztBQUMvQyxrREFBbUQ7QUFNbkQsTUFBYSxVQUFXLFNBQVEsR0FBRyxDQUFDLFNBQVM7SUFNM0MsWUFBWSxLQUFvQixFQUFFLEVBQVUsRUFBRSxLQUFzQjtRQUNsRSxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRWpCLGlCQUFpQjtRQUNqQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFO1lBQzVDLFlBQVksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFO1NBQ3BFLENBQUMsQ0FBQztRQUVILHNCQUFzQjtRQUN0QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsbUJBQW1CLEVBQUU7WUFDNUQsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVztZQUNuQyxPQUFPLEVBQUUsb0JBQW9CO1lBQzdCLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQztZQUM5RCxXQUFXLEVBQUU7Z0JBQ1gsd0JBQXdCLEVBQUUsS0FBSyxDQUFDLFVBQVUsQ0FBQyxZQUFZO2dCQUN2RCxlQUFlLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTO2FBQ3RDO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsd0RBQXdEO1FBQ3hELElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTVDLCtEQUErRDtRQUMvRCxLQUFLLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFN0MsQ0FBQztDQUNGO0FBaENELGdDQWdDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuaW1wb3J0IGNkayA9IHJlcXVpcmUgKCdAYXdzLWNkay9jb3JlJyk7XG5pbXBvcnQgbGFtYmRhID0gcmVxdWlyZSgnQGF3cy1jZGsvYXdzLWxhbWJkYScpO1xuaW1wb3J0IGR5bmFtb2RiID0gcmVxdWlyZSgnQGF3cy1jZGsvYXdzLWR5bmFtb2RiJyk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSGl0Q291bnRlclByb3BzIHtcbiAgZG93bnN0cmVhbTogbGFtYmRhLklGdW5jdGlvbjtcbn1cblxuZXhwb3J0IGNsYXNzIEhpdENvdW50ZXIgZXh0ZW5kcyBjZGsuQ29uc3RydWN0IHtcbiAgLyoqIGFsbG93cyBhY2Nlc3NpbmcgdGhlIGNvdW50ZXIgZnVuY3Rpb24gKiovXG4gIHB1YmxpYyByZWFkb25seSBoYW5kbGVyOiBsYW1iZGEuRnVuY3Rpb247XG5cbiAgcHVibGljIHJlYWRvbmx5IHRhYmxlOiBkeW5hbW9kYi5UYWJsZTtcblxuICBjb25zdHJ1Y3RvcihzY29wZTogY2RrLkNvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM6IEhpdENvdW50ZXJQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCk7XG5cbiAgICAvLyBEeW5hbW9EQiB0YWJsZVxuICAgIHRoaXMudGFibGUgPSBuZXcgZHluYW1vZGIuVGFibGUodGhpcywgJ0hpdHMnLCB7XG4gICAgICBwYXJ0aXRpb25LZXk6IHsgbmFtZTogJ3BhdGgnLCB0eXBlOiBkeW5hbW9kYi5BdHRyaWJ1dGVUeXBlLlNUUklORyB9XG4gICAgfSk7XG5cbiAgICAvLyBMYW1iZGEgZm9yIGNvdW50aW5nXG4gICAgdGhpcy5oYW5kbGVyID0gbmV3IGxhbWJkYS5GdW5jdGlvbih0aGlzLCAnSGl0Q291bnRlckhhbmRsZXInLCB7XG4gICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMTJfWCxcbiAgICAgIGhhbmRsZXI6ICdoaXRjb3VudGVyLmhhbmRsZXInLFxuICAgICAgY29kZTogbGFtYmRhLkNvZGUuZnJvbUFzc2V0KHBhdGguam9pbihfX2Rpcm5hbWUsICcuLi9sYW1iZGEnKSksXG4gICAgICBlbnZpcm9ubWVudDoge1xuICAgICAgICBET1dOU1RSRUFNX0ZVTkNUSU9OX05BTUU6IHByb3BzLmRvd25zdHJlYW0uZnVuY3Rpb25OYW1lLFxuICAgICAgICBISVRTX1RBQkxFX05BTUU6IHRoaXMudGFibGUudGFibGVOYW1lLFxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gR3JhbnQgcGVybWlzc2lvbiB0byBsYW1iZGEgZnVuY3Rpb24gdG8gd3JpdGUgdG8gdGFibGVcbiAgICB0aGlzLnRhYmxlLmdyYW50UmVhZFdyaXRlRGF0YSh0aGlzLmhhbmRsZXIpO1xuXG4gICAgLy8gR3JhbnQgcGVybWlzc2lvbiB0byBsYW1iZGEgZnVuY3Rpb24gdG8gaW52b2tlIG90aGVyIGZ1bmN0aW9uXG4gICAgcHJvcHMuZG93bnN0cmVhbS5ncmFudEludm9rZSh0aGlzLmhhbmRsZXIpO1xuXG4gIH1cbn1cbiJdfQ==