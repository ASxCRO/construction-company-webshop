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
  "ordering": true,
      "info":     false,
      "filter": true,
      "search": true,
      "lengthChange": true,
      order: [[ 0, "asc" ]],
      stateSave: false,
      "language": {
        "decimal": ".",
        "thousands": ",",
        "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Croatian.json"
      },
      "dom": '<"top"i>t<"bottom"lp><"clear">',
      "lengthMenu": [[2, 4, 6,8], [2, 4, 6,8]],
    "pageLength":8,

      responsive: true
} );

window.addEventListener('DOMContentLoaded', function(){

});

$(document).ready(function() {

    $.datepicker.setDefaults( $.datepicker.regional[ "hr" ] );
    $( function() {
      $( "#datumStvaranja" ).datepicker(
      {   
        onSelect: function (date) {
          dokumenti.columns(2).search( this.value ).draw();

    }});

  $('.money').mask("000,000,000.00", {reverse: true});

} );


 var stanje = $('#stanjeTablica').DataTable().columns.adjust();
  var dokumenti = $('#dokumentiTablica').DataTable().columns.adjust();
  $('#artikliTablica').DataTable().columns.adjust();
  aArticlesOnDocument = localStorage.getItem("artikliNaDokumentu");

  $.fn.dataTable.ext.search.push(
    function( settings, data, dataIndex ) {
        var min = parseInt( $('#cijenaOd').val(), 10 );
        var max = parseInt( $('#cijenaDo').val(), 10 );
  
        var cijena = parseFloat( data[4] );

  
        if ( ( isNaN( min ) && isNaN( max ) ) ||
             ( isNaN( min ) && cijena <= max ) ||
             ( min <= cijena   && isNaN( max ) ) ||
             ( min <= cijena   && cijena <= max ))
        {
            return true;
        }
        return false;
    }
  );

              $.fn.dataTable.ext.search.push(
                function( settings, data, dataIndex ) {
                    var min = parseInt( $('#artikNaStanjuHidden').val(), 10 );
                    var max = parseInt( 1000000, 10 );
                    var naStanju = parseFloat( data[5] ) || 0; // use data for the age column
            
                    if ( ( isNaN( min ) && isNaN( max ) ) ||
                         ( isNaN( min ) && naStanju <= max ) ||
                         ( min != 0   && isNaN( max ) ) ||
                         ( min != naStanju   && naStanju <= max ) )
                    {
                        return true;
                    }
                    return false;
                }
            );



  
  $('#cijenaOd,#cijenaDo').keyup( function() {
    stanje.draw();
 });
  $('#oznakaArtikla').keyup( function() {
   stanje.columns(0).search( this.value ).draw();
 });
  $('#nazivArtikla').keyup( function() {
   stanje.columns(1).search( this.value ).draw();
 });
  $('#grupaProizvoda').change( function() {
   stanje.columns(2).search( this.value ).draw();
 });

$.fn.dataTable.ext.search.push(
  function( settings, data, dataIndex ) {
    var min = parseInt( $('#kolicinaOd').val(), 10 );
    var max = parseInt(  $('#kolicinaDo').val(), 10 );

      var kolicina = parseFloat( data[4] );


      if ( ( isNaN( min ) && isNaN( max ) ) ||
           ( isNaN( min ) && kolicina <= max ) ||
           ( min <= kolicina   && isNaN( max ) ) ||
           ( min <= kolicina   && kolicina <= max ))
      {
          return true;
      }
      return false;
  }
);

 $('#oznakaDokumenta').keyup( function() {
  dokumenti.columns(0).search( this.value ).draw();
});

$('#kolicinaOd,#kolicinaDo').keyup( function() {
  dokumenti.draw();
});

 $('#vrstaDokumenta').change( function() {
  dokumenti.columns(1).search( this.value ).draw();
});

        $('#artikNaStanju').change(function() {
          if(this.checked) {
            $('#artikNaStanjuHidden').val("1");
            $(this).attr('checked', true);
            stanje.draw();
          } else
          {
            $('#artikNaStanjuHidden').val("0");
            $(this).removeAttr('checked');
            stanje.draw();

          }
        });
});



var SkladisteModule = angular.module('skladisteModule', ['ngRoute']);


SkladisteModule.config(function($routeProvider){
  $routeProvider.when('/', {
    templateUrl: 'index.html',
    controller: 'skladisteController'
  }).when('/skladiste', {
    templateUrl: 'skladiste.php',
    controller: 'skladisteController'
  }).when('/dodajDokument', {
    templateUrl: 'dodajDokument.php',
    controller: 'skladisteController'
  }).when('/dodajArtiklNaDokument', {
    templateUrl: 'dodajArtiklNaDokument.php',
    controller: 'skladisteController'
  }).when('/dodajArtikl', {
    templateUrl: 'dodajArtikl.php',
    controller: 'skladisteController'
  }).otherwise({redirectTo: '/'})
});


SkladisteModule.directive("navbarSkladiste", function () {
  return {
      restrict: "E",
      templateUrl : "templates/navbar-skladiste-loggedIn.php"
  };
});



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
    
    $scope.GetModal  = function (sHref,selector) {
      try {
        switch(selector) {
          case "showDocumentArticles":
            $('.ui.modal#artikliOdabranogDokumenta')
            .modal('show').load(sHref)
          ;
            break;
          case "modalEditArticle":
            $('.ui.modal#modalEditArticle')
            .modal({
              closable  : false,
              onDeny    : function(){
                $(this).modal('hide');
                return false;
              },
              onApprove : function() {
                $scope.editArticle($('#ime-artikla-hidden').val(), $('#ime-artikla').val(), $('#cijena-artikla').val().split(',').join(''));
                $(this).modal('hide');
  
              }
            })
            .modal('show').load(sHref)
          ;
            break;
          default:
            break;
        
        }
      } catch (error) {
        alert('error');
      }
    }
  

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
                    $scope.convertToMoney(artiklSaStanjem.stanje * artikl.m_cijena)] );
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
            let btnhtml = "    <div class='kolicina'> <button class='ui primary button' ng-click='modalZaStorniranjeDokumenta("+element.m_id+")'>   Storniraj  </button>         </div>";
            let temp = $compile(btnhtml)($scope);
            var vrstaDokumenta = function() { if(element.m_vrsta == 0){return "Primka"}else{return "Izdatnica"}};
            $('#dokumentiTablica').dataTable().fnAddData( [
              element.m_id,
              vrstaDokumenta, 
              element.m_datum.substr(0,10).split('-').reverse().join('.'),
              "<i class='fab fa-wpexplorer fa-2x clickBait' aria-hidden='true' onclick=\"GetModal(\'http://localhost/Projekt/modals.php?modal_id=showDocumentArticles&data_id="+element.m_id+"\','showDocumentArticles');\"></i>",
              $scope.convertToMoney(Math.abs(element.m_iznos)),
              "<span class='stornirajDokument' id='"+element.m_id+"'></span>"] 
            );
            let selector = '#' + element.m_id;
            angular.element($(selector)).append(temp);

          });
				}, function errorCallback(response) {
					console.log("Greska");
				});
    };

    $scope.stornirajDokument = function (iddoc)
    {
      $http({
        method: 'POST',
        url: $scope.baseUrl + "/Projekt/api/action.php",
        data: JSON.stringify({				
          jsonid: "storniraj_dokument",
          id: iddoc,
        })
      }).then(function successCallback(response) {
          if(response.data == 1) {
            alert('Uspješno ste stornirali dokument!');
            var dokumentiTablica  = $('#dokumentiTablica').DataTable();
            dokumentiTablica.clear().draw();
            dokumentiTablica.columns.adjust().draw(); // Redraw the DataTable
            $scope.LoadDocuments();
            setTimeout(() => {
              dokumentiTablica.columns.adjust().draw(); // Redraw the DataTable
            }, 200);
          }
          else {
            alert("Greška. Nešto je pošlo po zlu pri uklanjanju dokumenta iz baze!")
          }
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
          if(JSON.parse(localStorage.getItem("artikliNaDokumentu")) != undefined)
          {
            if(JSON.parse(localStorage.getItem("artikliNaDokumentu")).length == 0 || JSON.parse(localStorage.getItem("artikliNaDokumentu")) == null)  {
      
            } else {
              poljeArtikala =  JSON.parse(localStorage.getItem("artikliNaDokumentu"));
      
            }
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
            let btnhtml = "<i class='fas fa-plus-circle fa-2x addArticleToDocumentTd' ng-click='addArticleToDocument("+article.m_id+")'></i>";
            let btnedithtml = "<i class='fas fa-edit fa-2x addArticleToDocumentTd'  ng-click=\"GetModal(\'http://localhost/Projekt/modals.php?modal_id=modalEditArticle&data_id="+article.m_id+"\','modalEditArticle');\"></i>";
            let temp = $compile(btnhtml)($scope);
            let tempedit = $compile(btnedithtml)($scope);

            $('#artikliTablica').dataTable().fnAddData( [
              article.m_id,
              article.m_naziv,
              article.m_jmj,
              article.m_cijena,
              article.m_grupa,
              "",
              ""
            ]);
            angular.element($('#artikliTablica tr:last-child td:last-child')).append(temp);
            angular.element($('#artikliTablica tr:last-child td:nth-child(6)')).append(tempedit);

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
      return parseFloat(total).toFixed(2) || parseFloat(0).toFixed(2);
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
          if(window.location.pathname == "/Projekt/dodajDokument.php") {
            RedirectToNewIzdatnica();
          }
          break;
        case "primka":
          $scope.artikliNaDokumentuPrimke = $scope.artikliNaDokumentu;
          if(window.location.pathname == "/Projekt/dodajDokument.php") {
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
      window.location.pathname = '/Projekt/dodajArtiklNaDokument.php';
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
        window.location.pathname = '/Projekt/dodajDokument.php';



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
          if(response.data == 1) {
            $scope.aArticles.length = 0;
            localStorage.setItem("artikliNaDokumentu", "[]");
            localStorage.removeItem("tipDokumenta");
            window.location.pathname="/Projekt/skladiste.php";
          }
          else {
            alert(response.data)
          }

      }, function errorCallback(response) {
        console.log("Greska");
      });
    };

    $scope.modalZaSpremanjeDokumenta = function(td) {
      var poljeArtikala = [];
      td == "0" ? poljeArtikala = $scope.artikliNaDokumentuPrimke : poljeArtikala = $scope.artikliNaDokumentuIzdatnice;
      
      var isSuccessful = ($scope.kolicina.length == poljeArtikala.length) && ($scope.kolicina.length > 0);
      if(isSuccessful) {
        $scope.kolicina.forEach(element => {
          if(parseFloat(element).toFixed(2) < 0.01) {
            isSuccessful = false;
          }
        });
      }
      $('.ui.modal')
      .modal({
        closable  : false,
        onDeny    : function(){
          $(this).modal('hide');
          return false;
        },
        onApprove : function() {
          if(isSuccessful) {
            if(td == "0") {
              $scope.saveDocumentWithArticles('0');
            } else if (td == "1") {
              $scope.saveDocumentWithArticles('1');
            }
          }
          else {
            $(this).modal('hide');
            alert("Količina artikala nije valjana. Mora biti veća od nule.")
          }
        }
      })
      .modal('show');
    };

    
    $scope.modalZaStorniranjeDokumenta = function(id) {
      $('#storniranjeDokumenta')
      .modal({
        closable  : false,
        onDeny    : function(){
          $(this).modal('hide');
          return false;
        },
        onApprove : function() {
          $scope.stornirajDokument(id);
        }
      })
      .modal('show');
    };


    $scope.convertToMoney = function(number) {
      if (isNaN(number)){
        return 0.00;
      } else {
        return parseFloat(number).toFixed(2);
      }
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
          if(response.data == 1) {
            window.location.pathname="/Projekt/skladiste.php";
          }
          else {
            alert("Greška. Nešto je pošlo po zlu pri spremanju artikla u bazu!")
          }
      }, function errorCallback(response) {
        console.log("Greska");
      });
    };

    $scope.editArticle = function (articleId, articlenaziv, articlecijena)
    {
      $http({
        method: 'POST',
        url: $scope.baseUrl + "/Projekt/api/action.php",
        data: JSON.stringify({				
          jsonid: "edit-article",
          id: articleId,
          naziv: articlenaziv,
          cijena: articlecijena
        })
      }).then(function successCallback(response) {
          if(response.data == 1) {
            var artikliTablica  = $('#artikliTablica').DataTable();
            artikliTablica.clear().draw();
            artikliTablica.columns.adjust().draw(); // Redraw the DataTable
            $scope.LoadArticles();
            setTimeout(() => {
              artikliTablica.columns.adjust().draw(); // Redraw the DataTable
            }, 200);
          }
          else {
            alert("Greška. Nešto je pošlo po zlu pri uređivanju artikla!")
          }
      }, function errorCallback(response) {
        console.log("Greska");
      });
    };

    $scope.modalZaSpremanjeArtikala = function() {
      $('.ui.modal')
      .modal({
        closable  : false,
        onDeny    : function(){
          $(this).modal('hide');
          return false;
        },
        onApprove : function() {
            $scope.SaveArticle($scope.nazivNovogArtikla,$scope.dataJmj.singleSelectJmj,$('#cijenaNovogArtikla').val().split(',').join(''), $scope.dataGroup.singleSelectGroup);
        }
      })
      .modal('show');
    };

    $scope.dataGroup = {
      singleSelectGroup: 'VG',
      groups: [{
          id: 'VG',
          name: 'Visokogradnja'
      },{
          id:'NG',
          name: 'Niskogradnja'
      },{
          id:'UU',
          name: 'Unutarnje uređenje'
      },{
        id:'VPU',
        name: 'Vanjsko prostorno uređenje'
      }]
    }

    $scope.dataJmj = {
      singleSelectJmj: 'kom',
      groups: [{
          id: 'kom/m2',
          name: 'kom/m2'
      },{
          id:'kom',
          name: 'komad'
      },{
          id:'cm',
          name: 'centimetar'
      },{
        id:'m',
        name: 'metar'
      },{
        id:'kg',
        name: 'kilogram'
      },{
        id:'m2',
        name: 'kvadrat'
      },{
        id:'m3',
        name: 'kubik'
      },{
        id:'kg/m3',
        name: 'kg/m3'
      },{
        id:'l',
        name: 'litra'
      }]
    }

    $scope.nazivNovogArtikla = "";
    $scope.cijenaNovogArtikla = "";
  
    // $scope.dataGroup = {
    //   singleSelectGroup: ["Visokogradnja","Niskogradnja","Unutarnje uređenje","Vanjsko prostorno uređenje"],
    //   option1: 'Visokogradnja'
    // };
  
    // $scope.dataJmj = {
    //   singleSelectJmj: null,
    //   option1: 'cm'
    // };
  
  });






