export interface LegalBlock {
  heading: string
  body: string[]
}

export interface LegalDoc {
  title: string
  /** meta description for this page */
  description: string
  /** language-neutral path beginning with "/" (no /de prefix) */
  path: string
  updated: string
  blocks: LegalBlock[]
}

/**
 * ⚠️ Seeded from wyro.tech and standard German boilerplate. Have a professional
 * (or a generator like eRecht24) verify before launch, and add a USt-IdNr/phone
 * if applicable. Not legal advice.
 */
export const impressum: LegalDoc = {
  title: 'Impressum',
  description:
    'Impressum und Anbieterkennzeichnung von WyroTech – Andreas Wyrobek, Webentwickler in Deggendorf.',
  path: '/impressum',
  updated: '2026',
  blocks: [
    {
      heading: 'Angaben gemäß § 5 DDG',
      body: ['Andreas Wyrobek', 'Pferdemarkt 18', '94469 Deggendorf', 'Deutschland'],
    },
    {
      heading: 'Kontakt',
      body: ['E-Mail: a@wyro.tech'],
    },
    {
      heading: 'Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV',
      body: ['Andreas Wyrobek, Anschrift wie oben.'],
    },
    {
      heading: 'Haftung für Inhalte',
      body: [
        'Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.',
        'Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.',
      ],
    },
    {
      heading: 'Haftung für Links',
      body: [
        'Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.',
        'Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.',
      ],
    },
    {
      heading: 'Urheberrecht',
      body: [
        'Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.',
      ],
    },
  ],
}

export const datenschutz: LegalDoc = {
  title: 'Datenschutzerklärung',
  description:
    'Datenschutzerklärung von WyroTech – wie personenbezogene Daten auf wyro.tech verarbeitet werden (DSGVO).',
  path: '/datenschutz',
  updated: '2026',
  blocks: [
    {
      heading: 'Verantwortlicher',
      body: [
        'Verantwortlich für die Datenverarbeitung auf dieser Website ist:',
        'Andreas Wyrobek, Pferdemarkt 18, 94469 Deggendorf, Deutschland. E-Mail: a@wyro.tech',
      ],
    },
    {
      heading: 'Hosting',
      body: [
        'Diese Website wird bei Vercel Inc. (340 S Lemon Ave #4133, Walnut, CA 91789, USA) gehostet. Beim Aufruf der Website verarbeitet Vercel als Auftragsverarbeiter technisch notwendige Server-Logdaten (z. B. IP-Adresse, Datum und Uhrzeit des Zugriffs, User-Agent). Mit Vercel besteht ein Auftragsverarbeitungsvertrag (DPA); für die Übermittlung in die USA gelten die EU-Standardvertragsklauseln. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (sicherer und stabiler Betrieb der Website).',
      ],
    },
    {
      heading: 'Server-Logdateien',
      body: [
        'Zugriffsdaten werden ausschließlich zur Gewährleistung eines störungsfreien Betriebs und zur Sicherheit verarbeitet und nach kurzer Zeit gelöscht. Eine Zusammenführung dieser Daten mit anderen Datenquellen erfolgt nicht.',
      ],
    },
    {
      heading: 'Kontaktaufnahme',
      body: [
        'Wenn Sie uns per E-Mail kontaktieren, werden Ihre Angaben zur Bearbeitung der Anfrage und für den Fall von Anschlussfragen gespeichert. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen) bzw. Art. 6 Abs. 1 lit. f DSGVO (Bearbeitung Ihrer Anfrage). Die Daten werden gelöscht, sobald sie nicht mehr erforderlich sind.',
      ],
    },
    {
      heading: 'Reichweitenmessung (Vercel Analytics)',
      body: [
        'Diese Website nutzt Vercel Web Analytics und Speed Insights zur anonymen, aggregierten Reichweiten- und Performance-Messung. Es werden keine Cookies gesetzt und es findet kein websiteübergreifendes Tracking statt; es werden keine personenbezogenen Profile gebildet. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.',
      ],
    },
    {
      heading: 'Ihre Rechte',
      body: [
        'Sie haben jederzeit das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch gegen die Verarbeitung Ihrer personenbezogenen Daten. Wenden Sie sich hierzu an die oben genannten Kontaktdaten.',
        'Ihnen steht zudem ein Beschwerderecht bei einer Datenschutz-Aufsichtsbehörde zu, z. B. dem Bayerischen Landesamt für Datenschutzaufsicht (BayLDA).',
      ],
    },
    {
      heading: 'SSL-/TLS-Verschlüsselung',
      body: [
        'Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL-/TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie am „https://“ in der Adresszeile Ihres Browsers.',
      ],
    },
  ],
}
