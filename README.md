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

1. Open Zoom client, load the app, click authorize and copy the code

    <img width="720" alt="image" src="https://user-images.githubusercontent.com/1180083/186337778-20193694-723e-4b57-bbbb-7a3436fff96e.png">

1. Invoke the Zoom OAuth API to get the access token

    ```shell
    curl -X POST 'https://zoom.us/oauth/token' \
    --header 'Authorization: Basic BASE64_ENCODED_CLIENT_ID_AND_SECRET' \
    --header 'Content-Type: application/x-www-form-urlencoded' \
    --data-urlencode 'code=skRN56jJbP_6K9JiCnXSWytdI_x8z-EuA' \
    --data-urlencode 'grant_type=authorization_code' \
    --data-urlencode 'redirect_uri=https://xxxxxx.ngrok.io' \
    --data-urlencode 'code_verifier=dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk'
    ```

    Zoom returns 400 error as follows:
    ```json
    {
      "reason": "Invalid authorization code skRN56jJbP_6K9JiCnXSWytdI_x8z-EuA",
      "error": "invalid_grant"
    }
    ```