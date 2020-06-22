<?php
$path = $_SERVER['DOCUMENT_ROOT'];
$path .= "/Projekt/api/classes.php";
include_once($path);


$sModalID = $_GET['modal_id'];
$nDataID = $_GET['data_id'];
switch($sModalID)
{
	case 'showDocumentArticles':
		echo '<div class="header">
                Artikli odabranog dokumenta
            </div>
            <div class="content">';

        $aDocArtovi = DocumentArticle::dohvatiDocArtIzBaze();

        foreach ($aDocArtovi as $docart) {
            $doc = Document::dohvatiDokumentIzBazePoID($nDataID);
            if($doc->m_id == $docart->m_iddoc) {
                $art = Article::dohvatiArtiklIzBazePoId($docart->m_idart);

                echo  '<div class="article">
                <p>'.$art->m_naziv.'</p>
                <table>
                  <thead>
                    <tr>
                      <th>Količina</th>
                      <th>Ukupan iznos</th>
                    </tr>
                  </thead>
                  <tbody>
                      <tr>
                        <td>
                          <div class="ui right labeled input">
                            <label for="amount" class="ui label">'.$art->m_jmj.'</label>
                            <input type="number" placeholder="Kolicina" id="amount" value="'.abs($docart->m_amount).'" disabled>
                          </div>
                        </td>
                        <td>'.abs($docart->m_amount * $art->m_cijena). ' HRK</td>
                      </tr>
                  </tbody>
                </table>
              </div>';
            } 
        }

        echo '    </div>
            <div class="actions">
                <div class="ui black deny button" style="background: #428BCA">
                Povratak
                </div>
            </div>';
      break;
  case 'modalEditArticle':
    $artikl = Article::dohvatiArtiklIzBazePoId($nDataID);
    echo '    <div class="ui icon header">
    <i class="archive icon"></i>
    Uređivanje artikla
  </div>
  <div class="content text-align" style="text-align: center; margin: auto;">
  <form class="ui form">
      <div class="field">
        <label style="color: white;">Ime Artikla</label>
        <input style="text-align: center;" type="text" name="ime-artikla" placeholder="Ime Artikla" id="ime-artikla" value="'.$artikl->m_naziv.'">
        <input type="hidden" name="ime-artikla-hidden" placeholder="Ime Artikla" id="ime-artikla-hidden" value="'.$artikl->m_id.'">
      </div>
      <div class="field">
        <label style="color: white;">Cijena Artikla</label>
        <input style="text-align: center;" class="money" type="text" name="cijena" placeholder="Cijena" id="cijena-artikla" value="'.$artikl->m_cijena.'">
      </div>
    </form>
  </div>
  <div class="actions">
    <div class="ui red basic cancel inverted button">
      <i class="remove icon"></i>
      Odustani
    </div>
    <div class="ui blue ok inverted button">
      <i class="checkmark icon"></i>
      Spremi
    </div>
  </div>
  <script>
  $(".money").mask("000,000,000.00", {reverse: true});

  </script>';
  break;
            
	default:
    break;
}
?>
