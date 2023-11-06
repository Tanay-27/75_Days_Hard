Date: 4 Nov 2023
Title: Meta Tags
Desc:
- Meta tags are HTML tags used to provide additional information about a page to search engines and other clients. Clients process the meta tags provided by the server and ignore those they dont support. Mera tags are added to the <head> section of your HTML page and generally look like:
<meta name="robots" content="noindex,nofollow">

- Metadata is used by browsers(how to display content or reload page), search engines (keywords), and other web services.
https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta


Setting the Viewport
The viewport is the user's visible area of a web page. It varies with the device - it will be smaller on a mobile phone than on a computer screen.

You should include the following <meta> element in all your web pages:

<meta name="viewport" content="width=device-width, initial-scale=1.0">
This gives the browser instructions on how to control the page's dimensions and scaling.

The width=device-width part sets the width of the page to follow the screen-width of the device (which will vary depending on the device).

The initial-scale=1.0 part sets the initial zoom level when the page is first loaded by the browser.

Here is an example of a web page without the viewport meta tag, and the same web page with the viewport meta tag:

https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag


