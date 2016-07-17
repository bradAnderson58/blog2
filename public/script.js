
hljs.initHighlightingOnLoad();  // is this what I do?
var pad;
var serverUrl = 'http://' + location.hostname + '/api/';
// public/script.js
window.onload = function() {

  // showdown converter can be used to convert between markdown and html
  var converter = new showdown.Converter();
  pad = document.getElementById('pad');
  var markdownArea = document.getElementById('markdown');

  // convert the markdown text from the pad to html and put it in the markdownArea
  var convertTextAreaToMarkdown = function() {
    var markdownText = pad.value;
    html = converter.makeHtml(markdownText);
    markdownArea.innerHTML = html;

    // we also want to run highlight syntax
   hljs.initHighlighting.called = false;
   hljs.initHighlighting();
  };

  pad.addEventListener('input', convertTextAreaToMarkdown);

  convertTextAreaToMarkdown();

}

var postbtn = document.getElementById('postShit');

function postPopup() {
  var whodat = prompt("whodat", "whodis");
  var secret = prompt("whatitdo", "son");
  var title = prompt('title', 'Poast');
  var date = prompt('date', 'yyyy mm dd');
  postData(whodat, secret, title, date);
}

// post whatever data you have
function postData(whodat, secret, t, date) {

  // parse the date from yyyy mm dd format
  var splitted = date.split(' ');
  if (splitted.length < 3) {
    alert('you didnt enter a complete date pussy');
    return;
  }

  var http = new XMLHttpRequest();
  var url = serverUrl + 'post';
  http.onreadystatechange = function() {
    console.log("send");
    if (http.readyState === 4 && http.status === 200) {
      var msg = JSON.parse(http.response);
      alert(msg.message);
    }
  }

  http.open('POST', url, true);

  // TODO: this should be application/x-www-form-urlencoded ?
  http.setRequestHeader('Content-Type', 'application/json');
  var data = {
    title: t,
    blog: pad.value,
    year: splitted[0],
    month: splitted[1],
    day: splitted[2],
    name: whodat,
    pass: secret
  }

  http.send(JSON.stringify(data));
}

function retrieve() {
  var title = document.getElementById('titlearea').value;
  console.log(title);

  var http = new XMLHttpRequest();
  var url = serverUrl + 'getpost?title=' + title;
  http.onreadystatechange = function() {
    if (http.readyState === 4 && http.status === 200){
      var msg = JSON.parse(http.response);
      var markdownArea = document.getElementById('pad');
      //var converter = new showdown.Converter();

      if (msg[0]) {
        markdownArea.value = msg[0].blog;
        console.log(msg[0].updated_at);
      }
    }
  }

  http.open('GET', url, true);
  http.setRequestHeader('Content-Type', 'application/json');
  http.send(name);
}






