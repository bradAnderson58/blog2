hljs.initHighlightingOnLoad();
var baseUrl = 'http://' + location.hostname;

window.onload = function() {

  // do get request to pull all the titles from mongo
  var titles = [];
  var titleCont;

  var http = new XMLHttpRequest();
  var url = baseUrl + '/api/titles';
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
  // page loads with the most recent post open
  openPost(msg[0].posts[0].title);

  msg.forEach(function(year, index, msg) {
    var yearspan = document.createElement('div');
    yearspan.addEventListener('click', toggleListSize);
    insertHeaderSpan(yearspan, year.year);

    // put all the posts in this span so we can collapse them
    var postspan = document.createElement('div');
    postspan.className += 'bp-postlist';
    postspan.style.display = 'none';

    insertPostLinks(postspan, year);
    yearspan.appendChild(postspan);

    titleCont.appendChild(yearspan);
  });
}

// add a post link to a container
function insertPostLinks(container, year) {
  year.posts.forEach(function(post, index, yearposts) {

    var linkPost = document.createElement('a');
    linkPost.className += 'bp-postlist-item';

    var linkText = document.createTextNode(post.title);
    linkPost.appendChild(linkText);
    linkPost.href = 'javascript:openPost("'+post.title+'")';

    container.appendChild(linkPost);
    container.innerHTML += "<br>";
  });
}

// add a header to a container
function insertHeaderSpan(container, contents) {
  var headerspan = document.createElement('div');
  headerspan.className += 'bp-headeryear';
  headerspan.innerHTML += contents;

  container.appendChild(headerspan);
}

// callback to hide or show post list
function toggleListSize() {
  console.log(this.getElementsByClassName('bp-postlist'));
  var postlist = this.getElementsByClassName('bp-postlist')[0];

  if (postlist.style.display === 'none')
    postlist.style.display = 'block';
  else
    postlist.style.display = 'none';
}

function openPost(name) {
  console.log(name);
  var http = new XMLHttpRequest();
  name = doEncode(name);
  var url = baseUrl + '/api/getpost?title='+name;
  http.onreadystatechange = function() {
    if (http.readyState === 4 && http.status === 200){
      var msg = JSON.parse(http.response);
      var markdownArea = document.getElementsByClassName('bp-poast')[0];
      var converter = new showdown.Converter();

      html = converter.makeHtml(msg[0].blog);
      markdownArea.innerHTML = html;

      // we also want to run highlight syntax
      hljs.initHighlighting.called = false;
      hljs.initHighlighting();

    }
  }

  http.open('GET', url, true);
  http.setRequestHeader('Content-Type', 'application/json');
  http.send(name);
}

function doEncode(name) {
  var alt = '';
  for(var c in name) {
    if (name.charAt(c) === '+')
      alt += '%2B';
    else
      alt += name.charAt(c);
  }
  console.log(alt);
  return alt;
}



















