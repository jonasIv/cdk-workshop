#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cdk = require("@aws-cdk/core");
const cdk_workshop_stack_1 = require("../lib/cdk-workshop-stack");
const app = new cdk.App();
new cdk_workshop_stack_1.CdkWorkshopStack(app, 'CdkWorkshopStack', {
    env: {
        region: 'eu-west-1',
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RrLXdvcmtzaG9wLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2RrLXdvcmtzaG9wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHFDQUFzQztBQUN0QyxrRUFBNkQ7QUFFN0QsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDMUIsSUFBSSxxQ0FBZ0IsQ0FBQyxHQUFHLEVBQUUsa0JBQWtCLEVBQUU7SUFDNUMsR0FBRyxFQUFFO1FBQ0gsTUFBTSxFQUFFLFdBQVc7S0FDcEI7Q0FDRixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIjIS91c3IvYmluL2VudiBub2RlXG5pbXBvcnQgY2RrID0gcmVxdWlyZSgnQGF3cy1jZGsvY29yZScpO1xuaW1wb3J0IHsgQ2RrV29ya3Nob3BTdGFjayB9IGZyb20gJy4uL2xpYi9jZGstd29ya3Nob3Atc3RhY2snO1xuXG5jb25zdCBhcHAgPSBuZXcgY2RrLkFwcCgpO1xubmV3IENka1dvcmtzaG9wU3RhY2soYXBwLCAnQ2RrV29ya3Nob3BTdGFjaycsIHtcbiAgZW52OiB7XG4gICAgcmVnaW9uOiAnZXUtd2VzdC0xJyxcbiAgfSxcbn0pO1xuIl19