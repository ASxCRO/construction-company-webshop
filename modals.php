<?php
$path = $_SERVER['DOCUMENT_ROOT'];
$path .= "/Projekt/api/classes.php";
include_once($path);


$sModalID = $_GET['modal_id'];
$nDataID = $_GET['data_id'];
echo $sModalID;
switch($sModalID)
{
	case 'showDocumentArticles':
		echo
			'<div class="header">
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
                      <th>Cijena</th>
                    </tr>
                  </thead>
                  <tbody>
                      <tr>
                        <td>
                          <div class="ui right labeled input">
                            <label for="amount" class="ui label">'.$art->m_jmj.'</label>
                            <input type="number" placeholder="Kolicina" id="amount" value="'.$docart->m_amount.'" disabled>
                          </div>
                        </td>
                        <td>'.$art->m_cijena.' HRK</td>
                      </tr>
                  </tbody>
                </table>
              </div>';
            } 
        }

        echo '    </div>
            <div class="actions">
                <div class="ui black deny button">
                Povratak
                </div>
            </div>';
            
	default:
    break;
}
?>
