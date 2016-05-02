

window.onload = function() {

  // do get request to pull all the titles from mongo
  var titles = [];
  var titleCont;

  var http = new XMLHttpRequest();
  var url = 'http://' + location.hostname + ':8000/api/titles';
  http.onreadystatechange = function() {
    if (http.readyState === 4 && http.status === 200){
      var msg = JSON.parse(http.response);
      populateList(msg);
    }
  }

  http.open('GET', url, true);
  http.setRequestHeader('Content-Type', 'application/json');
  http.send();
}

// stick them all in #stickit
function populateList(msg) {
  titleCont = document.getElementById('stickit');

  msg.forEach(function(year, index, msg) {
    titleCont.innerHTML += year.year + "<br>";
    insertPostLinks(titleCont, year);
    //titleCont.interHTML += '<br>';
  });
}

function insertPostLinks(container, year) {
  year.posts.forEach(function(post, index, yearposts) {
    container.innerHTML += "- " + post.title + "<br>";
  });
}




















