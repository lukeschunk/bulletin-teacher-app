bulletinApp.directive('sidebarBehavior', function() {
  return {
    link: function(scope, elem, attrs) {
      $(function() {
        console.log('directive active')
        $(elem).find('.student-name').click(function() {
          $()
        })
      });
    }
  }

})
