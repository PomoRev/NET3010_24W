<?PHP

	$f_ref = fopen ("testfile.txt", 'w') or die ("Failed to make/find file!");
	
	$content = " something\n something else\n another thing\n";
	
	fwrite ($f_ref, $content) or die ("Could not write to file, sorry.");
	fclose ($f_ref);
	
	echo "File 'testfile.txt' has been written.";
	
?>