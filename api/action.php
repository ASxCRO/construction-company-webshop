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