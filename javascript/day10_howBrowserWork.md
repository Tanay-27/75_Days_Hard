Date: 20 Oct 2023
Title: How Browsers Work
Desc:
- Two major issues in web performance ae issues having to do with latency and issues having to do with the fact that for most part. browsers are single-threaded.

- Latency is the bigbest threat to our ability to ensure a fast-loading page.
Network latency is the time it takes to transmit bytes over the air to computers. Web performance is what  we have to do to make the page load as quickly as possible.

1. Navigation
It is the first step in loading a web page. It occurs whenver a user requests a page by entering a URL into address bar, clicking a link, submitting a form, as well as other action.
Latency and bandwidth are foes that can cause delays.

- DNS Lookup
First step of navigating to a web page is finding where the assets for that page are location.
Browser requests a DNS lookup, which is eventually fielded by a name server, which in turn responds with an IP address. DNS lookups usually only need ot be done once per hostname for a page load. However, DNS lookups must be done for each unique hostname. If your fonts, images,scripts, ads and metrics all have different hostnames, a DNS lookup will have to be made for each one.

- TCP Handshake
Once IP is known, the browser sets up a connection to the server via TCP three-way handshake. This mechanism is designed so that two entities attempting to communicate - in this case browser and web server - can negotiate the parameters of the network TCP socket connections before transmitting data, often over HTTPS.

TCP's three-way handshaking tehnique is often referred to as SYN-SYN-ACK or more accurately SYN, SYN-ACK, ACK - because there are three messages transmitted by TCP to negotiate and start a TCP session between two computers. Yes, this means three more messages back and forth between each server, and the request has yet to be made.

- TLC Negotiation
For HTTPS, another handshake is required. This handshake or rather the TLS negotiation, determins which cipher will be used to encrypt the communication, verifies the server, and establishes that a secure connection is in place before begining the actual transfer of data. This rquires five more round trips to the server before the request for content is actually sent.
While making the connection secure adds time to the page load, a secure connection is worth the latency expense, as the data transmitted between the browser and the web server cannot be decrypted by a third party.

After the eight round trips to the server, the browser is finally able to make the request.


2. Response
Once we have established connection to a web server, the browser sends an initial HTTP Get request on behalf of use, which for websites is most often an HTML file. Once the server recieves the request, it will reply with relevant response headers and the contents of the HTML
This response for thin initial request contains the first byte of data recieved. Time to First Bite TTFB is the time between when the user made the request and the reciept of this first packet of HTML. This first chunk of content is usually 14 kb of data.

