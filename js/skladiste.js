$('.menu .item').tab();

function RemoveActiveTab()
{
  var activeTabHeader = $('.item.active')[0];
  var activeTabContent= $('.segment.active')[0];
  $(activeTabHeader).removeClass('active');
  $(activeTabContent).removeClass('active');
}

function RedirectToStanjeTab()
{
  RemoveActiveTab();
  let stanjeTabHeader = $('#stanjeTabHeader');
  let stanjeTabContent = $('#stanjeTabContent');
  $(stanjeTabHeader).addClass('active');
  $(stanjeTabContent).addClass('active');

}

function RedirectToDokumentiTab()
{
  RemoveActiveTab();
  let dokumentiTabHeader = $('#dokumentiTabHeader');
  let dokumentiTabContent = $('#dokumentiTabContent');
  $(dokumentiTabHeader).addClass('active');
  $(dokumentiTabContent).addClass('active');
}


$.extend( true, $.fn.dataTable.defaults, {
  "ordering": false,
      "info":     false,
      "filter": false,
      "search": false,
      "lengthChange": true,
      order: [[ 2, "desc" ]],
      stateSave: true,
      "language": {
        "decimal": ".",
        "thousands": ",",
        "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Croatian.json"
      },
      "dom": '<"top"i>t<"bottom"flp><"clear">',
      "lengthMenu": [[2, 4, 6,8], [2, 4, 6,8]],
    "pageLength":8,

      responsive: true
} );
$(document).ready(function() {
   $('#stanjeTablica').DataTable().columns.adjust();
   $('#dokumentiTablica').DataTable().columns.adjust();
});

var SkladisteModule = angular.module('skladisteModule', []);
SkladisteModule.controller('skladisteController', function($scope, $http){
    angular.element(document).ready(function () {
        $scope.LoadStanje();
        $scope.LoadDocuments();
    });
    $scope.aStanje = [];
    $scope.aDocuments = [];
    $scope.baseUrl = window.location.protocol + '//' + window.location.host;
		$http.defaults.headers.post["Content-Type"] = "application/json";
		$scope.LoadStanje = function() {
			$http({
				method: 'POST',
				url: $scope.baseUrl + "/Projekt/api/action.php",
				data: JSON.stringify({				
					jsonid: "get_all_articles"
				})
			}).then(function successCallback(response) {
          $scope.aStanje = response.data;
          $scope.aStanje.forEach(element => {
            $('#stanjeTablica').dataTable().fnAddData( [
              element.m_id,
              element.m_naziv,
              element.m_grupa,
              element.m_cijena,
              "",
              "" ] );
          
          });

				}, function errorCallback(response) {
					console.log("Greska");
				});
		};
		$scope.LoadDocuments = function() {
			$http({
				method: 'POST',
				url: $scope.baseUrl + "/Projekt/api/action.php",
				data: JSON.stringify({				
					jsonid: "get_all_documents"
				})
			}).then(function successCallback(response) {
          $scope.aDocuments = response.data;
          $scope.aDocuments.forEach(element => {
            $('#dokumentiTablica').dataTable().fnAddData( [
              element.m_id,
              element.m_vrsta,
              element.m_datum,
              "",
              element.m_iznos] );
          });
				}, function errorCallback(response) {
					console.log("Greska");
				});
		};
		
});
