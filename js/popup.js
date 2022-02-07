$(document).ready(function(){

    $('#start').click(function(){
        var run_time = $('#run_time').val().trim();
        var scroll_wait_time = $('#scroll_wait_time').val().trim();
        var wait_time = $('#wait_time').val().trim();
        if(run_time != '' && scroll_wait_time != '' && wait_time != '') {
                chrome.storage.sync.set({
                    "sc_run_time": run_time,
                    "sc_scroll_wait_time" : scroll_wait_time,
                    "sc_wait_time" : wait_time
                }, function() {
                    console.log("Settings saved");
                });
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
                    chrome.tabs.sendMessage(tabs[0].id, {
                        action: "start",
                        run_time: run_time,
                        scroll_wait_time: scroll_wait_time,
                        wait_time: wait_time
                    }, function(response){
                        return true;
                    })
                })
            
        } else {
            alert('Hãy điền đủ thông tin')
        }
    })

    $('#stop').click(function(){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, {action: "stop"}, function(response){
                return true;
            })
        })
    })

    $('#clear').click(function(){
        if(confirm("Bạn chắc chắn muốn xóa dữ liệu")) {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
                chrome.tabs.sendMessage(tabs[0].id, {action: "clear"}, function(response){
                    return true;
                })
            })
        }
    })

    $('#continue').click(function(){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, {action: "continue"}, function(response){
                return true;
            })
        })
    })
    
    chrome.storage.sync.get(["sc_run_time", "sc_scroll_wait_time", "sc_wait_time"], function(items) {
        document.getElementById("run_time").value = items["sc_run_time"] || "";
        document.getElementById("scroll_wait_time").value = items["sc_scroll_wait_time"] || "";
        document.getElementById("wait_time").value = items["sc_wait_time"] || "";
    });
})
