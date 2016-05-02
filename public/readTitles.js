

window.onload = function() {

  // do get request to pull all the titles from mongo
  var titles = [];
  var titleCont;

  var http = new XMLHttpRequest();
  var url = 'http://192.168.152.132:8000/api/titles';
  http.onreadystatechange = function() {
    console.log("send");
    if (http.readyState === 4 && http.status === 200){
      var msg = JSON.parse(http.response);
      populateList(msg);
    }
  }

  http.open('GET', url, true);
  http.setRequestHeader('Content-Type', 'application/json');
  http.send();

  // stick them all in #stickit
}


function populateList(msg) {
  titleCont = document.getElementById('stickit');
  console.log(msg.length);
  for (var i = 0; i < msg.length; ++i) {
    console.log(msg[i].title);
    titleCont.innerHTML += msg[i].title;
    titleCont.innerHTML += '<br>';
  }
}
