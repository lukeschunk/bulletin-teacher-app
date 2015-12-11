bulletinApp.directive('backImg', function() {
  return function(scope, element, attrs) {
    var url = attrs.backImg;
    element.css({
      'background-image': 'url('+ url + ')',
      'background-size': 'cover',
      'width': '80px',
      'height': '80px',
      'display': 'inline-block'

    });
  };
});
