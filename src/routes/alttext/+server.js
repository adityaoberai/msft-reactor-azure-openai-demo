import { OpenAIClient, AzureKeyCredential } from '@azure/openai';

export async function POST({request}) {
    const endpoint = '<AZUREOPENAI_ENDPOINT>';
    const apiKey = '<AZUREOPENAI_APIKEY>';
    const deploymentName = '<AZUREOPENAI_DEPLOYMENTNAME>';

    const body = await request.json();
    const image = body.image;

    const client = new OpenAIClient(endpoint, new AzureKeyCredential(apiKey));

    const messages = [{
        role: 'user',
        content: [
            {
                type: 'text',
                text: 'Generate alt text for the image:'
            },
            {
                type: 'image_url',
                imageUrl: {
                    url: image
                }
            }
        ]
    }];

    const result = await client.getChatCompletions(deploymentName, messages, { maxTokens: 200 });
    console.log(result);

    const altText = result.choices[0].message?.content;

    console.log(altText);

    return new Response(JSON.stringify({ altText }));
}