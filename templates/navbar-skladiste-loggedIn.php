<?php 
session_start();

echo "
    <nav id='navbar'>
    <div class='ui search'>

        <div class='ui icon input'>
         "; if(!isset($_SESSION['login'])) { 
           echo " <input class='prompt' type='text' placeholder='Što vas zanima?' id='redirectBySearch'>
           <i class='search icon'></i>"; }
        echo "</div>
        <div class='results'>

        </div>
    </div>
    <a href='skladiste.php' class='logo'>
        <img src='./img/vsmtiSkladiste.png' alt='VSMTI-GRADNJA-DOO'>
    </a>
    <ul>";
        if(isset($_SESSION['login'])) { 
          echo "          
          <li class='py-2'>
                <a href='logout.php' onclick='return RedirectToIndex()'>
                    <i class='fas fa-arrow-left'></i>
                    Odjava
                </a>
            </li>";
      } else {
          echo "
        <li class='py-2'>
            <a href='./sign.html'>
                <i class='fas fa-sign-in-alt'></i>
                Prijava 
            </a>
        </li>";
      }
      echo "    </ul>
</nav>";

?>