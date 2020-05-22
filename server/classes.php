<?php

ini_set('memory_limit', '2048M');

class Configuration 
{
  public $host;
  public $dbName;
  public $username;
  public $password;
  public $connection;

  public function __construct($host = 'localhost:3306', $dbName = 'studentskidom', $username = 'root', $password = '') { 
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

header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
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

class Student 
{
  public $ime;
  public $prezime;
  public $JMBAG;
  public $adresa;
  public $postanskiBroj;
  public $grad;
  public $godinaStudija;
  public $ostvareniECTSbodovi;
  public $prosjekOcjena;
  public $Soba;

  public function __construct($jmbag) { 
    $sQuery = "SELECT * FROM studenti WHERE JMBAG = $jmbag"; 
    $oRecord = $GLOBALS['connection']->query($sQuery); 
    $aStudenti = [];
    while($oRow = $oRecord->fetch(PDO::FETCH_BOTH)) 
    { 
      $this->JMBAG = $oRow['JMBAG'];
      $this->ime = $oRow['Ime'];
      $this->prezime = $oRow['Prezime'];
      $this->konstruirajStudentaPrviDio($this->ime, $this->prezime, $this->JMBAG);
    }
  }

  
  public function konstruirajStudentaPrviDio($ime, $prezime, $jmbag) { 
    $sQuery = "SELECT * FROM studentidodatnipodaci WHERE JMBAG = $jmbag"; 
    $oRecord = $GLOBALS['connection']->query($sQuery); 
    $aStudenti = [];
    while($oRow = $oRecord->fetch(PDO::FETCH_BOTH)) 
    { 

      $this->adresa =  $oRow['Adresa'];
      $this->postanskiBroj = $oRow['PostanskiBroj'];
      $this->grad = $oRow['Grad'];
      $this->konstruirajStudentaDrugiDio($this->adresa, $this->postanskiBroj, $this->grad, $jmbag);
    }
  }

  public function konstruirajStudentaDrugiDio($adresa, $postanskiBroj, $grad,$jmbag) { 
    $sQuery = "SELECT * FROM studentipodacistudij WHERE JMBAG = $jmbag"; 
    $oRecord = $GLOBALS['connection']->query($sQuery); 
    $aStudenti = [];
    while($oRow = $oRecord->fetch(PDO::FETCH_BOTH)) 
    { 
      $this->godinaStudija =  $oRow['GodinaStudija'];
      $this->ostvareniECTSbodovi = $oRow['OstvareniECTSbodovi'];
      $this->prosjekOcjena = $oRow['ProsjekOcjena'];
      $this->konstruirajStudentaTreciDio($this->godinaStudija, $this->ostvareniECTSbodovi, $this->prosjekOcjena, Soba::GetSobaIdByJMBAG($jmbag) , $jmbag);
    }
  }

  public function konstruirajStudentaTreciDio( $godinaStudija, $ostvareniECTSbodovi, $prosjekOcjena, $sobaId, $jmbag) { 
    $this->godinaStudija = $godinaStudija; 
    $this->ostvareniECTSbodovi = $ostvareniECTSbodovi; 
    $this->prosjekOcjena = $prosjekOcjena; 
    $this->Soba = Soba::GetSobaById($sobaId);

    return $this;
  }

}

class Soba 
{
  public $id;
  public $naziv;
  public $opis;
  public $kat;
  public $Studenti;



  public function __construct($id, $naziv, $opis, $kat) { 
    $this->id = $id; 
    $this->naziv = $naziv; 
    $this->opis = $opis; 
    $this->kat = $kat; 
    $this->Studenti = array();
  }

  public static function GetSobaById($sobaid)
  {
    $sQuery = "SELECT * FROM sobe WHERE Id = $sobaid"; 
    $oRecord = $GLOBALS['connection']->query($sQuery); 
    $aSobe = [];
    while($oRow = $oRecord->fetch(PDO::FETCH_BOTH)) 
    { 
      $Soba = new Soba(
        $oRow['Id'],
        $oRow['Naziv'],
        $oRow['Opis'],
        $oRow['Kat']
      );
      array_push($aSobe,$Soba);
    }
    return $aSobe[0];
  }


  public static function GetStudentsInRoom($sobaid)
  {
    $sQuery = "SELECT * FROM studentsoba WHERE IdSobe = $sobaid"; 
    $oRecord = $GLOBALS['connection']->query($sQuery);  
    $aStudenti = [];
    while($oRow = $oRecord->fetch(PDO::FETCH_BOTH)) 
    { 
      $Student = new Student(
        $oRow['JMBAG']
        );

      array_push($aStudenti,$Student);
    }
    return $aStudenti;
  }

  public static function GetSobaIdByJMBAG($jmbag)
  {
    $sQuery = "SELECT * FROM studentsoba WHERE JMBAG = $jmbag"; 
    $oRecord = $GLOBALS['connection']->query($sQuery); 
    while($oRow = $oRecord->fetch(PDO::FETCH_BOTH)) 
    { 
      return $oRow['IdSobe'];
    }
  }
}

class Studom 
{
  public $Studenti;
  public $Sobe;
  public $connection;


  public function __construct() { 
    $this->Studenti = array(); 
    $this->Sobe = array();
    $this->connection = $GLOBALS['oConnection'] ;
  }

  public function GetAllStudentsInJSON()
  {
    $sQuery = "SELECT * FROM studenti"; 
    $oRecord = $this->connection->query($sQuery); 
    while($oRow = $oRecord->fetch(PDO::FETCH_BOTH)) 
    { 
      $Student = new Student(
        $oRow['JMBAG']
        );
      array_push($this->Studenti,$Student);
    }
    $myJSON = json_encode($this->Studenti);
    echo $myJSON;
  }

  public function GetAllRoomsInJSON()
  {
    $sQuery = "SELECT * FROM sobe"; 
        $oRecord = $this->connection->query($sQuery); 
        while($oRow = $oRecord->fetch(PDO::FETCH_BOTH)) 
        { 
          $Soba = new Soba(
            $oRow['Id'],
            $oRow['Naziv'],
            $oRow['Opis'],
            $oRow['Kat']
            );
          $Soba->Studenti = Soba::GetStudentsInRoom($Soba->id);
          array_push($this->Sobe,$Soba);
        }
        $myJSON = json_encode($this->Sobe);
        echo $myJSON;
  }

}

?>




