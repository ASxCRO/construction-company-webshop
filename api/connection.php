<?php

ini_set('memory_limit', '2048M');


// ************************************************************************************************************************************************************************************************************************

class Configuration 
{
  public $host;
  public $dbName;
  public $username;
  public $password;
  public $connection;

  public function __construct($host = 'localhost:3306', $dbName = 'vsmti_gradnja_skladiste', $username = 'root', $password = '') { 
    $this->host = $host; 
    $this->dbName = $dbName; 
    $this->username = $username; 
    $this->password = $password; 
  }

  public function getPDO()
  {
    return new PDO(
      "mysql:
      host=$this->host;
      dbname=$this->dbName", 
      $this->username, 
      $this->password); 
  }
  
}

// header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
// header("Cache-Control: post-check=0, pre-check=0", false);
// header("Pragma: no-cache");
$ConnectionConfiguration = new Configuration();
$oConnection = $ConnectionConfiguration->getPDO();

function connectMe()
{
  try { 
    return $GLOBALS['oConnection'] ;
  } 
  catch (PDOException $pe) { 
    die("Could not connect to the database :" . $pe->getMessage()); 
  }
}

$connection = connectMe();
// ************************************************************************************************************************************************************************************************************************
?>