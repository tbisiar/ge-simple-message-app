import { createEmotionSsrAdvancedApproach } from "tss-react/next";
import React from "react";
import { Amplify } from "aws-amplify";
import { AmplifyProvider } from "@aws-amplify/ui-react";
import type { AppProps } from "next/app";

const {
    augmentDocumentWithEmotionCache,
    withAppEmotionCache
} = createEmotionSsrAdvancedApproach({ "key": "css" });

export { augmentDocumentWithEmotionCache };

const config = {
    "aws_project_region": process.env.AWS_REGION,
    "aws_appsync_graphqlEndpoint": process.env.AWS_GRAPHQL_ENDPOINT,
    "aws_appsync_region": process.env.AWS_REGION,
    "aws_appsync_authenticationType": "AMAZON_COGNITO_USER_POOLS",
    "Auth": {
        "region": process.env.AWS_REGION,
        "userPoolId": process.env.AWS_USER_POOL_ID,
        "userPoolWebClientId": process.env.AWS_USER_POOL_WEB_CLIENT_ID
    }
}

Amplify.configure({ ...config, ssr: true })
const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <AmplifyProvider>
            <Component {...pageProps} />
        </AmplifyProvider>
    )
}

//You can also pass your custom App if you have one. 
export default withAppEmotionCache(MyApp);