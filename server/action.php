<?php
ini_set('memory_limit', '2048M');
include 'classes.php';
    $jsonid = $_GET['jsonid'];
    switch($jsonid)
    {
      case 'get_all_students':
        $StudentskiDom = new Studom();
        $StudentskiDom->GetAllStudentsInJSON();
        break;
      case 'get_all_rooms':
        $StudentskiDom = new Studom();
        $StudentskiDom->GetAllRoomsInJSON();
        break;
      default:
        break;
    }

?>