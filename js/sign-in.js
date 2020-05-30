var SignModule = angular.module('SignModule', []);

SignModule.controller('SignController', function($scope, $http){ //tijelo kontrolera
		$scope.username = "";
		$scope.password = "";
		$scope.rememberMe = false;
		$scope.baseUrl = window.location.protocol + '//' + window.location.host;
		$http.defaults.headers.post["Content-Type"] = "application/json";
		$scope.Login = function() {
			$http({
				method: 'POST',
				url: $scope.baseUrl + "/Projekt/api/action.php",
				data: JSON.stringify({				
					username: $scope.username,
					password: $scope.password,
					rememberMe: $scope.rememberMe,
					jsonid: "checkUserLogin"
				})
			}).then(function successCallback(response) {
						if(response.data.status === 'redirect' && response.data.userLoggedIn == 'true') {// Check all condition
							location.href =  $scope.baseUrl + response.data.route;
						}
						else {
							alert('Korisničko ime i/ili zaporka nije valjano.')
						}
				}, function errorCallback(response) {
					console.log("Greska");
				});
		};
		$scope.rememberMeChange = function() {
			if($scope.rememberMe == false)
			{
				$scope.rememberMe = true;
			} else {
				$scope.rememberMe = false;
			}
		};
});



// function LoadRooms()
// {
// 	$.ajax(
// 		{
// 			url:'action.php?jsonid=get_all_rooms',
// 			type:'GET',
// 			success:function (oData)
// 			{
// 				var oData = JSON.parse(oData);
// 				$('.table tbody').empty();
// 				for(var i=0; i<oData.length; i++)
// 				{
// 					var sTr = 	'<tr>'+
// 									'<td>'+i+'.</td>'+
// 									'<td>'+oData[i].naziv+'</td>'+
// 									'<td>'+oData[i].opis+'</td>'+
// 									'<td>'+oData[i].kat+'</td>'+
// 									'<td>';
// 									for(var j=0; j<oData[i].Studenti.length; j++)
// 									{
// 										sTr += oData[i].Studenti[j].ime + ' ' + oData[i].Studenti[j].prezime;
// 									}
									
// 									sTr += '</td>'+'</tr>';
// 					$('.table tbody').append(sTr);
	
// 				}
// 			}
// 		});
// };
// $(document).ready(function ()
// {
// 	LoadRooms();
// });
