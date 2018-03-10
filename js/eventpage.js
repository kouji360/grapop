var tweet;
var wsUri = "ws://ec2-52-40-135-194.us-west-2.compute.amazonaws.com:1880/ws/twitter";
var ws = new WebSocket(wsUri);

/* websocketリスナ[ */
ws.onmessage = function (evt) {

    tweet = JSON.parse(evt.data);
    var id = tweet.id;
    var target = tweet.target;
    
    //localstorageに含まれていなければ通知しない
    var storage = localStorage["help"];
    if(storage.indexOf(target) == -1){
        return;
    }

    var opt = {
        type: 'basic',
        title: target,
        message: id,
        iconUrl: 'images/'+target+'.jpg'
    }
    chrome.notifications.create(id, opt, function(id){});
};


chrome.notifications.onClicked.addListener(function(id){
    console.log(id);
    var temp = document.createElement('textarea');

    temp.value = id;
    temp.selectionStart = 0;
    temp.selectionEnd = temp.value.length;

    var s = temp.style;
    s.position = 'fixed';
    s.left = '-100%';

    document.body.appendChild(temp);
    temp.focus();
    var result = document.execCommand('copy');
    temp.blur();
    document.body.removeChild(temp);
    chrome.notifications.clear(id, function(id){});
    //
    // document.execCommand('copy');
});



