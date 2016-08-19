#!/bin/bash
fable_num=1
for fable_part in B-lat-transcription
do
	sed "s/#fable_part/f${fable_num}-${fable_part}/g"  /home/paultpt/Documents/git/site_joana/resources/fables.xsl > file_temp_fable
	sed "s/#fable_part/f${fable_num}-${fable_part}/g"  /home/paultpt/Documents/git/site_joana/resources/folios.xsl > file_temp_folio
	echo "generating" f${fable_num}-${fable_part}.htm
	java -jar ~/Documents/Saxon/saxon9he.jar -s:Isopet-codage-fable-${fable_num}.xml -xsl:file_temp_fable -o:/home/paultpt/Documents/git/site_joana/partials/fables/f${fable_num}-${fable_part}.htm
	java -jar ~/Documents/Saxon/saxon9he.jar -s:Isopet-codage-fable-${fable_num}.xml -xsl:file_temp_folio -o:/home/paultpt/Documents/git/site_joana/partials/fables/f${fable_num}-${fable_part}_folios.htm
	rm file_temp_fable
	rm file_temp_folio
done