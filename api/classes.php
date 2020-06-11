<?php 
ob_start();
// ************************************************************************************************************************************************************************************************************************
ini_set('memory_limit', '2048M');
include('connection.php');
// ************************************************************************************************************************************************************************************************************************


// ************************************************************************************************************************************************************************************************************************
class User 
{
  public $m_id;
  public $m_username;
  public $m_password;

  public function __construct($id, $username, $password)
  {
    $this->m_id = $id;
    $this->m_username = $username;
    $this->m_password = $password;
  }

  public static function dohvatiUsereIzBaze()
  {
    $sQuery = "SELECT * FROM users"; 
    $oRecord = $GLOBALS['connection']->query($sQuery); 
    $aUsers = [];
    while($oRow = $oRecord->fetch(PDO::FETCH_BOTH)) 
    { 
      $oUser =  new User($oRow['id'],$oRow['username'],$oRow['password']);
      array_push($aUsers,$oUser);
    }
    return $aUsers;
  }

  public static function dohvatiUsereJSON()
  {
    $myJSON = json_encode(User::dohvatiUsereIzBaze());
    echo $myJSON;
  }

  public static function Login($username,$password)
  {
    $aUsers = User::dohvatiUsereIzBaze();
    $b_UserExists = false;
    foreach ($aUsers as $user) {
      if($user->m_username == $username && $user->m_password == $password){
        $b_UserExists = true;
        session_start();
        $_SESSION['login'] = "true";
      }
    }
    if($b_UserExists == true)
    {
      if(isset($_SESSION['login'])){
        $response = new Response('redirect','true','/Projekt/skladiste.php');
        $myJSON = json_encode($response);
        echo $myJSON;
      }
    }
    else {
      $response = new Response('noredirect','false','');
      $myJSON = json_encode($response);
      echo $myJSON;
    }

  }
}
// ************************************************************************************************************************************************************************************************************************


class Document
{
  public $m_id;
  public $m_vrsta;
  public $m_datum;
  public $m_iznos;

  public function __construct($id, $vrsta, $datum, $iznos)
  {
    $this->m_id = $id;
    $this->m_vrsta = $vrsta;
    $this->m_datum = $datum;
    $this->m_iznos = $iznos;
  }

  public static function dohvatiDokumenteIzBaze()
  {
    $sQuery = "SELECT * FROM documents"; 
    $oRecord = $GLOBALS['connection']->query($sQuery); 
    $aDocuments = [];
    while($oRow = $oRecord->fetch(PDO::FETCH_BOTH)) 
    { 
      $oDocument =  new Document($oRow['id'],$oRow['vrsta'],$oRow['datum'],$oRow['iznos']);
      array_push($aDocuments,$oDocument);
    }
    return $aDocuments;
  }

  public static function dohvatiDokumentIzBazePoID($id)
  {
    $sQuery = "SELECT * FROM documents where id = $id"; 
    $oRecord = $GLOBALS['connection']->query($sQuery); 
    while($oRow = $oRecord->fetch(PDO::FETCH_BOTH)) 
    { 
      return new Document($oRow['id'],$oRow['vrsta'],$oRow['datum'],$oRow['iznos']);
    }
  }

  public static function dohvatiZadnjiDokumentIzBaze()
  {
    $sQuery = "SELECT * FROM documents ORDER BY id DESC LIMIT 1"; 
    $oRecord = $GLOBALS['connection']->query($sQuery); 
    while($oRow = $oRecord->fetch(PDO::FETCH_BOTH)) 
    { 
      return new Document($oRow['id'],$oRow['vrsta'],$oRow['datum'],$oRow['iznos']);
    }
  }


  public static function dohvatiDokumenteJSON()
  {
    $myJSON = json_encode(Document::dohvatiDokumenteIzBaze());
    echo $myJSON;
  }

  public static function SaveDocument($articles,$type,$date,$amount,$articlesAmount)
  {
    $isSuccessful = false;
    try {
      $realAmount  = $amount;
      if($type == "1") {
        $realAmount = -1 * abs($amount);
      }

      $sQuery = "INSERT INTO documents VALUES (NULL,'$type','$date','$realAmount')"; 
      $GLOBALS['connection']->exec($sQuery);
      $lastDocument = Document::dohvatiZadnjiDokumentIzBaze();
      foreach ($articles as $article) {
        $index = array_search($article, $articles); 
        $oDocumentArticle =  new DocumentArticle("",$lastDocument->m_id,$article->m_id,$articlesAmount[$index]);
        $realAmountArticle  = $oDocumentArticle->m_amount;
        if($type == "1") {
          $realAmountArticle = -1 * abs($articlesAmount[$index]);
        }
        $sQueryDocArt = "INSERT INTO document_articles VALUES (NULL,'$oDocumentArticle->m_iddoc','$oDocumentArticle->m_idart','$realAmountArticle')"; 
        $GLOBALS['connection']->exec($sQueryDocArt);
      }

      $isSuccessful = true;
    }
    catch(PDOException $e) {
      echo $sQuery . "<br>" . $e->getMessage();
    }

    return $isSuccessful;

  }
}
// ************************************************************************************************************************************************************************************************************************


class Article
{
  public $m_id;
  public $m_naziv;
  public $m_grupa;
  public $m_jmj;
  public $m_cijena;

  public function __construct($id,$naziv,$grupa, $jmj,$cijena)
  {
    $this->m_id = $id;
    $this->m_naziv = $naziv;
    $this->m_grupa = $grupa;
    $this->m_jmj = $jmj;
    $this->m_cijena = $cijena;
  }

  public static function dohvatiArtikleIzBaze()
  {
    $sQuery = "SELECT * FROM articles"; 
    $oRecord = $GLOBALS['connection']->query($sQuery); 
    $aArticles = [];
    while($oRow = $oRecord->fetch(PDO::FETCH_BOTH)) 
    { 
      $oArticle =  new Article($oRow['id'],$oRow['naziv'],$oRow['grupa'],$oRow['jmj'],$oRow['cijena']);
      array_push($aArticles,$oArticle);
    }
    return $aArticles;
  }

  public static function dohvatiArtikleSaStanjemIzBaze()
  {
    $sQuery = "select id_art,sum(amount) as stanje  from document_articles  group by id_art";  
    $oRecord = $GLOBALS['connection']->query($sQuery); 
    $aArticlesWithState = [];
    while($oRow = $oRecord->fetch(PDO::FETCH_BOTH)) 
    { 
      $obj = new stdClass;
      $obj->id_art = $oRow['id_art'];
      $obj->stanje = $oRow['stanje'];
      array_push($aArticlesWithState,$obj);
    }
    return $aArticlesWithState;
  }

  public static function dohvatiArtiklIzBazePoId($id)
  {
    $sQuery = "SELECT * FROM articles where id = $id"; 
    $oRecord = $GLOBALS['connection']->query($sQuery); 
    while($oRow = $oRecord->fetch(PDO::FETCH_BOTH)) 
    { 
      return new Article($oRow['id'],$oRow['naziv'],$oRow['grupa'],$oRow['jmj'],$oRow['cijena']);
    }
  }

  public static function dohvatiArtikleJSON()
  {
    header('Content-type:application/json');
    $json = json_encode(Article::dohvatiArtikleIzBaze());
    if ($json === false) {
      // Avoid echo of empty string (which is invalid JSON), and
      // JSONify the error message instead:
      $json = json_encode(["jsonError" => json_last_error_msg()]);
      if ($json === false) {
          // This should not happen, but we go all the way now:
          $json = '{"jsonError":"unknown"}';
      }
      // Set HTTP response status code to: 500 - Internal Server Error
      http_response_code(500);
    }
    echo $json;
  }

  public static function dohvatiArtikleSaStanjemJSON()
  {
    header('Content-type:application/json');
    $json = json_encode(Article::dohvatiArtikleSaStanjemIzBaze());
    if ($json === false) {
      // Avoid echo of empty string (which is invalid JSON), and
      // JSONify the error message instead:
      $json = json_encode(["jsonError" => json_last_error_msg()]);
      if ($json === false) {
          // This should not happen, but we go all the way now:
          $json = '{"jsonError":"unknown"}';
      }
      // Set HTTP response status code to: 500 - Internal Server Error
      http_response_code(500);
    }
    echo $json;
  }

  public static function dohvatiArtiklPoIdJSON($id)
  {
    header('Content-type:application/json');
    $json = json_encode(Article::dohvatiArtiklIzBazePoId($id));
    if ($json === false) {
      // Avoid echo of empty string (which is invalid JSON), and
      // JSONify the error message instead:
      $json = json_encode(["jsonError" => json_last_error_msg()]);
      if ($json === false) {
          // This should not happen, but we go all the way now:
          $json = '{"jsonError":"unknown"}';
      }
      // Set HTTP response status code to: 500 - Internal Server Error
      http_response_code(500);
    }
    echo $json;
  }

  public static function SaveArticle($naziv,$jmj,$price,$group)
  {
    $isSuccessful = false;
    try {
      $sQuery = "INSERT INTO articles VALUES (NULL,'$naziv','$jmj','$price','$group')"; 
      $GLOBALS['connection']->exec($sQuery);
      $isSuccessful = true;
    }
    catch(PDOException $e) {
      echo $sQuery . "<br>" . $e->getMessage();
    }

    return $isSuccessful;

  }
}

// ************************************************************************************************************************************************************************************************************************
class DocumentArticle
{
  public $m_id;
  public $m_iddoc;
  public $m_idart;
  public $m_amount;


  public function __construct($id,$doc, $art, $amount)
  {
    $this->m_id = $id;
    $this->m_iddoc = $doc;
    $this->m_idart = $art;
    $this->m_amount = $amount;
  }

  public static function dohvatiDocArtIzBaze()
  {
    $sQuery = "SELECT * FROM document_articles"; 
    $oRecord = $GLOBALS['connection']->query($sQuery); 
    $aDocumentArticles = [];
    while($oRow = $oRecord->fetch(PDO::FETCH_BOTH)) 
    { 
      $oDocumentArticle =  new DocumentArticle($oRow['id'],$oRow['id_doc'],$oRow['id_art'],$oRow['amount']);
      array_push($aDocumentArticles,$oDocumentArticle);
    }
    return $aDocumentArticles;
  }

  public static function dohvatiDocArtJSON()
  {
    $myJSON = json_encode(DocumentArticle::dohvatiDocArtIzBaze());
    echo $myJSON;
  }


}
// ************************************************************************************************************************************************************************************************************************

class Response
{
  public $status;
  public $userLoggedIn;
  public $route;

  public function __construct($status,$userLoggedIn, $route)
  {
    $this->status = $status;
    $this->userLoggedIn = $userLoggedIn;
    $this->route = $route;
  }
}

?>