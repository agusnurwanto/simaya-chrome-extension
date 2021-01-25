// console.log('run content_script.js');

function injectScript(file, node) {
    var th = document.getElementsByTagName(node)[0];
    var s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', file);
    // th.appendChild(s);
    th.insertBefore(s, th.firstChild);
}
injectScript( chrome.extension.getURL('/config.js'), 'html');


var data = {
    message:{
        type: "get-actions"
    }
};
chrome.runtime.sendMessage(data, function(response) {
    console.log('responeMessage', response);
});

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
	console.log('sender, request', sender, request);
	var current_url = window.location.href;
	if(request.type == 'response-fecth-url'){
		var res = request.data;
		console.log(request.data);
		jQuery('#wrap-loading').hide();
		jQuery('#persen-loading').html('');
		jQuery('#persen-loading').attr('persen', '');
		jQuery('#persen-loading').attr('total', '');
	}else if(request.type == 'response-actions'){
		
	}
	return sendResponse("THANKS from content_script!");
});

// injectScript( chrome.extension.getURL('/js/content/app.js'), 'html');