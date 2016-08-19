<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  xmlns:tei="http://www.tei-c.org/ns/1.0"
  exclude-result-prefixes="xs">

<xsl:output method="html" indent="yes"/>

 <xsl:namespace-alias result-prefix="#default" stylesheet-prefix="tei"/>
 <xsl:strip-space elements="lem rdg l"/>

  <xsl:template match="/">
        <xsl:apply-templates select="//*[@xml:id='#fable_part']/*" />
    </xsl:template>
  
  
<xsl:template match="tei:head">
  <h4 class="text-center">
    <xsl:if test="@*">
      <xsl:attribute name="class">
        <xsl:apply-templates select="@* except @part except @org except @sample" />
      </xsl:attribute>
    </xsl:if>
    <xsl:apply-templates/>
      <xsl:if test="../@n">
          <br/>
          <small>
              <i>Folios
                  <xsl:for-each select="tokenize(../@n,' ')">
                      <xsl:value-of select="substring(.,6)"/>
                      <xsl:if test="not(position() = last())"> et </xsl:if>
                  </xsl:for-each>
              </i>
          </small>
      </xsl:if>
  </h4>
</xsl:template>

<xsl:template match="tei:div">
  <p>
    <xsl:if test="@*">
      <xsl:attribute name="class">
        <xsl:apply-templates select="@* except @part except @org except @sample" />
      </xsl:attribute>
    </xsl:if>
    <xsl:apply-templates/>
  </p>
</xsl:template>
  
  <xsl:template match="tei:figure">
    <xsl:apply-templates select="tei:graphic"/>
  </xsl:template>
  
  <xsl:template match="tei:graphic">
    <a class="zb" title="Enluminure">
      <xsl:attribute name="href">
        <text>resources/</text><xsl:value-of select="@url"/>
      </xsl:attribute>
      <img alt="Enluminure" class="Enluminure">
        <xsl:attribute name="src">
          <text>resources/</text><xsl:value-of select="@url"/>
        </xsl:attribute>
       </img>
    </a>
    
  </xsl:template>
  
  <xsl:template match="tei:lg">
    <xsl:choose>      
      <xsl:when test="@type">
        <p>
          <xsl:attribute name="class">
            <xsl:apply-templates select="@type" />
           </xsl:attribute>
            <xsl:if test="@corresp">
              <xsl:attribute name="highlight">
              <xsl:for-each select="tokenize(@corresp,' ')">
                  <xsl:value-of select="substring(.,2)"/><xsl:text> </xsl:text>
              </xsl:for-each>
              </xsl:attribute>
            </xsl:if>
         
      <xsl:apply-templates/>
      </p>
      </xsl:when>
      <xsl:when test="@corresp">
        <span style="display:block">
          <xsl:attribute name="highlight">
            <xsl:for-each select="tokenize(@corresp,' ')">
                <xsl:value-of select="substring(.,2)"/><xsl:text> </xsl:text>
            </xsl:for-each>
          </xsl:attribute>
          <xsl:apply-templates/>
        </span>
      </xsl:when> 
      <xsl:otherwise>
        <span>
          <xsl:if test="@*">
            <xsl:attribute name="class">
              <xsl:apply-templates select="@* except @part except @org except @sample" />
            </xsl:attribute>
          </xsl:if>
          <xsl:apply-templates/>
        </span>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>
  
  
  <xsl:template match="@*">
    <xsl:param name="class_name" select="name(.)"/>
    <xsl:for-each select="tokenize(.,' ')">
      <xsl:value-of select="$class_name"/>_<xsl:value-of select="."/><xsl:text> </xsl:text>
    </xsl:for-each>
  </xsl:template>
  
  
<xsl:template match="tei:l">
  <xsl:param name="line_num" select="number(tokenize(@n,' ')[1])" />
  <xsl:if test="$line_num mod 1=0">
    <span class="ln">
      <xsl:value-of select="$line_num"/>
    </span>
  </xsl:if>
  <xsl:choose>
    <xsl:when test="@rend">
      <p>
        <i>
        <xsl:if test="@*">
          <xsl:attribute name="class">
            <xsl:apply-templates select="@* except @n except @part except @org except @sample" />
          </xsl:attribute>
        </xsl:if>
        <xsl:apply-templates/>
        <br />
        </i>
      </p>
    </xsl:when>
    <xsl:otherwise>
        <span class="l">
          <xsl:if test="@corresp">
              <xsl:attribute name="highlight">
                <xsl:for-each select="tokenize(@corresp,' ')">
                    <xsl:value-of select="substring(.,2)"/><xsl:text> </xsl:text>
                </xsl:for-each>
              </xsl:attribute>
          </xsl:if>
        <xsl:apply-templates/>
        </span>
        <br />
    </xsl:otherwise>
    
  </xsl:choose>

</xsl:template>
  
  <xsl:template match="tei:note">
    <span data-toggle="tooltip" data-container="body" data-placement="top" data-html="true" class="note">
      <xsl:attribute name="title">
        <xsl:apply-templates/>
      </xsl:attribute>
      <sup>*</sup><xsl:text> </xsl:text>
    </span>
  </xsl:template>


  <xsl:template match="tei:rdg">
    <span>
      <xsl:attribute name="class">
        <xsl:text>rdg </xsl:text>
        <xsl:value-of select="@type"/>
      </xsl:attribute>
      <xsl:value-of select="."/>
    </span>
  </xsl:template>


  <xsl:template match="tei:lem">
    <span data-toggle="tooltip" data-container="body" data-placement="top" class="lem">
      <xsl:attribute name="title">
        <xsl:for-each select="../tei:rdg">
          <xsl:value-of select="normalize-space(.)"/><xsl:text>, </xsl:text>
          <xsl:for-each select="tokenize(@wit,' ')">
            <xsl:value-of select="substring(.,2,3)"/><xsl:text> </xsl:text>
          </xsl:for-each>
        </xsl:for-each> 
      </xsl:attribute>
      <xsl:apply-templates/>
    </span>
  </xsl:template>
  
  <xsl:template match="tei:name">
    <xsl:if test="@ref">
    <span>
      <xsl:attribute name="highlight">
        <xsl:for-each select="tokenize(@ref,' ')">
            <xsl:value-of select="substring(.,2)"/><xsl:text> </xsl:text>
        </xsl:for-each>
      </xsl:attribute>
      <xsl:apply-templates/>
    </span>
    </xsl:if>
  </xsl:template>
  
  <xsl:template match="tei:seg">
    <xsl:if test="@corresp">
    <span>
      <xsl:attribute name="highlight">
        <xsl:for-each select="tokenize(@corresp,' ')">
            <xsl:value-of select="substring(.,2)"/><xsl:text> </xsl:text>
        </xsl:for-each>
      </xsl:attribute>
      <xsl:apply-templates/>
    </span>
    </xsl:if>
    <xsl:if test="@rend='ital'">
      <![CDATA[<i>]]> <xsl:value-of select="."/><![CDATA[</i>]]>
    </xsl:if>
  </xsl:template>

  <xsl:template match="tei:rs">
    <xsl:if test="@corresp">
      <span>
        <xsl:attribute name="highlight">
          <xsl:for-each select="tokenize(@corresp,' ')">
              <xsl:value-of select="substring(.,2)"/><xsl:text> </xsl:text>
          </xsl:for-each>
        </xsl:attribute>
        <xsl:apply-templates/>
      </span>
    </xsl:if>
  </xsl:template>

  <xsl:template match="tei:w">
    <xsl:if test="@rend='ital'">
      <![CDATA[<i>]]> <xsl:value-of select="."/><![CDATA[</i>]]>
    </xsl:if>
  </xsl:template>




  <xsl:template match="tei:ex">
    <span class="abr">(<xsl:value-of select="."/>)</span>
    <span class="norm"><xsl:value-of select="."/></span>
  </xsl:template>

  
  <xsl:template match="*">
      <xsl:apply-templates/>
  </xsl:template>
  
  <xsl:template match=
    "text()[not(string-length(normalize-space()))]"/>
  
  <xsl:template match=
    "text()[string-length(normalize-space()) > 0]">
    <xsl:value-of select="."/>
  </xsl:template>
  
</xsl:stylesheet>
