export default function Datenschutz() {
    return (
        <main style={{ maxWidth: 700, margin: "2rem auto", padding: "1rem" }}>
            <h1>Datenschutzerklärung</h1>
            <section>
                <p>
                    Der Schutz Ihrer persönlichen Daten ist uns wichtig. Beim Besuch dieser Website werden durch den Hosting-Anbieter (Cloudflare) automatisch technische Daten (z.B. IP-Adresse, Zeitpunkt des Zugriffs) in Server-Logs gespeichert. Diese Daten dienen ausschließlich der technischen Bereitstellung und Sicherheit der Website und werden nicht zur Identifizierung von Besuchern verwendet.
                </p>
                <p>
                    Es werden darüber hinaus keine personenbezogenen Daten gespeichert oder verarbeitet.
                </p>
                <p>
                    Weitere Informationen finden Sie in der <a href="https://www.cloudflare.com/de-de/privacypolicy/" target="_blank" rel="noopener noreferrer">Datenschutzerklärung von Cloudflare</a>.
                </p>
            </section>
            <section>
                <h2>Ihre Rechte</h2>
                <p>
                    Sie haben das Recht auf Auskunft über die zu Ihrer Person gespeicherten Daten sowie ein Recht auf Berichtigung oder Löschung dieser Daten.
                </p>
            </section>
            <section>
                <h2>Kontakt</h2>
                <p>
                    Bei Fragen zum Datenschutz wenden Sie sich bitte an die im Impressum genannte Adresse.
                </p>
            </section>
        </main>
    );
}