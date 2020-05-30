<?php
session_start();
?>

<!DOCTYPE html>
<html lang='hr' ng-app="skladisteModule">

<head>
  <meta charset='UTF-8'>
  <meta name='viewport' content="width=device-width, initial-scale=1.0">
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
  <link rel="stylesheet" media="screen and (max-width:768px)" href="./css/mobile.css">
  <title>VŠMTI GRADNJA | Visokogradnja, Niskogradnja, i usluge!</title>
</head>

<body ng-controller="skladisteController">
  
  <!-- Navbar -->
  <nav id="navbar">
    <div class="ui search">
      <div class="ui icon input">
        <input class="prompt" type="text" placeholder="Što vas zanima?">
        <i class="search icon"></i>
      </div>
      <div class="results"></div>
    </div>

    <a href="skladiste.html" class="logo">
      <img src="./img/vsmtiSkladiste.png" alt="VSMTI-GRADNJA-DOO">
    </a>

    <ul>
      <li class="py-2"><a onclick="Logout()" href="./index.html"><i class="fas fa-arrow-left"></i> Odjava</a></li>
    </ul>
  </nav>

 <?php 
  if(isset($_SESSION['login'])) {
    echo "<section id='showcase'>
    <div class='showcase-content-skladiste'>
      <section id='tabs' class='text-primary'>
          <div class='ui top attached tabular menu'>
            <a class='item active' data-tab='first'>Skladište</a>
            <a class='item' data-tab='second' id='stanjeTabHeader'>Stanje</a>
            <a class='item' data-tab='third' id='dokumentiTabHeader'>Dokumenti</a>
          </div>
          <div class='ui bottom attached tab segment active' data-tab='first' id='skladisteTabContent'>
            
            <div class='flex-container'>
              <div class='home-header'>
                <h2 class='l-heading'>Dobrodošli u upravitelj skladišta</h2>
              </div>
              <a onclick='RedirectToStanjeTab()' class='btn btn-primary btn-lg'>Stanje na skladištu</a>
              <a onclick='RedirectToDokumentiTab()' class='btn btn-primary btn-lg'>Upravitelj dokumenata</a>
            </div>
          </div>
          <div class='ui bottom attached tab segment' data-tab='second' id='stanjeTabContent'>
                  <div class='header'>
                    <h2 class='l-heading'>Stanje na skladištu</h2>
                    <div class='plus-icon' onclick='window.location.pathname = \"/Projekt/dodajArtikl.html\"'><i class='fas fa-plus-circle fa-5x'></i><span> Dodaj Artikl</span></div>
                  </div>
                  <div class='filter'>
                    <i class='fas fa-filter fa-3x'></i>
                    <div class='ui input'>
                      <input type='text' placeholder='Oznaka artikla'>
                    </div>
                    <div class='ui input'>
                      <input type='text' placeholder='Naziv'>
                    </div>
                    <select class='ui search dropdown'>
                      <option value='undef'>Grupa proizvoda (sve)</option>
                      <option value='3'>Visokogradnja</option>
                      <option value='2'>Niskogradnja</option>
                      <option value='1'>Unutarnje uređenje</option>
                      <option value='0'>Vrt</option>
                    </select>
                    <div class='ui input'>
                      <input type='number' placeholder='Cijena od'>
                    </div>
                    <div class='ui input'>
                      <input type='number' placeholder='Cijena do'>
                    </div>
                    <div class='rememberDiv'>
                      <span class='rememberSpan'> Na stanju</span>
                      <div class='ui right floated compact segment'>
                        <div class='ui fitted toggle checkbox'>
                          <input type='checkbox'>
                          <label></label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <table class='display cell-border hover row-border stripe' id='stanjeTablica'>
                      <thead>
                        <tr>
                          <th>Oznaka</th>
                          <th>Naziv</th>
                          <th>Grupa</th>
                          <th>Cijena</th>
                          <th>Količina</th>
                          <th>Ukupno HRK</th>
                        </tr>
                      </thead>
                      <tbody>

                      </tbody>
                    </table>
                  </div>
          </div>
          <div class='ui bottom attached tab segment' data-tab='third' id='dokumentiTabContent'>
            <div class='header'>
              <h2 class='l-heading'>Pregled dokumenata</h2>
              <div class='plus-icon' onclick='window.location.pathname = '/dodajDokument.html''><i class='fas fa-plus-circle fa-5x'></i><span> Dodaj Dokument</span></div>
            </div>
            <div class='filter'>
              <i class='fas fa-filter fa-3x'></i>
              <div class='ui input'>
                <input type='text' placeholder='Oznaka dokumenta'>
              </div>
              <div class='ui input'>
                <input type='text' placeholder='Datum stvaranja'>
              </div>
              <select class='ui search dropdown'>
                <option value='undef'>Vrsta dokumenta(sve)</option>
                <option value='IZ'>Izdatnica</option>
                <option value='PR'>Primka</option>
              </select>
              <div class='ui input'>
                <input type='number' placeholder='Količina od'>
              </div>
              <div class='ui input'>
                <input type='number' placeholder='Količina do'>
              </div>
            </div>
            <div>
              <table class='display cell-border hover row-border stripe' id='dokumentiTablica'>
                <thead>
                  <tr>
                    <th>Oznaka</th>
                    <th>Vrsta</th>
                    <th>Datum</th>
                    <th>Artikli</th>
                    <th>Iznos</th>
                  </tr>
                </thead>
                <tbody>

                </tbody>
              </table>
            </div>
          </div>
      </section>
    </div>
  </section>";}
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
  <!-- Tabs -->
    <!-- Footer -->
  <footer id="footer" class="bg-light text-center">
    <p>Copyright &copy; 2020, ASXCRO. All Rights Reserved.</p>
  </footer>



  <!-- jQuery -->
  <script src="./bundle/jQuery/jquery-3.5.1.min.js"></script>
  <script src="./bundle/jQuery/jquery.initialize.min.js"></script>


  <!-- AngularJS -->
  <script src="./bundle/angularJS/angular.min.js"></script>

  <!-- DataTables PlugIn -->
  <script src="./bundle/dataTables/DataTables-1.10.21/js/jquery.dataTables.min.js"></script>
  <script src="./bundle/dataTables/DataTables-1.10.21/js/dataTables.semanticui.min.js"></script>

  <!-- Semantic UIJS -->
  <script src="./bundle/semanticUI/dist/semantic.min.js"></script>

  <!-- Local JS  -->
  <script src="./js/skladiste.js"></script>
</body>

</html>