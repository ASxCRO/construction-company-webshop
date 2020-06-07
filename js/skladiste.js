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


function RedirectToNewPrimka()
{
  RemoveActiveTab();
  let primkaTabHeader = $('#primkaTabHeader');
  let primkaTabContent = $('#primkaTabContent');
  $(primkaTabHeader).addClass('active');
  $(primkaTabContent).addClass('active');
}



function RedirectToNewIzdatnica()
{
  RemoveActiveTab();
  let izdatnicaTabHeader = $('#izdatnicaTabHeader');
  let izdatnicaTabContent = $('#izdatnicaTabContent');
  $(izdatnicaTabHeader).addClass('active');
  $(izdatnicaTabContent).addClass('active');
}


function RedirectToIndex()
{
  window.location.pathname = "/Projekt/index.html";
  return true;
}

function differenceOf2Arrays (array1, array2) {
  var temp = [];
  array1 = array1.toString().split(',').map(Number);
  array2 = array2.toString().split(',').map(Number);
  
  for (var i in array1) {
  if(array2.indexOf(array1[i]) === -1) temp.push(array1[i]);
  }
  for(i in array2) {
  if(array1.indexOf(array2[i]) === -1) temp.push(array2[i]);
  }
  return temp.sort((a,b) => a-b);
  }
  
var aArticlesOnDocument = [];




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
   $('#artikliTablica').DataTable().columns.adjust();
   aArticlesOnDocument = localStorage.getItem("artikliNaDokumentu");

});



var SkladisteModule = angular.module('skladisteModule', []);

SkladisteModule.filter('primkaIzdatnicaFilter', function () {
  return function () {
      switch (localStorage.getItem('tipDokumenta')) {
        case "primka":
          $('#artikliIzdatnice').innerHTML = "";
          break;
        case "izdatnica":
          $('#artikliPrimke').innerHTML = "";
          break;
        default:
          break;
      }
  };
});


SkladisteModule.directive("navbarSkladiste", function () {
  return {
      restrict: "E",
      templateUrl : "templates/navbar-skladiste-loggedIn.html"
  };
});



SkladisteModule.controller('skladisteController', function($scope, $http,$compile){
    angular.element(document).ready(function () {
        $scope.LoadStanje();
        $scope.LoadDocuments();
        $scope.LoadArticles();
        
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
            var vrstaDokumenta = function() { if(element.m_vrsta == 0){return "Primka"}else{return "Izdatnica"}};
            $('#dokumentiTablica').dataTable().fnAddData( [
              element.m_id,
              vrstaDokumenta, 
              element.m_datum,
              "<i class='fab fa-wpexplorer fa-2x clickBait' aria-hidden='true' onclick=\"GetModal(\'http://localhost/Projekt/modals.php?modal_id=showDocumentArticles&data_id="+element.m_id+"\');\"></i>",
              element.m_iznos] );
          });
				}, function errorCallback(response) {
					console.log("Greska");
				});
    };

    
    
    $scope.LoadArticles = function() {
			$http({
				method: 'POST',
				url: $scope.baseUrl + "/Projekt/api/action.php",
				data: JSON.stringify({				
					jsonid: "get_all_articles"
				})
			}).then(function successCallback(response) {
          $scope.aArticles = response.data;
          var poljeArtikala = [];
          if(JSON.parse(localStorage.getItem("artikliNaDokumentu")).length == 0)  {
    
          } else {
            poljeArtikala =  JSON.parse(localStorage.getItem("artikliNaDokumentu"));
    
          }

          console.log(poljeArtikala);
          console.log($scope.aArticles);

          $scope.aArticles.forEach(artikl => {
            poljeArtikala.forEach(article => {
              if (article.m_id == artikl.m_id) {
                console.log('delete article from  scope aarticles')
                var index = $scope.aArticles.indexOf(artikl);
                console.log(index);
                if (index !== -1) {
                  console.log('sve jebeno prolazi');
                  if(index == 0) {
                    $scope.aArticles.shift();
                  } else {

                    $scope.aArticles.splice(index, 1);
                  }
                }
              }
            });
          });

          console.log($scope.aArticles);


          $scope.aArticles.forEach(article => {
            var btnhtml = "<i class='fas fa-plus-circle fa-2x addArticleToDocumentTd' ng-click='addArticleToDocument("+article.m_id+")'></i>";
            var temp = $compile(btnhtml)($scope);
            $('#artikliTablica').dataTable().fnAddData( [
              article.m_id,
              article.m_naziv,
              article.m_jmj,
              article.m_cijena,
              article.m_grupa,
              ""
            ]);
            angular.element($('#artikliTablica tr:last-child td:last-child')).append(temp);

            
          });

				}, function errorCallback(response) {
					console.log("Greska");
				});
    };

    $scope.getTotal = function(artikli){
      var total = 0;
      for(var i = 0; i < artikli.length; i++){
          var artikl = artikli[i];
          total += (artikl.m_cijena * $scope.kolicina[i]);
      }
      return total || 0;
  }

    $scope.artikliNaDokumentu = [];
    $scope.artikliNaDokumentuPrimke = [];
    $scope.artikliNaDokumentuIzdatnice = [];
    $scope.kolicina = [];


    if ($scope.artikliNaDokumentu.length == 0 && JSON.parse(localStorage.getItem("artikliNaDokumentu")) == null) {
    } else {
      $scope.artikliNaDokumentu = JSON.parse(localStorage.getItem("artikliNaDokumentu"));
      switch(localStorage.getItem("tipDokumenta"))
      {
        case "izdatnica":
          $scope.artikliNaDokumentuIzdatnice = $scope.artikliNaDokumentu; 
          if(window.location.pathname == "/Projekt/dodajDokument.html") {
            RedirectToNewIzdatnica();
          }
          break;
        case "primka":
          $scope.artikliNaDokumentuPrimke = $scope.artikliNaDokumentu;
          if(window.location.pathname == "/Projekt/dodajDokument.html") {
            RedirectToNewPrimka();
          }
          break;
        default:
          break;
      }
      console.log($scope.artikliNaDokumentu);
    }


    $scope.dodajArtiklNaDokument = function(tipDokumenta) {
      localStorage.setItem("artikliNaDokumentu", JSON.stringify($scope.artikliNaDokumentu));
      let trenutniTipDokumenta = localStorage.getItem("tipDokumenta");
      localStorage.removeItem("tipDokumenta");
      localStorage.setItem("tipDokumenta", tipDokumenta);
      let noviTipDokumenta = localStorage.getItem("tipDokumenta");
      if(trenutniTipDokumenta != noviTipDokumenta) {
        $scope.artikliNaDokumentu = [];
        localStorage.setItem("artikliNaDokumentu", JSON.stringify($scope.artikliNaDokumentu));
      }
      window.location.pathname = '/Projekt/dodajArtiklNaDokument.html';
    }
    
    $scope.addArticleToDocument = function (articleId) 
    {
      var poljeArtikala = [];
      if(JSON.parse(localStorage.getItem("artikliNaDokumentu")).length == 0)  {

      } else {
        poljeArtikala =  JSON.parse(localStorage.getItem("artikliNaDokumentu"));

      }
      $scope.getArticleById(articleId);
      setTimeout(function() {
        poljeArtikala.push(JSON.parse(localStorage.getItem('article')));
        localStorage.setItem("artikliNaDokumentu", JSON.stringify(poljeArtikala));
        window.location.pathname = '/Projekt/dodajDokument.html';



      }, 100);


    }
    
    $scope.getArticleById = function (articleId)
    {
      $http({
        method: 'POST',
        url: $scope.baseUrl + "/Projekt/api/action.php",
        data: JSON.stringify({				
          jsonid: "get_article_by_id",
          articleid: articleId
        })
      }).then(function successCallback(response) {
          localStorage.setItem('article',JSON.stringify(response.data));
      }, function errorCallback(response) {
        console.log("Greska");
      });

        
    }
    
    

});


  // $('#izdatnicaTabHeader, #primkaTabHeader').click(function(event) {
  //   $('.ui.modal')
  //   .modal({
  //     closable  : false,
  //     onDeny    : function(){
  //       $(this).modal('hide');
  //       if($('.tab.segment.active').id == "primkaTabContent") {
  //         RedirectToNewIzdatnica();
  //       } else if ($('.tab.segment.active').id == "izdatnicaTabContent") {
  //         RedirectToNewPrimka()
  //       }
  //       return false;
  //     },
  //     onApprove : function() {
  //       localStorage.removeItem("artikliNaDokumentu");
  //       localStorage.removeItem("tipDokumenta");
  //       if($('.tab.segment.active').id == "primkaTabContent") {
  //         RedirectToNewPrimka();
  //       } else if ($('.tab.segment.active').id == "izdatnicaTabContent") {
  //         RedirectToNewIzdatnica()
  //       }
  //     }
  //   })
  //   .modal('show')
  // ;
  // });
