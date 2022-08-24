# Zoom Apps Test

https://devforum.zoom.us/t/in-client-oauth-not-accepting-post-requests/71482/23?u=sean0
## Steps to reproduce the In-Client OAuth issue

1. Create a Zoom Apps at https://developers.zoom.us, fill in the required fields and copy the client ID and client secret for step 6.

1. Clone this repo and start the SPA
    ```shell
    npm start
    ```

1. Expose the SPA with ngrok and remember the URL
    ```shell
    ngrok http 3000 --response-header-add "content-security-policy: 'default-src self';" --response-header-add "X-Content-Type-Options: nosniff" --response-header-add "Strict-Transport-Security: max-age=63072000" --response-header-add "Referrer-Policy: origin-when-cross-origin"
    ```

1. Update the Zoom Apps created in step 1 with the URL above and add the app to your Zoom account
   
    <img width="1071" alt="image" src="https://user-images.githubusercontent.com/1180083/186343638-1d2015c7-5672-483b-89db-982896905157.png">

1. Open Zoom client, load the app, click authorize and copy the code

    <img width="835" alt="image" src="https://user-images.githubusercontent.com/1180083/186345906-e4172631-097f-46e3-a73e-201407be491c.png">

1. Invoke the Zoom OAuth API to get the access token

    <img width="714" alt="image" src="https://user-images.githubusercontent.com/1180083/186345941-5785fcb3-91ba-48a4-96fe-de56f4547a5a.png">

    Zoom returns 400 error as follows:
    ```json
    {
      "reason": "Invalid authorization code hWRIg2ITM8_6K9JiCnXSWytdI_x8z-EuA",
      "error": "invalid_grant"
    }
    ```