<?php

   $fileName  = "comments/";
   $fileName .= time();
   $fileName .= ".txt";

   $link = fopen($fileName, "w");

   fputs($link, $_POST['comments']);

   fclose($link);

   echo "Thank you =]";

?>



