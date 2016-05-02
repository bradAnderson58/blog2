
hljs.initHighlightingOnLoad();  // is this what I do?
var pad;
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
  postData(whodat, secret, title);
}

// post whatever data you have
function postData(whodat, secret, t) {

  var http = new XMLHttpRequest();
  var url = 'http://192.168.152.132:8000/api/post';
  http.onreadystatechange = function() {
    console.log("send");
    if (http.readyState === 4 && http.status === 200) {
      var msg = JSON.parse(http.response);
      alert(msg.message);
    }
  }

  http.open('POST', url, true);
  http.setRequestHeader('Content-Type', 'application/json');
  var data = {
    title: t,
    blog: pad.value,
    name: whodat,
    pass: secret
  }

  http.send(JSON.stringify(data));
}







