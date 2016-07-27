#!/bin/bash
fable_num=1
for fable_part in BPL-ed-crit-lat BPL-ed-crit-frm BPL-lat-trad BPL-frm-trad B-lat-transcription B-frm-transcription P-lat-transcription P-frm-transcription L-lat-transcription L-frm-transcription abc-ed-crit abc-trad abc-transcriptions a-transcription b-transcription c-transcription
do
	sed "s/#fable_part/f${fable_num}-${fable_part}/g"  /home/paultpt/Documents/git/site_joana/resources/fables.xsl > file_temp
	echo "generating" f${fable_num}-${fable_part}.htm
	java -jar ~/Documents/Saxon/saxon9he.jar -s:Isopet-codage-fable-${fable_num}.xml -xsl:file_temp -o:/home/paultpt/Documents/git/site_joana/partials/fables/f${fable_num}-${fable_part}.htm
	rm file_temp
done