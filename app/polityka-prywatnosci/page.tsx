import { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Breadcrumb, { buildBreadcrumbSchema } from "@/components/breadcrumb";
import JsonLd from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Polityka prywatności — PBAC",
  description: "Polityka prywatności serwisu pbac.pl. Informacje o przetwarzaniu danych osobowych zgodnie z RODO.",
  alternates: { canonical: "/polityka-prywatnosci" },
};

export default function PolitykaPrywatnosciPage() {
  const breadcrumbItems = [
    { name: "Strona główna", href: "/" },
    { name: "Polityka prywatności" },
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      <JsonLd data={[buildBreadcrumbSchema(breadcrumbItems)]} />
      <Navbar />

      <section className="pt-28 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <Breadcrumb items={breadcrumbItems} />
          <h1 className="font-montserrat text-4xl font-bold mt-6 mb-8">Polityka prywatności</h1>

          <div className="prose prose-invert prose-sm max-w-none space-y-6 text-white/70 leading-relaxed">
            <h2 className="font-montserrat text-xl font-bold text-white">1. Administrator danych</h2>
            <p>Administratorem danych osobowych jest PBAC z siedzibą w Warszawie, ul. Marszałkowska 55/73, 00-676 Warszawa, e-mail: biuro@pbac.pl, tel. +48 503 151 802.</p>

            <h2 className="font-montserrat text-xl font-bold text-white">2. Cel przetwarzania danych</h2>
            <p>Dane osobowe przetwarzane są w celu: odpowiedzi na zapytania przesłane przez formularz kontaktowy, przygotowania wyceny usług, realizacji zamówionych usług montażu i serwisu klimatyzacji, wypełnienia obowiązków prawnych ciążących na administratorze.</p>

            <h2 className="font-montserrat text-xl font-bold text-white">3. Podstawa prawna</h2>
            <p>Podstawą prawną przetwarzania danych jest: zgoda osoby, której dane dotyczą (art. 6 ust. 1 lit. a RODO), wykonanie umowy lub podjęcie działań przed zawarciem umowy (art. 6 ust. 1 lit. b RODO), prawnie uzasadniony interes administratora (art. 6 ust. 1 lit. f RODO).</p>

            <h2 className="font-montserrat text-xl font-bold text-white">4. Zakres zbieranych danych</h2>
            <p>Poprzez formularz kontaktowy zbieramy: imię i nazwisko, adres e-mail, numer telefonu, treść wiadomości oraz rodzaj wybranej usługi. Podanie danych jest dobrowolne, ale niezbędne do realizacji zapytania.</p>

            <h2 className="font-montserrat text-xl font-bold text-white">5. Okres przechowywania</h2>
            <p>Dane osobowe przechowywane są przez okres niezbędny do realizacji celów, dla których zostały zebrane, nie dłużej niż 3 lata od ostatniego kontaktu, chyba że dłuższy okres przechowywania wynika z obowiązków prawnych.</p>

            <h2 className="font-montserrat text-xl font-bold text-white">6. Prawa osób</h2>
            <p>Masz prawo do: dostępu do swoich danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, przenoszenia danych, wniesienia sprzeciwu wobec przetwarzania oraz cofnięcia zgody w dowolnym momencie. W celu skorzystania z powyższych praw prosimy o kontakt pod adresem biuro@pbac.pl.</p>

            <h2 className="font-montserrat text-xl font-bold text-white">7. Pliki cookies</h2>
            <p>Strona pbac.pl nie wykorzystuje plików cookies do śledzenia użytkowników. Strona nie korzysta z Google Analytics ani innych narzędzi analitycznych zbierających dane osobowe.</p>

            <h2 className="font-montserrat text-xl font-bold text-white">8. Kontakt</h2>
            <p>W sprawach związanych z ochroną danych osobowych prosimy o kontakt: biuro@pbac.pl lub pisemnie na adres: PBAC, ul. Marszałkowska 55/73, 00-676 Warszawa.</p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
