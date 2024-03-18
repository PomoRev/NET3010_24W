<?PHP

	$f_ref = fopen ("testfile.txt", 'r') or die ("Failed to find file!"); // show as different from try...catch
	
	echo "on the inside we have : ";
	
	$line = fgets($f_ref);
	//$line = fgets($f_ref);
	
	fclose ($f_ref);
	
	echo $line."<BR> groovy!";
	
?>