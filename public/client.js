var hackTask = (function() {
  //Cache dom
  var body = document.querySelector('body');
  body.className = 'list-group';

  function _render(result) {
    var jobs = result.jobs;
    jobs.forEach(job => {
      var newJob = new _Job(job);
      body.appendChild(newJob.jobContainer);
    });
  }

  function _xhrRequest(method, url, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var parsedResult = JSON.parse(xhttp.responseText);
        callback(parsedResult);
      }
    };
    xhttp.open(method, url, true);
    xhttp.send();
  }

  function _createElement(tagName, text, className) {
    var element = document.createElement(tagName);
    if (text) {
      element.appendChild(document.createTextNode(text));
    }
    if (className) {
      element.className = className;
    }
    return element;
  }

  function init() {
    window.addEventListener('DOMContentLoaded', function() {
      _xhrRequest('GET', 'http://localhost:5000/jobs', _render);
    });
  }

  var _Job = function(job) {
    //create container,title and description
    this.jobContainer = _createElement('div', null, 'list-group-item');
    this.titleElement = _createElement('h2', 'Title: ' + job.jobTitle);
    this.descriptionElement = _createElement('p', job.jobDescription, 'hidden');
    this.jobContainer.appendChild(this.titleElement);
    this.jobContainer.appendChild(this.descriptionElement);
    this.titleElement.addEventListener('click', () => {
      this.descriptionElement.classList.toggle('hidden');
    });
  };

  return {
    init: init
  };
})();

hackTask.init();
