Date: 9 Nov 2023
Title: CORS and CORB in browsers
Desc:

- Corb :
It stands for Cross origin Read Blocking
CORB is a new web platform security feature that helps mitigate the threat of side-channel attacks . It is designed to prevent the browser from delivering certain cross-origin network responses to a web page, when they might contain sensitive information and are not needed for existing web features. For example, it will block a cross-origin text/html response requested from a <script> or <img> tag, replacing it with an empty response instead.

- Cors:
Cors stands for Cross-Origin Resource Sharing
CORS is an HTTP-header based mechanism that allows a server to indicate any origins (domain, scheme, or port) other than its own from which a browser should permit loading resources. CORS also relies on a mechanism by which browsers make a "preflight" request to the server hosting the cross-origin resource, in order to check that the server will permit the actual request. In that preflight, the browser sends headers that indicate the HTTP method and headers that will be used in the actual request.


- Cross-Origin Resource Sharing (CORS) is an HTTP-header based mechanism that allows a server to indicate any origins (domain, scheme, or port) other than its own from which a browser should permit loading resources. CORS also relies on a mechanism by which browsers make a "preflight" request to the server hosting the cross-origin resource, in order to check that the server will permit the actual request. In that preflight, the browser sends headers that indicate the HTTP method and headers that will be used in the actual request.

An example of a cross-origin request: the front-end JavaScript code served from https://domain-a.com uses XMLHttpRequest to make a request for https://domain-b.com/data.json.

For security reasons, browsers restrict cross-origin HTTP requests initiated from scripts. For example, XMLHttpRequest and the Fetch API follow the same-origin policy. This means that a web application using those APIs can only request resources from the same origin the application was loaded from unless the response from other origins includes the right CORS headers.

- Examples of access control scenarios
We present three scenarios that demonstrate how Cross-Origin Resource Sharing works. All these examples use XMLHttpRequest, which can make cross-origin requests in any supporting browser.

1. Simple requests
Some requests don't trigger a CORS preflight. Those are called simple requests from the obsolete CORS spec, though the Fetch spec (which now defines CORS) doesn't use that term.

The motivation is that the <form> element from HTML 4.0 (which predates cross-site XMLHttpRequest and fetch) can submit simple requests to any origin, so anyone writing a server must already be protecting against cross-site request forgery (CSRF). Under this assumption, the server doesn't have to opt-in (by responding to a preflight request) to receive any request that looks like a form submission, since the threat of CSRF is no worse than that of form submission. However, the server still must opt-in using Access-Control-Allow-Origin to share the response with the script.

2. Preflighted requests
Unlike simple requests, for "preflighted" requests the browser first sends an HTTP request using the OPTIONS method to the resource on the other origin, in order to determine if the actual request is safe to send. Such cross-origin requests are preflighted since they may have implications for user data.


- In most cases, the blocked response should not affect the web page's behavior and the CORB error message can be safely ignored. For example, the warning may occur in cases when the body of the blocked response was empty already, or when the response was going to be delivered to a context that can't handle it (e.g., a HTML document such as a 404 error page being delivered to an <img> tag). Note: Chrome will stop showing warning messages for empty or error responses in Chrome 69, since these are false positives that do not affect site behavior. If you see CORB warnings in Chrome 67 or 68, please test the site in Chrome 69 to see if any warnings remain.

In rare cases, the CORB warning message may indicate a problem on a website, which may disrupt its behavior when certain responses are blocked. For example, a response served with a "X-Content-Type-Options: nosniff" response header and an incorrect "Content-Type" response header may be blocked. This could, for example, block an actual image which is mislabeled as "Content-Type: text/html" and "nosniff." If this occurs and interferes with a page's behavior, we recommend informing the website and requesting that they correct the "Content-Type" header for the response.

If you suspect Chrome is incorrectly blocking a response and that this is disrupting the behavior of a website, please file a Chromium bug describing the incorrectly blocked response (both the headers and body) and/or the URL serving it. You can confirm if a problem is due to CORB by temporarily disabling it, by starting Chrome with the following command line flag:


