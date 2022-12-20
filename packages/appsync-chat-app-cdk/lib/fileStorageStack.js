"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileStorageStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const s3 = require("aws-cdk-lib/aws-s3");
const iam = require("aws-cdk-lib/aws-iam");
class FileStorageStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const fileStorageBucket = new s3.Bucket(this, 's3-bucket', {
            removalPolicy: aws_cdk_lib_1.RemovalPolicy.DESTROY,
            autoDeleteObjects: true,
            cors: [
                {
                    allowedMethods: [
                        s3.HttpMethods.GET,
                        s3.HttpMethods.POST,
                        s3.HttpMethods.PUT,
                        s3.HttpMethods.DELETE,
                    ],
                    allowedOrigins: props.allowedOrigins,
                    allowedHeaders: ['*'],
                },
            ],
        });
        // allow guests read access to the bucket.
        // fileStorageBucket.addToResourcePolicy(
        // 	new iam.PolicyStatement({
        // 		effect: iam.Effect.ALLOW,
        // 		actions: ['s3:GetObject'],
        // 		principals: [new iam.AnyPrincipal()],
        // 		resources: [`arn:aws:s3:::${fileStorageBucket.bucketName}/public/*`],
        // 	})
        // )
        const mangedPolicyForAmplifyUnauth = new iam.ManagedPolicy(this, 'mangedPolicyForAmplifyUnauth', {
            description: 'managed policy to allow usage of Storage Library for unauth',
            statements: [
                new iam.PolicyStatement({
                    effect: iam.Effect.ALLOW,
                    actions: ['s3:GetObject'],
                    resources: [
                        `arn:aws:s3:::${fileStorageBucket.bucketName}/public/*`,
                    ],
                }),
                new iam.PolicyStatement({
                    effect: iam.Effect.ALLOW,
                    actions: ['s3:GetObject'],
                    resources: [
                        `arn:aws:s3:::${fileStorageBucket.bucketName}/protected/*`,
                    ],
                }),
                new iam.PolicyStatement({
                    effect: iam.Effect.ALLOW,
                    actions: ['s3:ListBucket'],
                    resources: [`arn:aws:s3:::${fileStorageBucket.bucketName}`],
                    conditions: {
                        StringLike: {
                            's3:prefix': [
                                'public/',
                                'public/*',
                                'protected/',
                                'protected/*',
                            ],
                        },
                    },
                }),
            ],
            roles: [props.unauthenticatedRole],
        });
        const mangedPolicyForAmplifyAuth = new iam.ManagedPolicy(this, 'mangedPolicyForAmplifyAuth', {
            description: 'managed Policy to allow usage of storage library for auth',
            statements: [
                new iam.PolicyStatement({
                    effect: iam.Effect.ALLOW,
                    actions: ['s3:PutObject', 's3:GetObject', 's3:DeleteObject'],
                    resources: [
                        `arn:aws:s3:::${fileStorageBucket.bucketName}/public/*`,
                    ],
                }),
                new iam.PolicyStatement({
                    effect: iam.Effect.ALLOW,
                    actions: ['s3:PutObject', 's3:GetObject', 's3:DeleteObject'],
                    resources: [
                        `arn:aws:s3:::${fileStorageBucket.bucketName}/protected/\${cognito-identity.amazonaws.com:sub}/*`,
                    ],
                }),
                new iam.PolicyStatement({
                    effect: iam.Effect.ALLOW,
                    actions: ['s3:PutObject', 's3:GetObject', 's3:DeleteObject'],
                    resources: [
                        `arn:aws:s3:::${fileStorageBucket.bucketName}/private/\${cognito-identity.amazonaws.com:sub}/*`,
                    ],
                }),
                new iam.PolicyStatement({
                    effect: iam.Effect.ALLOW,
                    actions: ['s3:GetObject'],
                    resources: [
                        `arn:aws:s3:::${fileStorageBucket.bucketName}/protected/*`,
                    ],
                }),
                new iam.PolicyStatement({
                    effect: iam.Effect.ALLOW,
                    actions: ['s3:ListBucket'],
                    resources: [`arn:aws:s3:::${fileStorageBucket.bucketName}`],
                    conditions: {
                        StringLike: {
                            's3:prefix': [
                                'public/',
                                'public/*',
                                'protected/',
                                'protected/*',
                                'private/${cognito-identity.amazonaws.com:sub}/',
                                'private/${cognito-identity.amazonaws.com:sub}/*',
                            ],
                        },
                    },
                }),
            ],
            roles: [props.authenticatedRole],
        });
        new aws_cdk_lib_1.CfnOutput(this, 'BucketName', {
            value: fileStorageBucket.bucketName,
        });
        new aws_cdk_lib_1.CfnOutput(this, 'BucketRegion', {
            value: this.region,
        });
    }
}
exports.FileStorageStack = FileStorageStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZVN0b3JhZ2VTdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGVTdG9yYWdlU3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkNBQXlFO0FBRXpFLHlDQUF3QztBQUN4QywyQ0FBMEM7QUFRMUMsTUFBYSxnQkFBaUIsU0FBUSxtQkFBSztJQUMxQyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQTRCO1FBQ3JFLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFBO1FBRXZCLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUU7WUFDMUQsYUFBYSxFQUFFLDJCQUFhLENBQUMsT0FBTztZQUNwQyxpQkFBaUIsRUFBRSxJQUFJO1lBQ3ZCLElBQUksRUFBRTtnQkFDTDtvQkFDQyxjQUFjLEVBQUU7d0JBQ2YsRUFBRSxDQUFDLFdBQVcsQ0FBQyxHQUFHO3dCQUNsQixFQUFFLENBQUMsV0FBVyxDQUFDLElBQUk7d0JBQ25CLEVBQUUsQ0FBQyxXQUFXLENBQUMsR0FBRzt3QkFDbEIsRUFBRSxDQUFDLFdBQVcsQ0FBQyxNQUFNO3FCQUNyQjtvQkFDRCxjQUFjLEVBQUUsS0FBSyxDQUFDLGNBQWM7b0JBQ3BDLGNBQWMsRUFBRSxDQUFDLEdBQUcsQ0FBQztpQkFDckI7YUFDRDtTQUNELENBQUMsQ0FBQTtRQUVGLDBDQUEwQztRQUMxQyx5Q0FBeUM7UUFDekMsNkJBQTZCO1FBQzdCLDhCQUE4QjtRQUM5QiwrQkFBK0I7UUFDL0IsMENBQTBDO1FBQzFDLDBFQUEwRTtRQUMxRSxNQUFNO1FBQ04sSUFBSTtRQUVKLE1BQU0sNEJBQTRCLEdBQUcsSUFBSSxHQUFHLENBQUMsYUFBYSxDQUN6RCxJQUFJLEVBQ0osOEJBQThCLEVBQzlCO1lBQ0MsV0FBVyxFQUNWLDZEQUE2RDtZQUM5RCxVQUFVLEVBQUU7Z0JBQ1gsSUFBSSxHQUFHLENBQUMs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Q1osYUFBYTtnQ0FDYixnREFBZ0Q7Z0NBQ2hELGlEQUFpRDs2QkFDakQ7eUJBQ0Q7cUJBQ0Q7aUJBQ0QsQ0FBQzthQUNGO1lBQ0QsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDO1NBQ2hDLENBQ0QsQ0FBQTtRQUVELElBQUksdUJBQVMsQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFO1lBQ2pDLEtBQUssRUFBRSxpQkFBaUIsQ0FBQyxVQUFVO1NBQ25DLENBQUMsQ0FBQTtRQUVGLElBQUksdUJBQVMsQ0FBQyxJQUFJLEVBQUUsY0FBYyxFQUFFO1lBQ25DLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTTtTQUNsQixDQUFDLENBQUE7SUFDSCxDQUFDO0NBQ0Q7QUF6SUQsNENBeUlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2ZuT3V0cHV0LCBSZW1vdmFsUG9saWN5LCBTdGFjaywgU3RhY2tQcm9wcyB9IGZyb20gJ2F3cy1jZGstbGliJ1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cydcbmltcG9ydCAqIGFzIHMzIGZyb20gJ2F3cy1jZGstbGliL2F3cy1zMydcbmltcG9ydCAqIGFzIGlhbSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtaWFtJ1xuXG5pbnRlcmZhY2UgRmlsZVN0b3JhZ2VTdGFja1Byb3BzIGV4dGVuZHMgU3RhY2tQcm9wcyB7XG5cdGF1dGhlbnRpY2F0ZWRSb2xlOiBpYW0uSVJvbGVcblx0dW5hdXRoZW50aWNhdGVkUm9sZTogaWFtLklSb2xlXG5cdGFsbG93ZWRPcmlnaW5zOiBzdHJpbmdbXVxufVxuXG5leHBvcnQgY2xhc3MgRmlsZVN0b3JhZ2VTdGFjayBleHRlbmRzIFN0YWNrIHtcblx0Y29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM6IEZpbGVTdG9yYWdlU3RhY2tQcm9wcykge1xuXHRcdHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpXG5cblx0XHRjb25zdCBmaWxlU3RvcmFnZUJ1Y2tldCA9IG5ldyBzMy5CdWNrZXQodGhpcywgJ3MzLWJ1Y2tldCcsIHtcblx0XHRcdHJlbW92YWxQb2xpY3k6IFJlbW92YWxQb2xpY3kuREVTVFJPWSxcblx0XHRcdGF1dG9EZWxldGVPYmplY3RzOiB0cnVlLFxuXHRcdFx0Y29yczogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0YWxsb3dlZE1ldGhvZHM6IFtcblx0XHRcdFx0XHRcdHMzLkh0dHBNZXRob2RzLkdFVCxcblx0XHRcdFx0XHRcdHMzLkh0dHBNZXRob2RzLlBPU1QsXG5cdFx0XHRcdFx0XHRzMy5IdHRwTWV0aG9kcy5QVVQsXG5cdFx0XHRcdFx0XHRzMy5IdHRwTWV0aG9kcy5ERUxFVEUsXG5cdFx0XHRcdFx0XSxcblx0XHRcdFx0XHRhbGxvd2VkT3JpZ2luczogcHJvcHMuYWxsb3dlZE9yaWdpbnMsXG5cdFx0XHRcdFx0YWxsb3dlZEhlYWRlcnM6IFsnKiddLFxuXHRcdFx0XHR9LFxuXHRcdFx0XSxcblx0XHR9KVxuXG5cdFx0Ly8gYWxsb3cgZ3Vlc3RzIHJlYWQgYWNjZXNzIHRvIHRoZSBidWNrZXQuXG5cdFx0Ly8gZmlsZVN0b3JhZ2VCdWNrZXQuYWRkVG9SZXNvdXJjZVBvbGljeShcblx0XHQvLyBcdG5ldyBpYW0uUG9saWN5U3RhdGVtZW50KHtcblx0XHQvLyBcdFx0ZWZmZWN0OiBpYW0uRWZmZWN0LkFMTE9XLFxuXHRcdC8vIFx0XHRhY3Rpb25zOiBbJ3MzOkdldE9iamVjdCddLFxuXHRcdC8vIFx0XHRwcmluY2lwYWxzOiBbbmV3IGlhbS5BbnlQcmluY2lwYWwoKV0sXG5cdFx0Ly8gXHRcdHJlc291cmNlczogW2Bhcm46YXdzOnMzOjo6JHtmaWxlU3RvcmFnZUJ1Y2tldC5idWNrZXROYW1lfS9wdWJsaWMvKmBdLFxuXHRcdC8vIFx0fSlcblx0XHQvLyApXG5cblx0XHRjb25zdCBtYW5nZWRQb2xpY3lGb3JBbXBsaWZ5VW5hdXRoID0gbmV3IGlhbS5NYW5hZ2VkUG9saWN5KFxuXHRcdFx0dGhpcyxcblx0XHRcdCdtYW5nZWRQb2xpY3lGb3JBbXBsaWZ5VW5hdXRoJyxcblx0XHRcdHtcblx0XHRcdFx0ZGVzY3JpcHRpb246XG5cdFx0XHRcdFx0J21hbmFnZWQgcG9saWN5IHRvIGFsbG93IHVzYWdlIG9mIFN0b3JhZ2UgTGlicmFyeSBmb3IgdW5hdXRoJyxcblx0XHRcdFx0c3RhdGVtZW50czogW1xuXHRcdFx0XHRcdG5ldyBpYW0uUG9saWN5U3RhdGVtZW50KHtcblx0XHRcdFx0XHRcdGVmZmVjdDogaWFtLkVmZmVjdC5BTExPVyxcblx0XHRcdFx0XHRcdGFjdGlvbnM6IFsnczM6R2V0T2JqZWN0J10sXG5cdFx0XHRcdFx0XHRyZXNvdXJjZXM6IFtcblx0XHRcdFx0XHRcdFx0YGFybjphd3M6czM6Ojoke2ZpbGVTdG9yYWdlQnVja2V0LmJ1Y2tldE5hbWV9L3B1YmxpYy8qYCxcblx0XHRcdFx0XHRcdF0sXG5cdFx0XHRcdFx0fSksXG5cdFx0XHRcdFx0bmV3IGlhbS5Qb2xpY3lTdGF0ZW1lbnQoe1xuXHRcdFx0XHRcdFx0ZWZmZWN0OiBpYW0uRWZmZWN0LkFMTE9XLFxuXHRcdFx0XHRcdFx0YWN0aW9uczogWydzMzpHZXRPYmplY3QnXSxcblx0XHRcdFx0XHRcdHJlc291cmNlczogW1xuXHRcdFx0XHRcdFx0XHRgYXJuOmF3czpzMzo6OiR7ZmlsZVN0b3JhZ2VCdWNrZXQuYnVja2V0TmFtZX0vcHJvdGVjdGVkLypgLFxuXHRcdFx0XHRcdFx0XSxcblx0XHRcdFx0XHR9KSxcblx0XHRcdFx0XHRuZXcgaWFtLlBvbGljeVN0YXRlbWVudCh7XG5cdFx0XHRcdFx0XHRlZmZlY3Q6IGlhbS5FZmZlY3QuQUxMT1csXG5cdFx0XHRcdFx0XHRhY3Rpb25zOiBbJ3MzOkxpc3RCdWNrZXQnXSxcblx0XHRcdFx0XHRcdHJlc291cmNlczogW2Bhcm46YXdzOnMzOjo6JHtmaWxlU3RvcmFnZUJ1Y2tldC5idWNrZXROYW1lfWBdLFxuXHRcdFx0XHRcdFx0Y29uZGl0aW9uczoge1xuXHRcdFx0XHRcdFx0XHRTdHJpbmdMaWtlOiB7XG5cdFx0XHRcdFx0XHRcdFx0J3MzOnByZWZpeCc6IFtcblx0XHRcdFx0XHRcdFx0XHRcdCdwdWJsaWMvJyxcblx0XHRcdFx0XHRcdFx0XHRcdCdwdWJsaWMvKicsXG5cdFx0XHRcdFx0XHRcdFx0XHQncHJvdGVjdGVkLycsXG5cdFx0XHRcdFx0XHRcdFx0XHQncHJvdGVjdGVkLyonLFxuXHRcdFx0XHRcdFx0XHRcdF0sXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdH0pLFxuXHRcdFx0XHRdLFxuXHRcdFx0XHRyb2xlczogW3Byb3BzLnVuYXV0aGVudGljYXRlZFJvbGVdLFxuXHRcdFx0fVxuXHRcdClcblxuXHRcdGNvbnN0IG1hbmdlZFBvbGljeUZvckFtcGxpZnlBdXRoID0gbmV3IGlhbS5NYW5hZ2VkUG9saWN5KFxuXHRcdFx0dGhpcyxcblx0XHRcdCdtYW5nZWRQb2xpY3lGb3JBbXBsaWZ5QXV0aCcsXG5cdFx0XHR7XG5cdFx0XHRcdGRlc2NyaXB0aW9uOlxuXHRcdFx0XHRcdCdtYW5hZ2VkIFBvbGljeSB0byBhbGxvdyB1c2FnZSBvZiBzdG9yYWdlIGxpYnJhcnkgZm9yIGF1dGgnLFxuXHRcdFx0XHRzdGF0ZW1lbnRzOiBbXG5cdFx0XHRcdFx0bmV3IGlhbS5Qb2xpY3lTdGF0ZW1lbnQoe1xuXHRcdFx0XHRcdFx0ZWZmZWN0OiBpYW0uRWZmZWN0LkFMTE9XLFxuXHRcdFx0XHRcdFx0YWN0aW9uczogWydzMzpQdXRPYmplY3QnLCAnczM6R2V0T2JqZWN0JywgJ3MzOkRlbGV0ZU9iamVjdCddLFxuXHRcdFx0XHRcdFx0cmVzb3VyY2VzOiBbXG5cdFx0XHRcdFx0XHRcdGBhcm46YXdzOnMzOjo6JHtmaWxlU3RvcmFnZUJ1Y2tldC5idWNrZXROYW1lfS9wdWJsaWMvKmAsXG5cdFx0XHRcdFx0XHRdLFxuXHRcdFx0XHRcdH0pLFxuXHRcdFx0XHRcdG5ldyBpYW0uUG9saWN5U3RhdGVtZW50KHtcblx0XHRcdFx0XHRcdGVmZmVjdDogaWFtLkVmZmVjdC5BTExPVyxcblx0XHRcdFx0XHRcdGFjdGlvbnM6IFsnczM6UHV0T2JqZWN0JywgJ3MzOkdldE9iamVjdCcsICdzMzpEZWxldGVPYmplY3QnXSxcblx0XHRcdFx0XHRcdHJlc291cmNlczogW1xuXHRcdFx0XHRcdFx0XHRgYXJuOmF3czpzMzo6OiR7ZmlsZVN0b3JhZ2VCdWNrZXQuYnVja2V0TmFtZX0vcHJvdGVjdGVkL1xcJHtjb2duaXRvLWlkZW50aXR5LmFtYXpvbmF3cy5jb206c3VifS8qYCxcblx0XHRcdFx0XHRcdF0sXG5cdFx0XHRcdFx0fSksXG5cdFx0XHRcdFx0bmV3IGlhbS5Qb2xpY3lTdGF0ZW1lbnQoe1xuXHRcdFx0XHRcdFx0ZWZmZWN0OiBpYW0uRWZmZWN0LkFMTE9XLFxuXHRcdFx0XHRcdFx0YWN0aW9uczogWydzMzpQdXRPYmplY3QnLCAnczM6R2V0T2JqZWN0JywgJ3MzOkRlbGV0ZU9iamVjdCddLFxuXHRcdFx0XHRcdFx0cmVzb3VyY2VzOiBbXG5cdFx0XHRcdFx0XHRcdGBhcm46YXdzOnMzOjo6JHtmaWxlU3RvcmFnZUJ1Y2tldC5idWNrZXROYW1lfS9wcml2YXRlL1xcJHtjb2duaXRvLWlkZW50aXR5LmFtYXpvbmF3cy5jb206c3VifS8qYCxcblx0XHRcdFx0XHRcdF0sXG5cdFx0XHRcdFx0fSksXG5cdFx0XHRcdFx0bmV3IGlhbS5Qb2xpY3lTdGF0ZW1lbnQoe1xuXHRcdFx0XHRcdFx0ZWZmZWN0OiBpYW0uRWZmZWN0LkFMTE9XLFxuXHRcdFx0XHRcdFx0YWN0aW9uczogWydzMzpHZXRPYmplY3QnXSxcblx0XHRcdFx0XHRcdHJlc291cmNlczogW1xuXHRcdFx0XHRcdFx0XHRgYXJuOmF3czpzMzo6OiR7ZmlsZVN0b3JhZ2VCdWNrZXQuYnVja2V0TmFtZX0vcHJvdGVjdGVkLypgLFxuXHRcdFx0XHRcdFx0XSxcblx0XHRcdFx0XHR9KSxcblx0XHRcdFx0XHRuZXcgaWFtLlBvbGljeVN0YXRlbWVudCh7XG5cdFx0XHRcdFx0XHRlZmZlY3Q6IGlhbS5FZmZlY3QuQUxMT1csXG5cdFx0XHRcdFx0XHRhY3Rpb25zOiBbJ3MzOkxpc3RCdWNrZXQnXSxcblx0XHRcdFx0XHRcdHJlc291cmNlczogW2Bhcm46YXdzOnMzOjo6JHtmaWxlU3RvcmFnZUJ1Y2tldC5idWNrZXROYW1lfWBdLFxuXHRcdFx0XHRcdFx0Y29uZGl0aW9uczoge1xuXHRcdFx0XHRcdFx0XHRTdHJpbmdMaWtlOiB7XG5cdFx0XHRcdFx0XHRcdFx0J3MzOnByZWZpeCc6IFtcblx0XHRcdFx0XHRcdFx0XHRcdCdwdWJsaWMvJyxcblx0XHRcdFx0XHRcdFx0XHRcdCdwdWJsaWMvKicsXG5cdFx0XHRcdFx0XHRcdFx0XHQncHJvdGVjdGVkLycsXG5cdFx0XHRcdFx0XHRcdFx0XHQncHJvdGVjdGVkLyonLFxuXHRcdFx0XHRcdFx0XHRcdFx0J3ByaXZhdGUvJHtjb2duaXRvLWlkZW50aXR5LmFtYXpvbmF3cy5jb206c3VifS8nLFxuXHRcdFx0XHRcdFx0XHRcdFx0J3ByaXZhdGUvJHtjb2duaXRvLWlkZW50aXR5LmFtYXpvbmF3cy5jb206c3VifS8qJyxcblx0XHRcdFx0XHRcdFx0XHRdLFxuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR9KSxcblx0XHRcdFx0XSxcblx0XHRcdFx0cm9sZXM6IFtwcm9wcy5hdXRoZW50aWNhdGVkUm9sZV0sXG5cdFx0XHR9XG5cdFx0KVxuXG5cdFx0bmV3IENmbk91dHB1dCh0aGlzLCAnQnVja2V0TmFtZScsIHtcblx0XHRcdHZhbHVlOiBmaWxlU3RvcmFnZUJ1Y2tldC5idWNrZXROYW1lLFxuXHRcdH0pXG5cblx0XHRuZXcgQ2ZuT3V0cHV0KHRoaXMsICdCdWNrZXRSZWdpb24nLCB7XG5cdFx0XHR2YWx1ZTogdGhpcy5yZWdpb24sXG5cdFx0fSlcblx0fVxufVxuIl19