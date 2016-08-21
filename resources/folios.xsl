<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  xmlns:tei="http://www.tei-c.org/ns/1.0"
  exclude-result-prefixes="xs">

  <xsl:output method="html" indent="yes"/>

   <xsl:namespace-alias result-prefix="#default" stylesheet-prefix="tei"/>
   <xsl:strip-space elements="lem rdg l"/>

    <xsl:template match="/">
            <xsl:for-each select="tokenize(//*[@xml:id='#fable_part']/@n,' ')">
                <xsl:if test="not(starts-with(.,'#'))">
                    <div class="'slide">
                      <h4 class="folio_name">
                        Folio <xsl:value-of select="substring(.,6)"/>
                      </h4>
                        <img class="im_fable" alt="Folio">
                        <xsl:attribute name="src">resources/<xsl:value-of select="."/>.jpeg</xsl:attribute>
                            <xsl:attribute name="data-zoom-image">resources/<xsl:value-of select="."/>.jpeg</xsl:attribute>
                        </img>
                    </div>
                </xsl:if>
            </xsl:for-each>
  </xsl:template>

</xsl:stylesheet>