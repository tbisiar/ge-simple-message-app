"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_dynamodb_1 = require("aws-cdk-lib/aws-dynamodb");
const aws_iam_1 = require("aws-cdk-lib/aws-iam");
class DatabaseStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const userTable = new aws_dynamodb_1.Table(this, 'UserTable', {
            removalPolicy: aws_cdk_lib_1.RemovalPolicy.DESTROY,
            billingMode: aws_dynamodb_1.BillingMode.PAY_PER_REQUEST,
            partitionKey: { name: 'id', type: aws_dynamodb_1.AttributeType.STRING },
        });
        const roomTable = new aws_dynamodb_1.Table(this, 'RoomTable', {
            removalPolicy: aws_cdk_lib_1.RemovalPolicy.DESTROY,
            billingMode: aws_dynamodb_1.BillingMode.PAY_PER_REQUEST,
            partitionKey: { name: 'id', type: aws_dynamodb_1.AttributeType.STRING },
        });
        const messageTable = new aws_dynamodb_1.Table(this, 'MessageTable', {
            removalPolicy: aws_cdk_lib_1.RemovalPolicy.DESTROY,
            billingMode: aws_dynamodb_1.BillingMode.PAY_PER_REQUEST,
            partitionKey: { name: 'id', type: aws_dynamodb_1.AttributeType.STRING },
        });
        messageTable.addGlobalSecondaryIndex({
            indexName: 'messages-by-room-id',
            partitionKey: { name: 'roomId', type: aws_dynamodb_1.AttributeType.STRING },
            sortKey: { name: 'createdAt', type: aws_dynamodb_1.AttributeType.STRING },
        });
        const messageTableServiceRole = new aws_iam_1.Role(this, 'MessageTableServiceRole', {
            assumedBy: new aws_iam_1.ServicePrincipal('dynamodb.amazonaws.com'),
        });
        messageTableServiceRole.addToPolicy(new aws_iam_1.PolicyStatement({
            effect: aws_iam_1.Effect.ALLOW,
            resources: [`${messageTable.tableArn}/index/messages-by-room-id`],
            actions: ['dymamodb:Query'],
        }));
        this.roomTable = roomTable;
        this.userTable = userTable;
        this.messageTable = messageTable;
    }
}
exports.DatabaseStack = DatabaseStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWJhc2VTdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRhdGFiYXNlU3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkNBQXlFO0FBQ3pFLDJEQUE0RTtBQUM1RSxpREFLNEI7QUFLNUIsTUFBYSxhQUFjLFNBQVEsbUJBQUs7SUFLdkMsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUF5QjtRQUNsRSxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUV2QixNQUFNLFNBQVMsR0FBRyxJQUFJLG9CQUFLLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRTtZQUM5QyxhQUFhLEVBQUUsMkJBQWEsQ0FBQyxPQUFPO1lBQ3BDLFdBQVcsRUFBRSwwQkFBVyxDQUFDLGVBQWU7WUFDeEMsWUFBWSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsNEJBQWEsQ0FBQyxNQUFNLEVBQUU7U0FDeEQsQ0FBQyxDQUFBO1FBRUYsTUFBTSxTQUFTLEdBQUcsSUFBSSxvQkFBSyxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUU7WUFDOUMsYUFBYSxFQUFFLDJCQUFhLENBQUMsT0FBTztZQUNwQyxXQUFXLEVBQUUsMEJBQVcsQ0FBQyxlQUFlO1lBQ3hDLFlBQVksRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLDRCQUFhLENBQUMsTUFBTSxFQUFFO1NBQ3hELENBQUMsQ0FBQTtRQUVGLE1BQU0sWUFBWSxHQUFHLElBQUksb0JBQUssQ0FBQyxJQUFJLEVBQUUsY0FBYyxFQUFFO1lBQ3BELGFBQWEsRUFBRSwyQkFBYSxDQUFDLE9BQU87WUFDcEMsV0FBVyxFQUFFLDBCQUFXLENBQUMsZUFBZTtZQUN4QyxZQUFZLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSw0QkFBYSxDQUFDLE1BQU0sRUFBRTtTQUN4RCxDQUFDLENBQUE7UUFFRixZQUFZLENBQUMsdUJBQXVCLENBQUM7WUFDcEMsU0FBUyxFQUFFLHFCQUFxQjtZQUNoQyxZQUFZLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSw0QkFBYSxDQUFDLE1BQU0sRUFBRTtZQUM1RCxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSw0QkFBYSxDQUFDLE1BQU0sRUFBRTtTQUMxRCxDQUFDLENBQUE7UUFFRixNQUFNLHVCQUF1QixHQUFHLElBQUksY0FBSSxDQUFDLElBQUksRUFBRSx5QkFBeUIsRUFBRTtZQUN6RSxTQUFTLEVBQUUsSUFBSSwwQkFBZ0IsQ0FBQyx3QkFBd0IsQ0FBQztTQUN6RCxDQUFDLENBQUE7UUFFRix1QkFBdUIsQ0FBQyxXQUFXLENBQ2xDLElBQUkseUJBQWUsQ0FBQztZQUNuQixNQUFNLEVBQUUsZ0JBQU0sQ0FBQyxLQUFLO1lBQ3BCLFNBQVMsRUFBRSxDQUFDLEdBQUcsWUFBWSxDQUFDLFFBQVEsNEJBQTRCLENBQUM7WUFDakUsT0FBTyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7U0FDM0IsQ0FBQyxDQUNGLENBQUE7UUFFRCxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQTtRQUMxQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQTtRQUMxQixJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQTtJQUNqQyxDQUFDO0NBQ0Q7QUFoREQsc0NBZ0RDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2ZuT3V0cHV0LCBSZW1vdmFsUG9saWN5LCBTdGFjaywgU3RhY2tQcm9wcyB9IGZyb20gJ2F3cy1jZGstbGliJ1xuaW1wb3J0IHsgQXR0cmlidXRlVHlwZSwgQmlsbGluZ01vZGUsIFRhYmxlIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWR5bmFtb2RiJ1xuaW1wb3J0IHtcblx0RWZmZWN0LFxuXHRQb2xpY3lTdGF0ZW1lbnQsXG5cdFJvbGUsXG5cdFNlcnZpY2VQcmluY2lwYWwsXG59IGZyb20gJ2F3cy1jZGstbGliL2F3cy1pYW0nXG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJ1xuXG5pbnRlcmZhY2UgRGF0YWJhc2VTdGFja1Byb3BzIGV4dGVuZHMgU3RhY2tQcm9wcyB7fVxuXG5leHBvcnQgY2xhc3MgRGF0YWJhc2VTdGFjayBleHRlbmRzIFN0YWNrIHtcblx0cHVibGljIHJlYWRvbmx5IHJvb21UYWJsZTogVGFibGVcblx0cHVibGljIHJlYWRvbmx5IHVzZXJUYWJsZTogVGFibGVcblx0cHVibGljIHJlYWRvbmx5IG1lc3NhZ2VUYWJsZTogVGFibGVcblxuXHRjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wczogRGF0YWJhc2VTdGFja1Byb3BzKSB7XG5cdFx0c3VwZXIoc2NvcGUsIGlkLCBwcm9wcylcblxuXHRcdGNvbnN0IHVzZXJUYWJsZSA9IG5ldyBUYWJsZSh0aGlzLCAnVXNlclRhYmxlJywge1xuXHRcdFx0cmVtb3ZhbFBvbGljeTogUmVtb3ZhbFBvbGljeS5ERVNUUk9ZLFxuXHRcdFx0YmlsbGluZ01vZGU6IEJpbGxpbmdNb2RlLlBBWV9QRVJfUkVRVUVTVCxcblx0XHRcdHBhcnRpdGlvbktleTogeyBuYW1lOiAnaWQnLCB0eXBlOiBBdHRyaWJ1dGVUeXBlLlNUUklORyB9LFxuXHRcdH0pXG5cblx0XHRjb25zdCByb29tVGFibGUgPSBuZXcgVGFibGUodGhpcywgJ1Jvb21UYWJsZScsIHtcblx0XHRcdHJlbW92YWxQb2xpY3k6IFJlbW92YWxQb2xpY3kuREVTVFJPWSxcblx0XHRcdGJpbGxpbmdNb2RlOiBCaWxsaW5nTW9kZS5QQVlfUEVSX1JFUVVFU1QsXG5cdFx0XHRwYXJ0aXRpb25LZXk6IHsgbmFtZTogJ2lkJywgdHlwZTogQXR0cmlidXRlVHlwZS5TVFJJTkcgfSxcblx0XHR9KVxuXG5cdFx0Y29uc3QgbWVzc2FnZVRhYmxlID0gbmV3IFRhYmxlKHRoaXMsICdNZXNzYWdlVGFibGUnLCB7XG5cdFx0XHRyZW1vdmFsUG9saWN5OiBSZW1vdmFsUG9saWN5LkRFU1RST1ksXG5cdFx0XHRiaWxsaW5nTW9kZTogQmlsbGluZ01vZGUuUEFZX1BFUl9SRVFVRVNULFxuXHRcdFx0cGFydGl0aW9uS2V5OiB7IG5hbWU6ICdpZCcsIHR5cGU6IEF0dHJpYnV0ZVR5cGUuU1RSSU5HIH0sXG5cdFx0fSlcblxuXHRcdG1lc3NhZ2VUYWJsZS5hZGRHbG9iYWxTZWNvbmRhcnlJbmRleCh7XG5cdFx0XHRpbmRleE5hbWU6ICdtZXNzYWdlcy1ieS1yb29tLWlkJyxcblx0XHRcdHBhcnRpdGlvbktleTogeyBuYW1lOiAncm9vbUlkJywgdHlwZTogQXR0cmlidXRlVHlwZS5TVFJJTkcgfSxcblx0XHRcdHNvcnRLZXk6IHsgbmFtZTogJ2NyZWF0ZWRBdCcsIHR5cGU6IEF0dHJpYnV0ZVR5cGUuU1RSSU5HIH0sXG5cdFx0fSlcblxuXHRcdGNvbnN0IG1lc3NhZ2VUYWJsZVNlcnZpY2VSb2xlID0gbmV3IFJvbGUodGhpcywgJ01lc3NhZ2VUYWJsZVNlcnZpY2VSb2xlJywge1xuXHRcdFx0YXNzdW1lZEJ5OiBuZXcgU2VydmljZVByaW5jaXBhbCgnZHluYW1vZGIuYW1hem9uYXdzLmNvbScpLFxuXHRcdH0pXG5cblx0XHRtZXNzYWdlVGFibGVTZXJ2aWNlUm9sZS5hZGRUb1BvbGljeShcblx0XHRcdG5ldyBQb2xpY3lTdGF0ZW1lbnQoe1xuXHRcdFx0XHRlZmZlY3Q6IEVmZmVjdC5BTExPVyxcblx0XHRcdFx0cmVzb3VyY2VzOiBbYCR7bWVzc2FnZVRhYmxlLnRhYmxlQXJufS9pbmRleC9tZXNzYWdlcy1ieS1yb29tLWlkYF0sXG5cdFx0XHRcdGFjdGlvbnM6IFsnZHltYW1vZGI6UXVlcnknXSxcblx0XHRcdH0pXG5cdFx0KVxuXG5cdFx0dGhpcy5yb29tVGFibGUgPSByb29tVGFibGVcblx0XHR0aGlzLnVzZXJUYWJsZSA9IHVzZXJUYWJsZVxuXHRcdHRoaXMubWVzc2FnZVRhYmxlID0gbWVzc2FnZVRhYmxlXG5cdH1cbn1cbiJdfQ==