var interval1;
var running = sessionStorage.getItem('sc_running');
var run_time = 10;
var scroll_wait_time = 500;
var wait_time = 30;

if(running == 1) scrollStart(run_time, scroll_wait_time, wait_time);

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action == 'start') {
    	running = 1
    	console.log('-- START --')
    } else if (request.action == 'stop') {
    	running = 0
		console.log('-- STOP --')
    } else if (request.action == 'clear') {
        running = 0
        console.log('-- CLEAR --')
        try {
            sessionStorage.clear();
            alert('Đã clear toàn bộ dữ liệu ! Vui lòng thao tác lại từ đầu !');
        } catch {
            alert('Có chút vấn đề xảy ra ! Vui lòng f5 và thử lại !');
        }
    } else if (request.action == 'continue') {
        running = 1
    }
    sessionStorage.setItem('sc_running', running);
    sessionStorage.setItem("sc_run_time", request.run_time);
    sessionStorage.setItem("sc_scroll_wait_time", request.scroll_wait_time);
    sessionStorage.setItem("sc_wait_time", request.wait_time);

    if(running == 1) scrollStart(parseInt(request.run_time), parseInt(request.scroll_wait_time), parseInt(request.wait_time));
	else clearInterval(interval1);
    return true;
})

// Scroll auto
var run_secs = 0;
function scrollStart(run_time, scroll_wait_time, wait_time) {
    if(!run_time) run_time = 10
    if(!scroll_wait_time) scroll_wait_time = 500
    if(!wait_time) wait_time = 30
	console.log('-- START --', run_time, scroll_wait_time, wait_time)

	interval1 = setInterval(function () {
        console.log('run_secs', run_secs)
		if(run_secs < run_time) {
			console.log(`Scrolling`)
			window.scrollTo(0, document.body.scrollHeight)
		} else if (run_secs < run_time + wait_time) {
			console.log(`Sleeping`)
		} else {
			console.log("Awake")
			run_secs = 0;
		}
	}, scroll_wait_time);
}

interval2 = setInterval(function () {
	if(running) run_secs++
}, 1000);

console.log('Simple Scroll Facebook')
