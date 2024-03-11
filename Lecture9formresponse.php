<?php

$myVariable = "so what";

?>

<!DOCTYPE html>
<HTML>
	<HEAD>
		<TITLE>PHP Testing File</TITLE>
	</HEAD>
	<BODY>
		<?PHP
			echo "hello ".$_POST["name"];
            echo "<br>";
            echo $myVariable;
		?>
	</BODY>
</HTML>