"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_cognito_1 = require("aws-cdk-lib/aws-cognito");
const aws_cognito_identitypool_alpha_1 = require("@aws-cdk/aws-cognito-identitypool-alpha");
const aws_lambda_1 = require("aws-cdk-lib/aws-lambda");
const path = require("path");
class AuthStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        var _a;
        super(scope, id, props);
        const addUserFunc = new aws_lambda_1.Function(this, 'postConfirmTriggerFunc', {
            runtime: aws_lambda_1.Runtime.NODEJS_16_X,
            handler: 'addUserToDB.main',
            code: aws_lambda_1.Code.fromAsset(path.join(__dirname, 'functions/postConfirmTrigger')),
            environment: {
                TABLENAME: props.userTable.tableName,
            },
        });
        const userPool = new aws_cognito_1.UserPool(this, `${props.userpoolConstructName}`, {
            selfSignUpEnabled: true,
            removalPolicy: aws_cdk_lib_1.RemovalPolicy.DESTROY,
            accountRecovery: aws_cognito_1.AccountRecovery.PHONE_AND_EMAIL,
            userVerification: {
                emailStyle: aws_cognito_1.VerificationEmailStyle.CODE,
            },
            autoVerify: {
                email: true,
            },
            standardAttributes: {
                email: {
                    required: true,
                    mutable: true,
                },
                givenName: {
                    required: true,
                    mutable: true,
                },
                familyName: {
                    required: true,
                    mutable: true,
                },
            },
            lambdaTriggers: {
                postConfirmation: addUserFunc,
            },
        });
        props.userTable.grantWriteData(addUserFunc);
        if (props.hasCognitoGroups) {
            (_a = props.groupNames) === null || _a === void 0 ? void 0 : _a.forEach((groupName) => new aws_cognito_1.CfnUserPoolGroup(this, `${props.userpoolConstructName}${groupName}Group`, {
                userPoolId: userPool.userPoolId,
                groupName: groupName,
            }));
        }
        const userPoolClient = new aws_cognito_1.UserPoolClient(this, `${props.userpoolConstructName}Client`, {
            userPool,
        });
        const identityPool = new aws_cognito_identitypool_alpha_1.IdentityPool(this, props.identitypoolConstructName, {
            identityPoolName: props.identitypoolConstructName,
            allowUnauthenticatedIdentities: true,
            authenticationProviders: {
                userPools: [
                    new aws_cognito_identitypool_alpha_1.UserPoolAuthenticationProvider({ userPool, userPoolClient }),
                ],
            },
        });
        this.authenticatedRole = identityPool.authenticatedRole;
        this.unauthenticatedRole = identityPool.unauthenticatedRole;
        this.userpool = userPool;
        this.identityPoolId = new aws_cdk_lib_1.CfnOutput(this, 'IdentityPoolId', {
            value: identityPool.identityPoolId,
        });
        new aws_cdk_lib_1.CfnOutput(this, 'UserPoolId', {
            value: userPool.userPoolId,
        });
        new aws_cdk_lib_1.CfnOutput(this, 'UserPoolClientId', {
            value: userPoolClient.userPoolClientId,
        });
    }
}
exports.AuthStack = AuthStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aFN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXV0aFN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZDQU1vQjtBQUNwQix5REFPZ0M7QUFFaEMsNEZBR2dEO0FBRWhELHVEQUEyRTtBQUMzRSw2QkFBNEI7QUFZNUIsTUFBYSxTQUFVLFNBQVEsbUJBQUs7SUFNbkMsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFxQjs7UUFDOUQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUE7UUFFdkIsTUFBTSxXQUFXLEdBQUcsSUFBSSxxQkFBUSxDQUFDLElBQUksRUFBRSx3QkFBd0IsRUFBRTtZQUNoRSxPQUFPLEVBQUUsb0JBQU8sQ0FBQyxXQUFXO1lBQzVCLE9BQU8sRUFBRSxrQkFBa0I7WUFDM0IsSUFBSSxFQUFFLGlCQUFJLENBQUMsU0FBUyxDQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSw4QkFBOEIsQ0FBQyxDQUNwRDtZQUNELFdBQVcsRUFBRTtnQkFDWixTQUFTLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxTQUFTO2FBQ3BDO1NBQ0QsQ0FBQyxDQUFBO1FBRUYsTUFBTSxRQUFRLEdBQUcsSUFBSSxzQkFBUSxDQUFDLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQyxxQkFBcUIsRUFBRSxFQUFFO1lBQ3JFLGlCQUFpQixFQUFFLElBQUk7WUFDdkIsYUFBYSxFQUFFLDJCQUFhLENBQUMsT0FBTztZQUNwQyxlQUFlLEVBQUUsNkJBQWUsQ0FBQyxlQUFlO1lBQ2hELGdCQUFnQixFQUFFO2dCQUNqQixVQUFVLEVBQUUsb0NBQXNCLENBQUMsSUFBSTthQUN2QztZQUNELFVBQVUsRUFBRTtnQkFDWCxLQUFLLEVBQUUsSUFBSTthQUNYO1lBQ0Qsa0JBQWtCLEVBQUU7Z0JBQ25CLEtBQUssRUFBRTtvQkFDTixRQUFRLEVBQUUsSUFBSTtvQkFDZCxPQUFPLEVBQUUsSUFBSTtpQkFDYjtnQkFDRCxTQUFTLEVBQUU7b0JBQ1YsUUFBUSxFQUFFLElBQUk7b0JBQ2QsT0FBTyxFQUFFLElBQUk7aUJBQ2I7Z0JBQ0QsVUFBVSxFQUFFO29CQUNYLFFBQVEsRUFBRSxJQUFJO29CQUNkLE9BQU8sRUFBRSxJQUFJO2lCQUNiO2FBQ0Q7WUFDRCxjQUFjLEVBQUU7Z0JBQ2YsZ0JBQWdCLEVBQUUsV0FBVzthQUM3QjtTQUNELENBQUMsQ0FBQTtRQUVGLEtBQUssQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBRTNDLElBQUksS0FBSyxDQUFDLGdCQUFnQixFQUFFO1lBQzNCLE1BQUEsS0FBSyxDQUFDLFVBQVUsMENBQUUsT0FBTyxDQUN4QixDQUFDLFNBQVMsRUFBRSxFQUFFLENBQ2IsSUFBSSw4QkFBZ0IsQ0FDbkIsSUFBSSxFQUNKLEdBQUcsS0FBSyxDQUFDLHFCQUFxQixHQUFHLFNBQVMsT0FBTyxFQUNqRDtnQkFDQyxVQUFVLEVBQUUsUUFBUSxDQUFDLFVBQVU7Z0JBQy9CLFNBQVMsRUFBRSxTQUFTO2FBQ3BCLENBQ0QsRUFDRjtTQUNEO1FBRUQsTUFBTSxjQUFjLEdBQUcsSUFBSSw0QkFBYyxDQUN4QyxJQUFJLEVBQ0osR0FBRyxLQUFLLENBQUMscUJBQXFCLFFBQVEsRUFDdEM7WUFDQyxRQUFRO1NBQ1IsQ0FDRCxDQUFBO1FBRUQsTUFBTSxZQUFZLEdBQUcsSUFBSSw2Q0FBWSxDQUNwQyxJQUFJLEVBQ0osS0FBSyxDQUFDLHlCQUF5QixFQUMvQjtZQUNDLGdCQUFnQixFQUFFLEtBQUssQ0FBQyx5QkFBeUI7WUFDakQsOEJBQThCLEVBQUUsSUFBSTtZQUNwQyx1QkFBdUIsRUFBRTtnQkFDeEIsU0FBUyxFQUFFO29CQUNWLElBQUksK0RBQThCLENBQUMsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFLENBQUM7aUJBQ2hFO2FBQ0Q7U0FDRCxDQUNELENBQUE7UUFFRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsWUFBWSxDQUFDLGlCQUFpQixDQUFBO1FBQ3ZELElBQUksQ0FBQyxtQkFBbUIsR0FBRyxZQUFZLENBQUMsbUJBQW1CLENBQUE7UUFDM0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUE7UUFFeEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLHVCQUFTLENBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFFO1lBQzNELEtBQUssRUFBRSxZQUFZLENBQUMsY0FBYztTQUNsQyxDQUFDLENBQUE7UUFFRixJQUFJLHVCQUFTLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRTtZQUNqQyxLQUFLLEVBQUUsUUFBUSxDQUFDLFVBQVU7U0FDMUIsQ0FBQyxDQUFBO1FBRUYsSUFBSSx1QkFBUyxDQUFDLElBQUksRUFBRSxrQkFBa0IsRUFBRTtZQUN2QyxLQUFLLEVBQUUsY0FBYyxDQUFDLGdCQUFnQjtTQUN0QyxDQUFDLENBQUE7SUFDSCxDQUFDO0NBQ0Q7QUF2R0QsOEJBdUdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcblx0Q2ZuT3V0cHV0LFxuXHRFeHBpcmF0aW9uLFxuXHRSZW1vdmFsUG9saWN5LFxuXHRTdGFjayxcblx0U3RhY2tQcm9wcyxcbn0gZnJvbSAnYXdzLWNkay1saWInXG5pbXBvcnQge1xuXHRBY2NvdW50UmVjb3ZlcnksXG5cdENmblVzZXJQb29sR3JvdXAsXG5cdFVzZXJQb29sLFxuXHRVc2VyUG9vbENsaWVudCxcblx0VXNlclBvb2xPcGVyYXRpb24sXG5cdFZlcmlmaWNhdGlvbkVtYWlsU3R5bGUsXG59IGZyb20gJ2F3cy1jZGstbGliL2F3cy1jb2duaXRvJ1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cydcbmltcG9ydCB7XG5cdElkZW50aXR5UG9vbCxcblx0VXNlclBvb2xBdXRoZW50aWNhdGlvblByb3ZpZGVyLFxufSBmcm9tICdAYXdzLWNkay9hd3MtY29nbml0by1pZGVudGl0eXBvb2wtYWxwaGEnXG5pbXBvcnQgeyBJUm9sZSB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1pYW0nXG5pbXBvcnQgeyBDb2RlLCBJRnVuY3Rpb24sIFJ1bnRpbWUsIEZ1bmN0aW9uIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWxhbWJkYSdcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCB7IFRhYmxlIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWR5bmFtb2RiJ1xuXG5pbnRlcmZhY2UgQXV0aFN0YWNrUHJvcHMgZXh0ZW5kcyBTdGFja1Byb3BzIHtcblx0cmVhZG9ubHkgc3RhZ2U6IHN0cmluZ1xuXHRyZWFkb25seSB1c2VycG9vbENvbnN0cnVjdE5hbWU6IHN0cmluZ1xuXHRyZWFkb25seSBoYXNDb2duaXRvR3JvdXBzOiBib29sZWFuXG5cdHJlYWRvbmx5IGdyb3VwTmFtZXM/OiBzdHJpbmdbXVxuXHRyZWFkb25seSBpZGVudGl0eXBvb2xDb25zdHJ1Y3ROYW1lOiBzdHJpbmdcblx0cmVhZG9ubHkgdXNlclRhYmxlOiBUYWJsZVxufVxuXG5leHBvcnQgY2xhc3MgQXV0aFN0YWNrIGV4dGVuZHMgU3RhY2sge1xuXHRwdWJsaWMgcmVhZG9ubHkgaWRlbnRpdHlQb29sSWQ6IENmbk91dHB1dFxuXHRwdWJsaWMgcmVhZG9ubHkgYXV0aGVudGljYXRlZFJvbGU6IElSb2xlXG5cdHB1YmxpYyByZWFkb25seSB1bmF1dGhlbnRpY2F0ZWRSb2xlOiBJUm9sZVxuXHRwdWJsaWMgcmVhZG9ubHkgdXNlcnBvb2w6IFVzZXJQb29sXG5cblx0Y29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM6IEF1dGhTdGFja1Byb3BzKSB7XG5cdFx0c3VwZXIoc2NvcGUsIGlkLCBwcm9wcylcblxuXHRcdGNvbnN0IGFkZFVzZXJGdW5jID0gbmV3IEZ1bmN0aW9uKHRoaXMsICdwb3N0Q29uZmlybVRyaWdnZXJGdW5jJywge1xuXHRcdFx0cnVudGltZTogUnVudGltZS5OT0RFSlNfMTZfWCxcblx0XHRcdGhhbmRsZXI6ICdhZGRVc2VyVG9EQi5tYWluJyxcblx0XHRcdGNvZGU6IENvZGUuZnJvbUFzc2V0KFxuXHRcdFx0XHRwYXRoLmpvaW4oX19kaXJuYW1lLCAnZnVuY3Rpb25zL3Bvc3RDb25maXJtVHJpZ2dlcicpXG5cdFx0XHQpLFxuXHRcdFx0ZW52aXJvbm1lbnQ6IHtcblx0XHRcdFx0VEFCTEVOQU1FOiBwcm9wcy51c2VyVGFibGUudGFibGVOYW1lLFxuXHRcdFx0fSxcblx0XHR9KVxuXG5cdFx0Y29uc3QgdXNlclBvb2wgPSBuZXcgVXNlclBvb2wodGhpcywgYCR7cHJvcHMudXNlcnBvb2xDb25zdHJ1Y3ROYW1lfWAsIHtcblx0XHRcdHNlbGZTaWduVXBFbmFibGVkOiB0cnVlLFxuXHRcdFx0cmVtb3ZhbFBvbGljeTogUmVtb3ZhbFBvbGljeS5ERVNUUk9ZLFxuXHRcdFx0YWNjb3VudFJlY292ZXJ5OiBBY2NvdW50UmVjb3ZlcnkuUEhPTkVfQU5EX0VNQUlMLFxuXHRcdFx0dXNlclZlcmlmaWNhdGlvbjoge1xuXHRcdFx0XHRlbWFpbFN0eWxlOiBWZXJpZmljYXRpb25FbWFpbFN0eWxlLkNPREUsXG5cdFx0XHR9LFxuXHRcdFx0YXV0b1ZlcmlmeToge1xuXHRcdFx0XHRlbWFpbDogdHJ1ZSxcblx0XHRcdH0sXG5cdFx0XHRzdGFuZGFyZEF0dHJpYnV0ZXM6IHtcblx0XHRcdFx0ZW1haWw6IHtcblx0XHRcdFx0XHRyZXF1aXJlZDogdHJ1ZSxcblx0XHRcdFx0XHRtdXRhYmxlOiB0cnVlLFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRnaXZlbk5hbWU6IHtcblx0XHRcdFx0XHRyZXF1aXJlZDogdHJ1ZSxcblx0XHRcdFx0XHRtdXRhYmxlOiB0cnVlLFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRmYW1pbHlOYW1lOiB7XG5cdFx0XHRcdFx0cmVxdWlyZWQ6IHRydWUsXG5cdFx0XHRcdFx0bXV0YWJsZTogdHJ1ZSxcblx0XHRcdFx0fSxcblx0XHRcdH0sXG5cdFx0XHRsYW1iZGFUcmlnZ2Vyczoge1xuXHRcdFx0XHRwb3N0Q29uZmlybWF0aW9uOiBhZGRVc2VyRnVuYyxcblx0XHRcdH0sXG5cdFx0fSlcblxuXHRcdHByb3BzLnVzZXJUYWJsZS5ncmFudFdyaXRlRGF0YShhZGRVc2VyRnVuYylcblxuXHRcdGlmIChwcm9wcy5oYXNDb2duaXRvR3JvdXBzKSB7XG5cdFx0XHRwcm9wcy5ncm91cE5hbWVzPy5mb3JFYWNoKFxuXHRcdFx0XHQoZ3JvdXBOYW1lKSA9PlxuXHRcdFx0XHRcdG5ldyBDZm5Vc2VyUG9vbEdyb3VwKFxuXHRcdFx0XHRcdFx0dGhpcyxcblx0XHRcdFx0XHRcdGAke3Byb3BzLnVzZXJwb29sQ29uc3RydWN0TmFtZX0ke2dyb3VwTmFtZX1Hcm91cGAsXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHVzZXJQb29sSWQ6IHVzZXJQb29sLnVzZXJQb29sSWQsXG5cdFx0XHRcdFx0XHRcdGdyb3VwTmFtZTogZ3JvdXBOYW1lLFxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdClcblx0XHRcdClcblx0XHR9XG5cblx0XHRjb25zdCB1c2VyUG9vbENsaWVudCA9IG5ldyBVc2VyUG9vbENsaWVudChcblx0XHRcdHRoaXMsXG5cdFx0XHRgJHtwcm9wcy51c2VycG9vbENvbnN0cnVjdE5hbWV9Q2xpZW50YCxcblx0XHRcdHtcblx0XHRcdFx0dXNlclBvb2wsXG5cdFx0XHR9XG5cdFx0KVxuXG5cdFx0Y29uc3QgaWRlbnRpdHlQb29sID0gbmV3IElkZW50aXR5UG9vbChcblx0XHRcdHRoaXMsXG5cdFx0XHRwcm9wcy5pZGVudGl0eXBvb2xDb25zdHJ1Y3ROYW1lLFxuXHRcdFx0e1xuXHRcdFx0XHRpZGVudGl0eVBvb2xOYW1lOiBwcm9wcy5pZGVudGl0eXBvb2xDb25zdHJ1Y3ROYW1lLFxuXHRcdFx0XHRhbGxvd1VuYXV0aGVudGljYXRlZElkZW50aXRpZXM6IHRydWUsXG5cdFx0XHRcdGF1dGhlbnRpY2F0aW9uUHJvdmlkZXJzOiB7XG5cdFx0XHRcdFx0dXNlclBvb2xzOiBbXG5cdFx0XHRcdFx0XHRuZXcgVXNlclBvb2xBdXRoZW50aWNhdGlvblByb3ZpZGVyKHsgdXNlclBvb2wsIHVzZXJQb29sQ2xpZW50IH0pLFxuXHRcdFx0XHRcdF0sXG5cdFx0XHRcdH0sXG5cdFx0XHR9XG5cdFx0KVxuXG5cdFx0dGhpcy5hdXRoZW50aWNhdGVkUm9sZSA9IGlkZW50aXR5UG9vbC5hdXRoZW50aWNhdGVkUm9sZVxuXHRcdHRoaXMudW5hdXRoZW50aWNhdGVkUm9sZSA9IGlkZW50aXR5UG9vbC51bmF1dGhlbnRpY2F0ZWRSb2xlXG5cdFx0dGhpcy51c2VycG9vbCA9IHVzZXJQb29sXG5cblx0XHR0aGlzLmlkZW50aXR5UG9vbElkID0gbmV3IENmbk91dHB1dCh0aGlzLCAnSWRlbnRpdHlQb29sSWQnLCB7XG5cdFx0XHR2YWx1ZTogaWRlbnRpdHlQb29sLmlkZW50aXR5UG9vbElkLFxuXHRcdH0pXG5cblx0XHRuZXcgQ2ZuT3V0cHV0KHRoaXMsICdVc2VyUG9vbElkJywge1xuXHRcdFx0dmFsdWU6IHVzZXJQb29sLnVzZXJQb29sSWQsXG5cdFx0fSlcblxuXHRcdG5ldyBDZm5PdXRwdXQodGhpcywgJ1VzZXJQb29sQ2xpZW50SWQnLCB7XG5cdFx0XHR2YWx1ZTogdXNlclBvb2xDbGllbnQudXNlclBvb2xDbGllbnRJZCxcblx0XHR9KVxuXHR9XG59XG4iXX0=