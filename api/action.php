<?php


include 'classes.php';
if ($_SERVER['REQUEST_METHOD'] == 'POST' && empty($_POST))
  $_POST = json_decode(file_get_contents('php://input'), true);


if (isset($_POST["jsonid"]))
{
  $jsonid = $_POST['jsonid'];
  
  switch ($jsonid) {
    case 'get_all_documents':
      Document::dohvatiDokumenteJSON();
      break;
    case 'get_all_docart':
      DocumentArticle::dohvatiDocArtJSON();
      break;
    case 'get_all_articles':
      Article::dohvatiArtikleJSON();
      break;
    case 'get_all_articles_with_state':
      Article::dohvatiArtikleSaStanjemJSON();
      break;
    case 'get_article_by_id':
      if (isset($_POST["articleid"]))
      {
        $articleId = $_POST['articleid'];
        Article::dohvatiArtiklPoIdJSON($articleId);
      }
      break;
    case "checkUserLogin":
        User::Login($_POST['username'], $_POST['password']);
      break;
    case 'save_document':
      if (isset($_POST["articles"]))
      {
        $articles = json_decode($_POST['articles']);
        $type = $_POST['type'];
        $date = $_POST['date'];
        $amount = $_POST['amount'];
        $articlesAmount = json_decode($_POST['articlesAmount']);
        echo Document::SaveDocument($articles,$type,$date,$amount,$articlesAmount);
      }
      break;
    case 'save_article':
      if (isset($_POST["naziv"]))
      {
        $naziv = $_POST['naziv'];
        $jmj = $_POST['jmj'];
        $price = $_POST['price'];
        $group = $_POST['grupa'];
        echo Article::SaveArticle($naziv,$jmj,$price,$group);
      }
      break;
    case 'storniraj_dokument':
      if (isset($_POST["id"]))
      {
        $id = $_POST['id'];
        echo Document::stornirajDokumentoPoId($id);
      }
      break;
    default:
      break;
  }
} 
else 
{
  $jsonid = null;
  echo "no jsonid supplied";
}
?>