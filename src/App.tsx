import React from 'react';
import './App.css';
import zoomSdk from '@zoom/appssdk';

function App() {
  // Sample code challenge and verifier from https://www.authlete.com/developers/pkce/#2-4-code-challenge-method
  const codeChallenge = 'E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM';
  const codeVerifier = 'dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk';

  const [authCode, setAuthCode] = React.useState();

  async function authorize() {
    try {
      await zoomSdk.authorize({ codeChallenge });
    } catch (e) {
      console.error(e);
    }
  }

  React.useEffect(() => {
    (async () => {
      try {
        const configResponse = await zoomSdk.config({
          size: { width: 480, height: 360 },
          capabilities: [
            'authorize',
            'onAuthorized',
            'promptAuthorize',
            'getUserContext',
            'getMeetingContext'
          ]
        });

        console.debug('Zoom JS SDK Configuration', configResponse);
      } catch (e) {
        console.log('Zoom JS SDK Configuration failed');
        console.error(e);
      }
    })();
    console.log('In-Client OAuth flow: onAuthorized event listener added');
    zoomSdk.addEventListener('onAuthorized', (event) => {
      const { code } = event;
      setAuthCode(code);
      console.log('3. onAuthorized event fired.', event);
    });

    return () => zoomSdk.removeEventListener('onAuthorized', () => {});
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <h5>Code Challenge: {codeChallenge}</h5>
        <h5>Code Verifier: {codeVerifier}</h5>
        <h5>Code: {authCode}</h5>
        <button onClick={authorize}>Authorize</button>
      </header>
    </div>
  );
}

export default App;
