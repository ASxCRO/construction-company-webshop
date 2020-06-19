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
  <link rel="stylesheet" href="./css/dodajArtiklNaDokument.css">
  <link rel="stylesheet" media="screen and (max-width:768px)" href="./css/mobile.css">
  <title>VŠMTI GRADNJA | Visokogradnja, Niskogradnja, i usluge!</title>
</head>

<body ng-controller="skladisteController">

  <!-- Navbar -->
  <navbar-skladiste></navbar-skladiste>

  <?php 
session_start();
if(isset($_SESSION['login'])) { 
  
  echo '<section id="showcase">
    <div class="showcase-content-skladiste">
      <section id="tabs" class="text-primary">
          <div class="ui top attached tabular menu">
            <a class="item active" data-tab="first">Dodaj Artikl Na Dokument</a>
          </div>
          <div class="ui bottom attached tab segment active" data-tab="first" id="skladisteTabContent">
            
            <div class="header">
              <h2 class="l-heading">Artikli</h2>
              <div class="plus-icon" onclick="window.history.back()"><i class="fas fa-arrow-left fa-5x"></i><span> Povratak</span></div>
            </div>
            <div>
              <table class="display cell-border hover row-border stripe" id="artikliTablica">
                <thead>
                  <tr>
                    <th>Oznaka</th>
                    <th>Naziv</th>
                    <th>JMJ</th>
                    <th>Cijena</th>
                    <th>Grupa</th>
                    <th>Uredi Artikl</th>
                    <th>Dodaj</th>
                  </tr>
                </thead>
                <tbody>
                 
                </tbody>
              </table>
            </div>
          </div>
      </section>
    </div>
  </section>';
}
else {
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
<div class="ui basic modal" id="modalEditArticle">

  </div>


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
  
    <!-- AngularJS -->
    <script src="./bundle/jquery/jquery.mask.js"></script>
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