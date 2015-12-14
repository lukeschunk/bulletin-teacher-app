bulletinApp.directive('testdir', function() {
  return function(scope, element, attrs) {
    var url = attrs.testdir;
    element.css({
      'background-image': 'url('+ url + ')',
      'background-size': 'cover',
      'width': '100px',
      'height': '100px',
      'display': 'block'
    });
  };
});
