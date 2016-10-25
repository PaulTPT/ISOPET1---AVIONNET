#!/bin/bash
#echo "Generating index"
#java -jar ~/Documents/Saxon/saxon9he.jar -s:Isopet-codage-fable.xml -xsl:index.xsl -o:/home/paultpt/Documents/git/site_joana/resources/index.json
for fable_num in {3..3}
do
	for fable_part in abc-trad 
	do
		sed "s/#fable_part/f${fable_num}-${fable_part}/g"  /home/paultpt/Documents/git/site_joana/resources/fables.xsl > file_temp_fable
		#sed "s/#fable_part/f${fable_num}-${fable_part}/g"  /home/paultpt/Documents/git/site_joana/resources/folios.xsl > file_temp_folio
		echo "Generating" f${fable_num}-${fable_part}.htm
		java -jar ~/Documents/Saxon/saxon9he.jar -s:Isopet-codage-fable.xml -xsl:file_temp_fable -o:/home/paultpt/Documents/git/site_joana/partials/fables/f${fable_num}-${fable_part}.htm
		#java -jar ~/Documents/Saxon/saxon9he.jar -s:Isopet-codage-fable.xml -xsl:file_temp_folio -o:/home/paultpt/Documents/git/site_joana/partials/fables/f${fable_num}-${fable_part}_folios.htm
		rm file_temp_fable
		#rm file_temp_folio
	done
done