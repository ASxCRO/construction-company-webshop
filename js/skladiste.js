$('.menu .item').tab();

function twoDigits(d) {
  if(0 <= d && d < 10) return "0" + d.toString();
  if(-10 < d && d < 0) return "-0" + (-1*d).toString();
  return d.toString();
}

Date.prototype.toMysqlFormat = function() {
  return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()+2) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
};

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
        $http({
          method: 'POST',
          url: $scope.baseUrl + "/Projekt/api/action.php",
          data: JSON.stringify({				
            jsonid: "get_all_articles_with_state"
          })
        }).then(function successCallback(response) {
            $ArtikliSaTrenutnimStanjem = response.data;

            for (let i = 0; i < $scope.aStanje.length; i++) {
              var artikl = $scope.aStanje[i];
              for (let j = 0; j < $ArtikliSaTrenutnimStanjem.length; j++) {
                var artiklSaStanjem = $ArtikliSaTrenutnimStanjem[j];
                if(artikl.m_id == artiklSaStanjem.id_art)
                {
                  $('#stanjeTablica').dataTable().fnAddData( [
                    artikl.m_id,
                    artikl.m_naziv,
                    artikl.m_grupa,
                    artikl.m_jmj,
                    artikl.m_cijena,
                    artiklSaStanjem.stanje,
                    artiklSaStanjem.stanje * artikl.m_cijena] );
                }
              }
            }
          }, function errorCallback(response) {
            console.log("Greska");
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
        console.log(response.data);
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
          if(JSON.parse(localStorage.getItem("artikliNaDokumentu")).length == 0 || JSON.parse(localStorage.getItem("artikliNaDokumentu")) == null)  {
    
          } else {
            poljeArtikala =  JSON.parse(localStorage.getItem("artikliNaDokumentu"));
    
          }


          for (var i = 0; i < $scope.aArticles.length; i++) {
            for (var j = 0; j < poljeArtikala.length; j++) {
              if ($scope.aArticles[i].m_id == poljeArtikala[j].m_id) {
                var index = $scope.aArticles.indexOf($scope.aArticles[i]);
                if (index != -1) {
                  $scope.aArticles.splice(index, 1);
                }
              }
            }
          }



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
    };


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
    };
    
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


    };
    
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

    };

    $scope.deleteArticleFromList = function (id) {
      var poljeArtikala = [];
      if(JSON.parse(localStorage.getItem("artikliNaDokumentu")).length == 0)  {

      } else {
        poljeArtikala =  JSON.parse(localStorage.getItem("artikliNaDokumentu"));

      }
      for (let j = 0; j < poljeArtikala.length; j++) {
        let article = poljeArtikala[j];
        console.log(poljeArtikala);
        console.log(article.m_id+" "+id);
        if(article.m_id == id)
        {
          console.log("true");
          var index = poljeArtikala.indexOf(article);
          poljeArtikala.splice(index,1);
          localStorage.setItem("artikliNaDokumentu", JSON.stringify(poljeArtikala));
          $scope.aArticles = JSON.parse(localStorage.getItem("artikliNaDokumentu"));
           location.reload();
        }
      }
    };

    $scope.saveDocumentWithArticles = function (tipDokumenta)
    {
      var poljeArtikala = [];
      tipDokumenta == "0" ? poljeArtikala = $scope.artikliNaDokumentuPrimke : poljeArtikala = $scope.artikliNaDokumentuIzdatnice;
      
      $http({
        method: 'POST',
        url: $scope.baseUrl + "/Projekt/api/action.php",
        data: JSON.stringify({				
          jsonid: "save_document",
          articles: JSON.stringify(poljeArtikala),
          type: tipDokumenta,
          date:  new Date().toMysqlFormat(),
          amount: $scope.getTotal(poljeArtikala),
          articlesAmount: JSON.stringify($scope.kolicina) 
        })
      }).then(function successCallback(response) {
          alert("Saving to db went well? - " + response.data);
          $scope.aArticles.length = 0;
          localStorage.setItem("artikliNaDokumentu", "[]");
          localStorage.removeItem("tipDokumenta");
          window.location.pathname="/Projekt/skladiste.php";
      }, function errorCallback(response) {
        console.log("Greska");
      });
    };

    $scope.modalZaSpremanjeDokumenta = function(td) {
      $('.ui.modal')
      .modal({
        closable  : false,
        onDeny    : function(){
          $(this).modal('hide');
          return false;
        },
        onApprove : function() {
          if(td == "0") {
            $scope.saveDocumentWithArticles('0');
          } else if (td == "1") {
            $scope.saveDocumentWithArticles('1');
          }
        }
      })
      .modal('show');
    };

    $scope.SaveArticle = function ($naziv,$jmj,$cijena,$grupa)
    {
      $http({
        method: 'POST',
        url: $scope.baseUrl + "/Projekt/api/action.php",
        data: JSON.stringify({				
          jsonid: "save_article",
          naziv: $naziv,
          jmj:  $jmj,
          price: $cijena,
          grupa: $grupa
        })
      }).then(function successCallback(response) {
          alert("Saving article to db went well? - " + response.data);
          window.location.pathname="/Projekt/skladiste.php";
      }, function errorCallback(response) {
        console.log("Greska");
      });
    };

    $scope.modalZaSpremanjeArtikala = function() {
      console.log($scope.nazivNovogArtikla+" "+$scope.dataJmj.singleSelectJmj+" "+$scope.cijenaNovogArtikla+" "+$scope.dataGroup.singleSelectGroup);
      $('.ui.modal')
      .modal({
        closable  : false,
        onDeny    : function(){
          $(this).modal('hide');
          return false;
        },
        onApprove : function() {
            
            $scope.SaveArticle($scope.nazivNovogArtikla,$scope.dataJmj.singleSelectJmj,$scope.cijenaNovogArtikla, $scope.dataGroup.singleSelectGroup);
        }
      })
      .modal('show');
    };

    $scope.nazivNovogArtikla = "";
    $scope.cijenaNovogArtikla = "";
  
    $scope.dataGroup = {
      singleSelectGroup: null,
      option1: 'VG'
    };
  
    $scope.dataJmj = {
      singleSelectJmj: null,
      option1: 'cm'
    };
  
  });




