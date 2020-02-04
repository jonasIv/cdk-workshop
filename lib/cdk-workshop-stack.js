"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const lambda = require("@aws-cdk/aws-lambda");
const cdk = require("@aws-cdk/core");
const apigw = require("@aws-cdk/aws-apigateway");
const cdk_dynamo_table_viewer_1 = require("cdk-dynamo-table-viewer");
const hitcounter_1 = require("./hitcounter");
class CdkWorkshopStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // Simple "hello" lambda
        const hello = new lambda.Function(this, 'HelloHandler', {
            runtime: lambda.Runtime.NODEJS_12_X,
            code: lambda.Code.fromAsset(path.join(__dirname, '../lambda')),
            handler: 'hello.handler'
        });
        // Hit Counter Construct
        const helloWithCounter = new hitcounter_1.HitCounter(this, 'HelloHitCounter', {
            downstream: hello,
        });
        // API Gateway
        new apigw.LambdaRestApi(this, 'Endpoint', {
            handler: helloWithCounter.handler,
        });
        // Table Viewer
        new cdk_dynamo_table_viewer_1.TableViewer(this, 'HitCounter TableViewer', {
            table: helloWithCounter.table,
            title: 'Hit Counter',
            sortBy: '-hits',
        });
    }
}
exports.CdkWorkshopStack = CdkWorkshopStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RrLXdvcmtzaG9wLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2RrLXdvcmtzaG9wLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQThCO0FBQzlCLDhDQUErQztBQUMvQyxxQ0FBc0M7QUFDdEMsaURBQWtEO0FBQ2xELHFFQUFzRDtBQUN0RCw2Q0FBMEM7QUFFMUMsTUFBYSxnQkFBaUIsU0FBUSxHQUFHLENBQUMsS0FBSztJQUM3QyxZQUFZLEtBQWMsRUFBRSxFQUFVLEVBQUUsS0FBc0I7UUFDNUQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsd0JBQXdCO1FBQ3hCLE1BQU0sS0FBSyxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsY0FBYyxFQUFFO1lBQ3RELE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDbkMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBQzlELE9BQU8sRUFBRSxlQUFlO1NBQ3pCLENBQUMsQ0FBQztRQUVILHdCQUF3QjtRQUN4QixNQUFNLGdCQUFnQixHQUFHLElBQUksdUJBQVUsQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLEVBQUU7WUFDL0QsVUFBVSxFQUFFLEtBQUs7U0FDbEIsQ0FBQyxDQUFDO1FBRUgsY0FBYztRQUNkLElBQUksS0FBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFO1lBQ3hDLE9BQU8sRUFBRSxnQkFBZ0IsQ0FBQyxPQUFPO1NBQ2xDLENBQUMsQ0FBQztRQUVILGVBQWU7UUFDZixJQUFJLHFDQUFXLENBQUMsSUFBSSxFQUFFLHdCQUF3QixFQUFFO1lBQzlDLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxLQUFLO1lBQzdCLEtBQUssRUFBRSxhQUFhO1lBQ3BCLE1BQU0sRUFBRSxPQUFPO1NBQ2hCLENBQUMsQ0FBQztJQUVMLENBQUM7Q0FDRjtBQTdCRCw0Q0E2QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbmltcG9ydCBsYW1iZGEgPSByZXF1aXJlKCdAYXdzLWNkay9hd3MtbGFtYmRhJyk7XG5pbXBvcnQgY2RrID0gcmVxdWlyZSgnQGF3cy1jZGsvY29yZScpO1xuaW1wb3J0IGFwaWd3ID0gcmVxdWlyZSgnQGF3cy1jZGsvYXdzLWFwaWdhdGV3YXknKTtcbmltcG9ydCB7IFRhYmxlVmlld2VyIH0gZnJvbSAnY2RrLWR5bmFtby10YWJsZS12aWV3ZXInO1xuaW1wb3J0IHsgSGl0Q291bnRlciB9IGZyb20gJy4vaGl0Y291bnRlcic7XG5cbmV4cG9ydCBjbGFzcyBDZGtXb3Jrc2hvcFN0YWNrIGV4dGVuZHMgY2RrLlN0YWNrIHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IGNkay5BcHAsIGlkOiBzdHJpbmcsIHByb3BzPzogY2RrLlN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgIC8vIFNpbXBsZSBcImhlbGxvXCIgbGFtYmRhXG4gICAgY29uc3QgaGVsbG8gPSBuZXcgbGFtYmRhLkZ1bmN0aW9uKHRoaXMsICdIZWxsb0hhbmRsZXInLCB7XG4gICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMTJfWCxcbiAgICAgIGNvZGU6IGxhbWJkYS5Db2RlLmZyb21Bc3NldChwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4vbGFtYmRhJykpLFxuICAgICAgaGFuZGxlcjogJ2hlbGxvLmhhbmRsZXInXG4gICAgfSk7XG5cbiAgICAvLyBIaXQgQ291bnRlciBDb25zdHJ1Y3RcbiAgICBjb25zdCBoZWxsb1dpdGhDb3VudGVyID0gbmV3IEhpdENvdW50ZXIodGhpcywgJ0hlbGxvSGl0Q291bnRlcicsIHtcbiAgICAgIGRvd25zdHJlYW06IGhlbGxvLFxuICAgIH0pO1xuXG4gICAgLy8gQVBJIEdhdGV3YXlcbiAgICBuZXcgYXBpZ3cuTGFtYmRhUmVzdEFwaSh0aGlzLCAnRW5kcG9pbnQnLCB7XG4gICAgICBoYW5kbGVyOiBoZWxsb1dpdGhDb3VudGVyLmhhbmRsZXIsXG4gICAgfSk7XG5cbiAgICAvLyBUYWJsZSBWaWV3ZXJcbiAgICBuZXcgVGFibGVWaWV3ZXIodGhpcywgJ0hpdENvdW50ZXIgVGFibGVWaWV3ZXInLCB7XG4gICAgICB0YWJsZTogaGVsbG9XaXRoQ291bnRlci50YWJsZSxcbiAgICAgIHRpdGxlOiAnSGl0IENvdW50ZXInLFxuICAgICAgc29ydEJ5OiAnLWhpdHMnLFxuICAgIH0pO1xuXG4gIH1cbn1cbiJdfQ==