var intervalID;
var running = sessionStorage.getItem('running');
var wait = 3000

if(running == 1) scrollStart(wait);

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.action === "toggleState") {
		running = sessionStorage.getItem('running')
		if(running == 1) running = 0
		else running = 1
		sessionStorage.setItem('running', running);
		if(running == 1) scrollStart(wait);
		else {
			clearInterval(intervalID)
			console.log('-- STOP --')
		}
	}
})
// Scroll auto
function scrollStart(wait) {
	console.log('-- START --')
	intervalID = setInterval(function () {
		console.log(`Scrolling`)
		window.scrollTo(0, document.body.scrollHeight)
	}, wait);
}

console.log('Simple Scroll Facebook')
