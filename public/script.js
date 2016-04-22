
hljs.initHighlightingOnLoad();  // is this what I do?

// public/script.js
window.onload = function() {

  // showdown converter can be used to convert between markdown and html
  var converter = new showdown.Converter();
  var pad = document.getElementById('pad');
  var markdownArea = document.getElementById('markdown');

  // convert the markdown text from the pad to html and put it in the markdownArea
  var convertTextAreaToMarkdown = function() {
    var markdownText = pad.value;
    html = converter.makeHtml(markdownText);
    markdownArea.innerHTML = html;

    // we also want to run hihglight syntax
   hljs.initHighlighting.called = false;
   hljs.initHighlighting();
  };

  pad.addEventListener('input', convertTextAreaToMarkdown);

  convertTextAreaToMarkdown();

}
