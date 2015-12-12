bulletinApp.directive('backImg', function() {
  return function(scope, element, attrs) {
    var url = attrs.backImg;
    element.css({
      'background-image': 'url('+ url + ')',
      'background-size': 'cover',
      'width': '60px',
      'height': '60px',
      'display': 'inline-block'
    });
  };
});
