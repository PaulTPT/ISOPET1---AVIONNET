#!/bin/bash
echo "Generating index"
for fable_num in {2..2}
do
	for fable_part in P-lat-transcription P-frm-transcription P-lat-comparaison P-frm-comparaison
	do
		sed "s/#fable_part/f${fable_num}-${fable_part}/g"  /home/paultpt/Documents/git/site_joana/resources/fables.xsl > file_temp_fable
		echo "Generating" f${fable_num}-${fable_part}.htm
		java -jar ~/Documents/Saxon/saxon9he.jar -s:Isopet-codage-fable.xml -xsl:file_temp_fable -o:/home/paultpt/Documents/git/site_joana/partials/fables/f${fable_num}-${fable_part}.htm
		rm file_temp_fable
	done
done