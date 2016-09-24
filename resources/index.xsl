<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  xmlns:tei="http://www.tei-c.org/ns/1.0"
  exclude-result-prefixes="xs">

<xsl:output method="text" indent="yes"/>

 <xsl:namespace-alias result-prefix="#default" stylesheet-prefix="tei"/>
 <xsl:strip-space elements="lem rdg l"/>

  <xsl:template match="/">
        <xsl:text>{"fables":[&#xa;</xsl:text>
        <xsl:apply-templates select="//tei:text" />
        <xsl:text>]}&#xa;</xsl:text>
  </xsl:template>

  <xsl:template match="tei:text">
      <xsl:text>&#x9;{"id":"</xsl:text>
      <xsl:value-of select="substring(@n,2)"/>
      <xsl:text>",</xsl:text>
      <xsl:apply-templates select="descendant::tei:head[@type='titre-generique']"/>
      <xsl:text>,&#xa;</xsl:text>
  </xsl:template>

  <xsl:template match="tei:text[position() = last()]">
      <xsl:text>&#x9;{"id":"</xsl:text>
      <xsl:value-of select="substring(@n,2)"/>
      <xsl:text>",</xsl:text>
      <xsl:apply-templates select="descendant::tei:head[@type='titre-generique']"/>
      <xsl:text>&#xa;</xsl:text>
  </xsl:template>
  
  
  
<xsl:template match="tei:head">
  <xsl:text> "title":"</xsl:text>
  <xsl:value-of select="."/>
  <xsl:text>"}</xsl:text>
</xsl:template>
  
</xsl:stylesheet>
