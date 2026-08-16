<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="utf-8" indent="yes"/>
  <xsl:template match="/rss/channel">
    <html lang="en">
      <head>
        <title><xsl:value-of select="title"/> — feed</title>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <style>
          :root { color-scheme: dark; }
          body {
            margin: 0; background: #121311; color: #e3dfd5;
            font: 15px/24px "IBM Plex Mono", ui-monospace, monospace;
            -webkit-font-smoothing: antialiased;
          }
          .frame { max-width: 1280px; margin: 0 auto; border-inline: 1px solid #33342f; min-height: 100vh; padding: 40px 48px; display: flex; flex-direction: column; gap: 32px; }
          .crumb { font-size: 13px; color: #8f8b81; }
          h1 { margin: 0; font-size: 26px; line-height: 40px; font-weight: 400; }
          p { margin: 0; color: #b6b1a6; max-width: 74ch; text-wrap: pretty; }
          .note { border: 1px solid #33342f; background: #191a17; padding: 16px 20px; display: flex; flex-direction: column; gap: 4px; font-size: 14px; }
          .note code { color: #e0a34a; }
          .rows { display: flex; flex-direction: column; border-top: 1px solid #33342f; }
          a.row { display: grid; grid-template-columns: 14ch minmax(0,1fr); gap: 16px; padding: 12px 8px; border-bottom: 1px solid #262722; color: inherit; text-decoration: none; }
          a.row:hover { background: #1f201c; }
          .date { color: #8f8b81; }
          .body { display: flex; flex-direction: column; min-width: 0; }
          .summary { font-size: 14px; color: #8f8b81; }
          a.home { color: #e0a34a; text-decoration: none; }
          @media (max-width: 720px) {
            .frame { padding: 24px 20px; border-inline: none; }
            a.row { grid-template-columns: 1fr; gap: 2px; }
          }
        </style>
      </head>
      <body>
        <div class="frame">
          <span class="crumb">~/rss.xml</span>
          <h1><xsl:value-of select="title"/></h1>
          <p><xsl:value-of select="description"/></p>
          <div class="note">
            <span>This is an RSS feed. Paste the URL into a reader.</span>
            <code><xsl:value-of select="link"/>/rss.xml</code>
          </div>
          <div class="rows">
            <xsl:for-each select="item">
              <a class="row">
                <xsl:attribute name="href"><xsl:value-of select="link"/></xsl:attribute>
                <span class="date"><xsl:value-of select="substring(pubDate, 6, 11)"/></span>
                <span class="body">
                  <span><xsl:value-of select="title"/></span>
                  <span class="summary"><xsl:value-of select="description"/></span>
                </span>
              </a>
            </xsl:for-each>
          </div>
          <a class="home">
            <xsl:attribute name="href"><xsl:value-of select="link"/></xsl:attribute>
            ← back to the site
          </a>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
