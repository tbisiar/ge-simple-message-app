"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const path = require("path");
const aws_appsync_alpha_1 = require("@aws-cdk/aws-appsync-alpha");
class APIStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const api = new aws_appsync_alpha_1.GraphqlApi(this, 'ChatApp', {
            name: 'ChatApp',
            schema: aws_appsync_alpha_1.Schema.fromAsset(path.join(__dirname, 'graphql/schema.graphql')),
            authorizationConfig: {
                defaultAuthorization: {
                    authorizationType: aws_appsync_alpha_1.AuthorizationType.USER_POOL,
                    userPoolConfig: {
                        userPool: props.userpool,
                    },
                },
            },
            logConfig: {
                fieldLogLevel: aws_appsync_alpha_1.FieldLogLevel.ALL,
            },
            xrayEnabled: true,
        });
        const roomTableDataSource = api.addDynamoDbDataSource('RoomTableDataSource', props.roomTable);
        const messageTableDataSource = api.addDynamoDbDataSource('MessageTableDataSource', props.messageTable);
        roomTableDataSource.createResolver({
            typeName: 'Mutation',
            fieldName: 'createRoom',
            requestMappingTemplate: aws_appsync_alpha_1.MappingTemplate.fromFile(path.join(__dirname, 'graphql/mappingTemplates/Mutation.createRoom.req.vtl')),
            responseMappingTemplate: aws_appsync_alpha_1.MappingTemplate.dynamoDbResultItem(),
        });
        roomTableDataSource.createResolver({
            typeName: 'Query',
            fieldName: 'listRooms',
            // Can't use MappingTemplate.dynamoDbScanTable() because it's too basic for our needs👇🏽
            // https://github.com/aws/aws-cdk/blob/5e4d48e2ff12a86c0fb0177fe7080990cf79dbd0/packages/%40aws-cdk/aws-appsync/lib/mapping-template.ts#L39. I should PR this to take in an optional limit and scan 🤔
            requestMappingTemplate: aws_appsync_alpha_1.MappingTemplate.fromFile(path.join(__dirname, 'graphql/mappingTemplates/Query.listRooms.req.vtl')),
            responseMappingTemplate: aws_appsync_alpha_1.MappingTemplate.fromFile(path.join(__dirname, 'graphql/mappingTemplates/Query.listRooms.res.vtl')),
        });
        messageTableDataSource.createResolver({
            typeName: 'Mutation',
            fieldName: 'createMessage',
            requestMappingTemplate: aws_appsync_alpha_1.MappingTemplate.fromFile(path.join(__dirname, 'graphql/mappingTemplates/Mutation.createMessage.req.vtl')),
            responseMappingTemplate: aws_appsync_alpha_1.MappingTemplate.dynamoDbResultItem(),
        });
        messageTableDataSource.createResolver({
            typeName: 'Query',
            fieldName: 'listMessagesForRoom',
            requestMappingTemplate: aws_appsync_alpha_1.MappingTemplate.fromFile(path.join(__dirname, 'graphql/mappingTemplates/Query.listMessagesForRoom.req.vtl')),
            responseMappingTemplate: aws_appsync_alpha_1.MappingTemplate.fromFile(path.join(__dirname, 'graphql/mappingTemplates/Query.listMessagesForRoom.res.vtl')),
        });
        messageTableDataSource.createResolver({
            typeName: 'Mutation',
            fieldName: 'updateMessage',
            requestMappingTemplate: aws_appsync_alpha_1.MappingTemplate.fromFile(path.join(__dirname, 'graphql/mappingTemplates/Mutation.updateMessage.req.vtl')),
            responseMappingTemplate: aws_appsync_alpha_1.MappingTemplate.dynamoDbResultItem(),
        });
        new aws_cdk_lib_1.CfnOutput(this, 'GraphQLAPIURL', {
            value: api.graphqlUrl,
        });
        new aws_cdk_lib_1.CfnOutput(this, 'GraphQLAPIID', {
            value: api.apiId,
        });
    }
}
exports.APIStack = APIStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpU3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcGlTdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2Q0FBMEQ7QUFHMUQsNkJBQTRCO0FBQzVCLGtFQU1tQztBQVluQyxNQUFhLFFBQVMsU0FBUSxtQkFBSztJQUNsQyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQW9CO1FBQzdELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFBO1FBRXZCLE1BQU0sR0FBRyxHQUFHLElBQUksOEJBQVUsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFO1lBQzNDLElBQUksRUFBRSxTQUFTO1lBQ2YsTUFBTSxFQUFFLDBCQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLHdCQUF3QixDQUFDLENBQUM7WUFDeEUsbUJBQW1CLEVBQUU7Z0JBQ3BCLG9CQUFvQixFQUFFO29CQUNyQixpQkFBaUIsRUFBRSxxQ0FBaUIsQ0FBQyxTQUFTO29CQUM5QyxjQUFjLEVBQUU7d0JBQ2YsUUFBUSxFQUFFLEtBQUssQ0FBQyxRQUFRO3FCQUN4QjtpQkFDRDthQUNEO1lBQ0QsU0FBUyxFQUFFO2dCQUNWLGFBQWEsRUFBRSxpQ0FBYSxDQUFDLEdBQUc7YUFDaEM7WUFDRCxXQUFXLEVBQUUsSUFBSTtTQUNqQixDQUFDLENBQUE7UUFFRixNQUFNLG1CQUFtQixHQUFHLEdBQUcsQ0FBQyxxQkFBcUIsQ0FDcEQscUJBQXFCLEVBQ3JCLEtBQUssQ0FBQyxTQUFTLENBQ2YsQ0FBQTtRQUNELE1BQU0sc0JBQXNCLEdBQUcsR0FBRyxDQUFDLHFCQUFxQixDQUN2RCx3QkFBd0IsRUFDeEIsS0FBSyxDQUFDLFlBQVksQ0FDbEIsQ0FBQTtRQUVELG1CQUFtQixDQUFDLGNBQWMsQ0FBQztZQUNsQyxRQUFRLEVBQUUsVUFBVTtZQUNwQixTQUFTLEVBQUUsWUFBWTtZQUN2QixzQkFBc0IsRUFBRSxtQ0FBZSxDQUFDLFFBQVEsQ0FDL0MsSUFBSSxDQUFDLElBQUksQ0FDUixTQUFTLEVBQ1Qsc0RBQXNELENBQ3RELENBQ0Q7WUFDRCx1QkFBdUIsRUFBRSxtQ0FBZSxDQUFDLGtCQUFrQixFQUFFO1NBQzdELENBQUMsQ0FBQTtRQUVGLG1CQUFtQixDQUFDLGNBQWMsQ0FBQztZQUNsQyxRQUFRLEVBQUUsT0FBTztZQUNqQixTQUFTLEVBQUUsV0FBVztZQUN0Qix5RkFBeUY7WUFDekYsc01BQXNNO1lBQ3RNLHNCQUFzQixFQUFFLG1DQUFlLENBQUMsUUFBUSxDQUMvQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxrREFBa0QsQ0FBQyxDQUN4RTtZQUNELHVCQUF1QixFQUFFLG1DQUFlLENBQUMsUUFBUSxDQUNoRCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxrREFBa0QsQ0FBQyxDQUN4RTtTQUNELENBQUMsQ0FBQTtRQUVGLHNCQUFzQixDQUFDLGNBQWMsQ0FBQztZQUNyQyxRQUFRLEVBQUUsVUFBVTtZQUNwQixTQUFTLEVBQUUsZUFBZTtZQUMxQixzQkFBc0IsRUFBRSxtQ0FBZSxDQUFDLFFBQVEsQ0FDL0MsSUFBSSxDQUFDLElBQUksQ0FDUixTQUFTLEVBQ1QseURBQXlELENBQ3pELENBQ0Q7WUFDRCx1QkFBdUIsRUFBRSxtQ0FBZSxDQUFDLGtCQUFrQixFQUFFO1NBQzdELENBQUMsQ0FBQTtRQUNGLHNCQUFzQixDQUFDLGNBQWMsQ0FBQztZQUNyQyxRQUFRLEVBQUUsT0FBTztZQUNqQixTQUFTLEVBQUUscUJBQXFCO1lBQ2hDLHNCQUFzQixFQUFFLG1DQUFlLENBQUMsUUFBUSxDQUMvQyxJQUFJLENBQUMsSUFBSSxDQUNSLFNBQVMsRUFDVCw0REFBNEQsQ0FDNUQsQ0FDRDtZQUNELHVCQUF1QixFQUFFLG1DQUFlLENBQUMsUUFBUSxDQUNoRCxJQUFJLENBQUMsSUFBSSxDQUNSLFNBQVMsRUFDVCw0REFBNEQsQ0FDNUQsQ0FDRDtTQUNELENBQUMsQ0FBQTtRQUVGLHNCQUFzQixDQUFDLGNBQWMsQ0FBQztZQUNyQyxRQUFRLEVBQUUsVUFBVTtZQUNwQixTQUFTLEVBQUUsZUFBZTtZQUMxQixzQkFBc0IsRUFBRSxtQ0FBZSxDQUFDLFFBQVEsQ0FDL0MsSUFBSSxDQUFDLElBQUksQ0FDUixTQUFTLEVBQ1QseURBQXlELENBQ3pELENBQ0Q7WUFDRCx1QkFBdUIsRUFBRSxtQ0FBZSxDQUFDLGtCQUFrQixFQUFFO1NBQzdELENBQUMsQ0FBQTtRQUVGLElBQUksdUJBQVMsQ0FBQyxJQUFJLEVBQUUsZUFBZSxFQUFFO1lBQ3BDLEtBQUssRUFBRSxHQUFHLENBQUMsVUFBVTtTQUNyQixDQUFDLENBQUE7UUFFRixJQUFJLHVCQUFTLENBQUMsSUFBSSxFQUFFLGNBQWMsRUFBRTtZQUNuQyxLQUFLLEVBQUUsR0FBRyxDQUFDLEtBQUs7U0FDaEIsQ0FBQyxDQUFBO0lBQ0gsQ0FBQztDQUNEO0FBdkdELDRCQXVHQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENmbk91dHB1dCwgU3RhY2ssIFN0YWNrUHJvcHMgfSBmcm9tICdhd3MtY2RrLWxpYidcbmltcG9ydCB7IFRhYmxlIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWR5bmFtb2RiJ1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cydcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCB7XG5cdEdyYXBocWxBcGksXG5cdFNjaGVtYSxcblx0QXV0aG9yaXphdGlvblR5cGUsXG5cdEZpZWxkTG9nTGV2ZWwsXG5cdE1hcHBpbmdUZW1wbGF0ZSxcbn0gZnJvbSAnQGF3cy1jZGsvYXdzLWFwcHN5bmMtYWxwaGEnXG5pbXBvcnQgeyBVc2VyUG9vbCB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1jb2duaXRvJ1xuaW1wb3J0IHsgSVJvbGUgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtaWFtJ1xuXG5pbnRlcmZhY2UgQVBJU3RhY2tQcm9wcyBleHRlbmRzIFN0YWNrUHJvcHMge1xuXHR1c2VycG9vbDogVXNlclBvb2xcblx0cm9vbVRhYmxlOiBUYWJsZVxuXHR1c2VyVGFibGU6IFRhYmxlXG5cdG1lc3NhZ2VUYWJsZTogVGFibGVcblx0dW5hdXRoZW50aWNhdGVkUm9sZTogSVJvbGVcbn1cblxuZXhwb3J0IGNsYXNzIEFQSVN0YWNrIGV4dGVuZHMgU3RhY2sge1xuXHRjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wczogQVBJU3RhY2tQcm9wcykge1xuXHRcdHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpXG5cblx0XHRjb25zdCBhcGkgPSBuZXcgR3JhcGhxbEFwaSh0aGlzLCAnQ2hhdEFwcCcsIHtcblx0XHRcdG5hbWU6ICdDaGF0QXBwJyxcblx0XHRcdHNjaGVtYTogU2NoZW1hLmZyb21Bc3NldChwYXRoLmpvaW4oX19kaXJuYW1lLCAnZ3JhcGhxbC9zY2hlbWEuZ3JhcGhxbCcpKSxcblx0XHRcdGF1dGhvcml6YXRpb25Db25maWc6IHtcblx0XHRcdFx0ZGVmYXVsdEF1dGhvcml6YXRpb246IHtcblx0XHRcdFx0XHRhdXRob3JpemF0aW9uVHlwZTogQXV0aG9yaXphdGlvblR5cGUuVVNFUl9QT09MLFxuXHRcdFx0XHRcdHVzZXJQb29sQ29uZmlnOiB7XG5cdFx0XHRcdFx0XHR1c2VyUG9vbDogcHJvcHMudXNlcnBvb2wsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSxcblx0XHRcdH0sXG5cdFx0XHRsb2dDb25maWc6IHtcblx0XHRcdFx0ZmllbGRMb2dMZXZlbDogRmllbGRMb2dMZXZlbC5BTEwsXG5cdFx0XHR9LFxuXHRcdFx0eHJheUVuYWJsZWQ6IHRydWUsXG5cdFx0fSlcblxuXHRcdGNvbnN0IHJvb21UYWJsZURhdGFTb3VyY2UgPSBhcGkuYWRkRHluYW1vRGJEYXRhU291cmNlKFxuXHRcdFx0J1Jvb21UYWJsZURhdGFTb3VyY2UnLFxuXHRcdFx0cHJvcHMucm9vbVRhYmxlXG5cdFx0KVxuXHRcdGNvbnN0IG1lc3NhZ2VUYWJsZURhdGFTb3VyY2UgPSBhcGkuYWRkRHluYW1vRGJEYXRhU291cmNlKFxuXHRcdFx0J01lc3NhZ2VUYWJsZURhdGFTb3VyY2UnLFxuXHRcdFx0cHJvcHMubWVzc2FnZVRhYmxlXG5cdFx0KVxuXG5cdFx0cm9vbVRhYmxlRGF0YVNvdXJjZS5jcmVhdGVSZXNvbHZlcih7XG5cdFx0XHR0eXBlTmFtZTogJ011dGF0aW9uJyxcblx0XHRcdGZpZWxkTmFtZTogJ2NyZWF0ZVJvb20nLFxuXHRcdFx0cmVxdWVzdE1hcHBpbmdUZW1wbGF0ZTogTWFwcGluZ1RlbXBsYXRlLmZyb21GaWxlKFxuXHRcdFx0XHRwYXRoLmpvaW4oXG5cdFx0XHRcdFx0X19kaXJuYW1lLFxuXHRcdFx0XHRcdCdncmFwaHFsL21hcHBpbmdUZW1wbGF0ZXMvTXV0YXRpb24uY3JlYXRlUm9vbS5yZXEudnRsJ1xuXHRcdFx0XHQpXG5cdFx0XHQpLFxuXHRcdFx0cmVzcG9uc2VNYXBwaW5nVGVtcGxhdGU6IE1hcHBpbmdUZW1wbGF0ZS5keW5hbW9EYlJlc3VsdEl0ZW0oKSxcblx0XHR9KVxuXG5cdFx0cm9vbVRhYmxlRGF0YVNvdXJjZS5jcmVhdGVSZXNvbHZlcih7XG5cdFx0XHR0eXBlTmFtZTogJ1F1ZXJ5Jyxcblx0XHRcdGZpZWxkTmFtZTogJ2xpc3RSb29tcycsXG5cdFx0XHQvLyBDYW4ndCB1c2UgTWFwcGluZ1RlbXBsYXRlLmR5bmFtb0RiU2NhblRhYmxlKCkgYmVjYXVzZSBpdCdzIHRvbyBiYXNpYyBmb3Igb3VyIG5lZWRz8J+Rh/Cfj71cblx0XHRcdC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hd3MvYXdzLWNkay9ibG9iLzVlNGQ0OGUyZmYxMmE4NmMwZmIwMTc3ZmU3MDgwOTkwY2Y3OWRiZDAvcGFja2FnZXMvJTQwYXdzLWNkay9hd3MtYXBwc3luYy9saWIvbWFwcGluZy10ZW1wbGF0ZS50cyNMMzkuIEkgc2hvdWxkIFBSIHRoaXMgdG8gdGFrZSBpbiBhbiBvcHRpb25hbCBsaW1pdCBhbmQgc2NhbiDwn6SUXG5cdFx0XHRyZXF1ZXN0TWFwcGluZ1RlbXBsYXRlOiBNYXBwaW5nVGVtcGxhdGUuZnJvbUZpbGUoXG5cdFx0XHRcdHBhdGguam9pbihfX2Rpcm5hbWUsICdncmFwaHFsL21hcHBpbmdUZW1wbGF0ZXMvUXVlcnkubGlzdFJvb21zLnJlcS52dGwnKVxuXHRcdFx0KSxcblx0XHRcdHJlc3BvbnNlTWFwcGluZ1RlbXBsYXRlOiBNYXBwaW5nVGVtcGxhdGUuZnJvbUZpbGUoXG5cdFx0XHRcdHBhdGguam9pbihfX2Rpcm5hbWUsICdncmFwaHFsL21hcHBpbmdUZW1wbGF0ZXMvUXVlcnkubGlzdFJvb21zLnJlcy52dGwnKVxuXHRcdFx0KSxcblx0XHR9KVxuXG5cdFx0bWVzc2FnZVRhYmxlRGF0YVNvdXJjZS5jcmVhdGVSZXNvbHZlcih7XG5cdFx0XHR0eXBlTmFtZTogJ011dGF0aW9uJyxcblx0XHRcdGZpZWxkTmFtZTogJ2NyZWF0ZU1lc3NhZ2UnLFxuXHRcdFx0cmVxdWVzdE1hcHBpbmdUZW1wbGF0ZTogTWFwcGluZ1RlbXBsYXRlLmZyb21GaWxlKFxuXHRcdFx0XHRwYXRoLmpvaW4oXG5cdFx0XHRcdFx0X19kaXJuYW1lLFxuXHRcdFx0XHRcdCdncmFwaHFsL21hcHBpbmdUZW1wbGF0ZXMvTXV0YXRpb24uY3JlYXRlTWVzc2FnZS5yZXEudnRsJ1xuXHRcdFx0XHQpXG5cdFx0XHQpLFxuXHRcdFx0cmVzcG9uc2VNYXBwaW5nVGVtcGxhdGU6IE1hcHBpbmdUZW1wbGF0ZS5keW5hbW9EYlJlc3VsdEl0ZW0oKSxcblx0XHR9KVxuXHRcdG1lc3NhZ2VUYWJsZURhdGFTb3VyY2UuY3JlYXRlUmVzb2x2ZXIoe1xuXHRcdFx0dHlwZU5hbWU6ICdRdWVyeScsXG5cdFx0XHRmaWVsZE5hbWU6ICdsaXN0TWVzc2FnZXNGb3JSb29tJyxcblx0XHRcdHJlcXVlc3RNYXBwaW5nVGVtcGxhdGU6IE1hcHBpbmdUZW1wbGF0ZS5mcm9tRmlsZShcblx0XHRcdFx0cGF0aC5qb2luKFxuXHRcdFx0XHRcdF9fZGlybmFtZSxcblx0XHRcdFx0XHQnZ3JhcGhxbC9tYXBwaW5nVGVtcGxhdGVzL1F1ZXJ5Lmxpc3RNZXNzYWdlc0ZvclJvb20ucmVxLnZ0bCdcblx0XHRcdFx0KVxuXHRcdFx0KSxcblx0XHRcdHJlc3BvbnNlTWFwcGluZ1RlbXBsYXRlOiBNYXBwaW5nVGVtcGxhdGUuZnJvbUZpbGUoXG5cdFx0XHRcdHBhdGguam9pbihcblx0XHRcdFx0XHRfX2Rpcm5hbWUsXG5cdFx0XHRcdFx0J2dyYXBocWwvbWFwcGluZ1RlbXBsYXRlcy9RdWVyeS5saXN0TWVzc2FnZXNGb3JSb29tLnJlcy52dGwnXG5cdFx0XHRcdClcblx0XHRcdCksXG5cdFx0fSlcblxuXHRcdG1lc3NhZ2VUYWJsZURhdGFTb3VyY2UuY3JlYXRlUmVzb2x2ZXIoe1xuXHRcdFx0dHlwZU5hbWU6ICdNdXRhdGlvbicsXG5cdFx0XHRmaWVsZE5hbWU6ICd1cGRhdGVNZXNzYWdlJyxcblx0XHRcdHJlcXVlc3RNYXBwaW5nVGVtcGxhdGU6IE1hcHBpbmdUZW1wbGF0ZS5mcm9tRmlsZShcblx0XHRcdFx0cGF0aC5qb2luKFxuXHRcdFx0XHRcdF9fZGlybmFtZSxcblx0XHRcdFx0XHQnZ3JhcGhxbC9tYXBwaW5nVGVtcGxhdGVzL011dGF0aW9uLnVwZGF0ZU1lc3NhZ2UucmVxLnZ0bCdcblx0XHRcdFx0KVxuXHRcdFx0KSxcblx0XHRcdHJlc3BvbnNlTWFwcGluZ1RlbXBsYXRlOiBNYXBwaW5nVGVtcGxhdGUuZHluYW1vRGJSZXN1bHRJdGVtKCksXG5cdFx0fSlcblxuXHRcdG5ldyBDZm5PdXRwdXQodGhpcywgJ0dyYXBoUUxBUElVUkwnLCB7XG5cdFx0XHR2YWx1ZTogYXBpLmdyYXBocWxVcmwsXG5cdFx0fSlcblxuXHRcdG5ldyBDZm5PdXRwdXQodGhpcywgJ0dyYXBoUUxBUElJRCcsIHtcblx0XHRcdHZhbHVlOiBhcGkuYXBpSWQsXG5cdFx0fSlcblx0fVxufVxuIl19