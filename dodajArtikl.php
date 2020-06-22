<!DOCTYPE html>
<html lang="en" ng-app="skladisteModule">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <meta name="author" content="ASxCRO">
  <meta name="keywords" content="Gradnja, Visokogradnja, Niskogradnja, Građevinske usluge">
  <meta name="description" content="Gradite kuću? Vaš pravi izbor je VŠMTI GRADNJA d.o.o. !">
  <meta name="robots" content="all">
  <link rel="stylesheet" href="./fonts/fontawesome/css/all.min.css">
  <link rel="stylesheet" href="./bundle/animateCSS/animate.min.css">
  <link rel="stylesheet" type="text/css" href="./bundle/semanticUI/dist/semantic.min.css">
  <link rel="stylesheet" href="./bundle/dataTables/datatables.min.css">
  <link rel="stylesheet" href="./bundle/dataTables/DataTables-1.10.21/css/dataTables.semanticui.min.css">
  <link rel="stylesheet" href="./bundle/dataTables/DataTables-1.10.21/css/jquery.dataTables.min.css">
  <link rel="stylesheet" href="./css/style.css">
  <link rel="stylesheet" href="./css/skladiste.css">
  <link rel="stylesheet" href="./css/dodajArtikl.css">
  <link rel="stylesheet" media="screen and (max-width:768px)" href="./css/mobile.css">
  <title>VŠMTI GRADNJA | Visokogradnja, Niskogradnja, i usluge!</title>

  <style>
    .btn.btn-primary.btn-lg:hover {
      cursor: pointer;
    }

    .text-align {
      text-align:center;
    }
  </style>
</head>

<body ng-controller="skladisteController">

  <!-- Navbar -->
  <navbar-skladiste></navbar-skladiste>

  <?php 
session_start();
if(isset($_SESSION['login'])) { 

echo '<section id="showcase">
<div class="showcase-content">
<div class="container">
<span class="add-header">
<div class="plus-icon" style="display: inline;"><i class="fas fa-plus-circle fa-5x"></i></div>
<h2 class="l-heading" style="display: inline; padding: 2rem 2rem;">Dodaj novi artikl</h2>
<div class="plus-icon" style="display: inline;" onclick="window.history.back()"><i class="fas fa-arrow-left fa-5x"></i><span style="font-size: 2rem;">  Povratak</span></div>
        </span>
        <hr>
        <form action="#">
        <div class="flex-container">
            <div class="ui input">
            <input type="text" placeholder="Naziv" ng-model="nazivNovogArtikla">
            </div>
            <select name="singleSelectJmj" ng-model="dataJmj.singleSelectJmj" class="ui search dropdown">
            <option value="kom/m2" selected>kom/m2</option>
            <option value="kom">kom</option>
            <option value="cm">cm</option>
              <option value="kg">kg</option>
              <option value="m2">m2</option>
              <option value="m3">m3</option>
              <option value="kg/m3">kg/m3</option>
              </select>
              <div class="ui input">
              <input class="money" type="text" step="0.01" placeholder="Cijena" id="cijenaNovogArtikla">
              </div>
              <select name="singleSelectGroup" ng-model="dataGroup.singleSelectGroup" class="ui search dropdown">
              <option value="VG" selected>Visokogradnja</option>
              <option value="NG">Niskogradnja</option>
              <option value="UU">Unutarnje uređenje</option>
              <option value="VPU">Vanjsko prostorno uređenje</option>
              </select>
            <a class="btn btn-primary btn-lg" ng-click="modalZaSpremanjeArtikala()"><div class="plus-icon-add"><i class="fas fa-plus-circle fa-5x"></i><span style="margin-left: 1rem;"> Dodaj </span></div></a>
            </div>
        </form>
        <hr>
        </div>
        </div>
    
        
        </section>
        
        <div class="ui basic modal">
        <div class="ui icon header">
      <i class="archive icon"></i>
      Jeste li sigurni da želite spremiti novi artikl sa upisanim podatcima?
    </div>
    <div class="content text-align">
    <p>Nije moguće zaustaviti spremanje!</p>
    </div>
    <div class="actions">
    <div class="ui red basic cancel inverted button">
    <i class="remove icon"></i>
    Ne
    </div>
    <div class="ui blue ok inverted button">
    <i class="checkmark icon"></i>
    Da
    </div>
    </div>
    </div>';
} else {
  echo '
  <section id="showcase">
  <div class="showcase-content-skladiste">
  <section id="tabs" class="text-primary">
  <div class="ui top attached tabular menu">
  <a class="item active" data-tab="first">Skladište</a>
  </div>
  <div class="ui bottom attached tab segment active" data-tab="first" id="skladisteTabContent">
  
  <div class="flex-container">
  <div class="home-header">
  <h2 class="l-heading">Da bi pristupili skladištu, morate se prijaviti.</h2>
  </div>
<a href="./sign.html" class="btn btn-primary btn-lg">Prijava</a>
</div>
</div>
</section>
</div>
</section>';
}
    ?>



  <!-- Footer -->
  <footer id="footer" class="bg-light text-center">
    <p>Copyright &copy; 2020, ASXCRO. All Rights Reserved.</p>
  </footer>
  
  

  <div id="scripts">
    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script>
      jQuery(function($){
        $.datepicker.regional['hr'] = {
          closeText: 'Zatvori',
          prevText: 'Prethodni mjesec',
          nextText: 'Slijedeći mjesec',
          currentText: 'Danas',
            monthNames: ['Siječanj','Veljača','Ožujak','Travanj','Svibanj','Lipanj',
            'Srpanj','Kolovoz','Rujan','Listopad','Studeni','Prosinac'],
            monthNamesShort: ['Sij.','Velj.','Ožu.','Tra.','Svi.','Lip.',
            'Srp.','Kol.','Ruj.','Lis.','Stu.','Pro.'],
            dayNames: ['Nedjelja','Ponedjeljak','Utorak','Srijeda','Četvrtak','Petak','Subota'],
            dayNamesShort: ['Ned.','Pon.','Uto.','Sri.','Čet.','Pet.','Sub.'],
            dayNamesMin: ['N','P','U','S','Č','P','S'],
            weekHeader: 'Tjedan',
            dateFormat: 'dd.mm.yy',
            firstDay: 1,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: ''};
            $.datepicker.setDefaults($.datepicker.regional['hr']);
          });
        </script>
        
    <script src="./bundle/jquery/jquery.mask.js"></script>

    <!-- AngularJS -->
    <script src="./bundle/angularJS/angular.min.js"></script>
    <script src="./bundle/angularJS/angular-route.min.js"></script>
  
    <!-- DataTables PlugIn -->
    <script src="./bundle/dataTables/DataTables-1.10.21/js/jquery.dataTables.min.js"></script>
    <script src="./bundle/dataTables/DataTables-1.10.21/js/dataTables.semanticui.min.js"></script>
    
    <!-- Semantic UIJS -->
    <script src="./bundle/semanticUI/dist/semantic.min.js"></script>
  
    <!-- Globals -->
    <script src="./js/globals.js"></script>
    <!-- Local JS  -->
    <script src="./js/skladiste.js"></script>
  </div>
</body>

</html>