import type { ServiceInfo } from "@/types";

export const services: ServiceInfo[] = [
  {
    slug: "montaz-klimatyzacji",
    name: "Montaż klimatyzacji",
    shortDescription:
      "Profesjonalny montaż klimatyzatorów ściennych, kasetonowych i kanałowych z doborem urządzenia, instalacją i uruchomieniem.",
    longDescription:
      "Realizujemy kompleksowy montaż klimatyzacji w domach, mieszkaniach i biurach na terenie Warszawy i okolic. Każda instalacja obejmuje dobór optymalnego urządzenia na podstawie metrażu, nasłonecznienia i potrzeb klienta, profesjonalny montaż jednostki wewnętrznej i zewnętrznej, podłączenie elektryczne i hydrauliczne, próbę szczelności, napełnienie czynnikiem chłodniczym oraz uruchomienie z konfiguracją ustawień. Pracujemy z klimatyzatorami ponad 10 marek, w tym Samsung, LG, Toshiba, Gree, Daikin, Haier i Mitsubishi.",
    icon: "Wrench",
    steps: [
      { title: "Kontakt i wycena", description: "Skontaktuj się z nami telefonicznie lub przez formularz. Przygotujemy bezpłatną wycenę dopasowaną do Twojego domu lub biura." },
      { title: "Dobór urządzenia", description: "Nasi specjaliści dobiorą optymalny klimatyzator na podstawie metrażu, izolacji, nasłonecznienia i Twoich preferencji." },
      { title: "Profesjonalny montaż", description: "Realizujemy montaż zgodnie z najwyższymi standardami producenta — wiercenie, prowadzenie rur, podłączenie elektryczne i hydrauliczne." },
      { title: "Uruchomienie i gwarancja", description: "Po montażu uruchamiamy urządzenie, konfigurujemy ustawienia i przekazujemy instrukcję obsługi. Zapewniamy pełną gwarancję." },
    ],
    faq: [
      { question: "Ile trwa montaż klimatyzacji?", answer: "Standardowy montaż jednego klimatyzatora ściennego trwa 4-8 godzin, w zależności od warunków technicznych i długości trasy rurowej." },
      { question: "Czy potrzebuję zgody spółdzielni na montaż?", answer: "W przypadku bloków i budynków wielorodzinnych zazwyczaj wymagana jest zgoda zarządcy lub spółdzielni na umieszczenie jednostki zewnętrznej. Pomagamy w przygotowaniu odpowiednich dokumentów." },
      { question: "Jaki jest koszt montażu klimatyzacji?", answer: "Cena montażu zależy od wielu czynników: modelu urządzenia, długości trasy rurowej, kondygnacji i warunków technicznych. Bezpłatna wycena pozwala poznać dokładny koszt przed podjęciem decyzji." },
    ],
    link: "/klimatyzacja",
  },
  {
    slug: "serwis-klimatyzacji",
    name: "Serwis klimatyzacji",
    shortDescription:
      "Okresowe przeglądy, czyszczenie filtrów, uzupełnianie czynnika chłodniczego i naprawy klimatyzatorów wszystkich marek.",
    longDescription:
      "Oferujemy kompleksowy serwis klimatyzacji obejmujący okresowe przeglądy, czyszczenie i dezynfekcję filtrów, uzupełnianie czynnika chłodniczego, diagnostykę usterek oraz naprawy. Regularny serwis przedłuża żywotność urządzenia, utrzymuje jego efektywność energetyczną i zapewnia czyste, zdrowe powietrze w pomieszczeniu. Serwisujemy klimatyzatory wszystkich marek — nie tylko te przez nas zamontowane.",
    icon: "Settings",
    steps: [
      { title: "Zgłoszenie serwisowe", description: "Zadzwoń lub napisz do nas opisując problem lub potrzebę przeglądu. Umówimy dogodny termin wizyty." },
      { title: "Diagnostyka", description: "Nasz technik przeprowadza pełną diagnostykę urządzenia — sprawdza ciśnienie czynnika, stan filtrów, szczelność instalacji i parametry pracy." },
      { title: "Czyszczenie i konserwacja", description: "Czyścimy filtry, parownik, skraplacz i system odprowadzania skroplin. Dezynfekujemy jednostkę wewnętrzną preparatami antygrzybnymi." },
      { title: "Raport i zalecenia", description: "Po serwisie otrzymujesz raport z opisem wykonanych prac i ewentualnymi zaleceniami dotyczącymi dalszej eksploatacji." },
    ],
    faq: [
      { question: "Jak często trzeba serwisować klimatyzację?", answer: "Zalecamy przegląd minimum raz w roku — najlepiej przed sezonem letnim. W przypadku intensywnego użytkowania (biura, lokale gastronomiczne) warto robić przegląd co 6 miesięcy." },
      { question: "Ile kosztuje serwis klimatyzacji?", answer: "Cena przeglądu jednego urządzenia zaczyna się od ok. 250-350 zł. Dokładna kwota zależy od zakresu prac i stanu urządzenia." },
      { question: "Czy serwisujecie klimatyzatory innych firm?", answer: "Tak, serwisujemy klimatyzatory wszystkich marek, niezależnie od tego, kto wykonywał montaż." },
    ],
    link: "/serwis/warszawa",
  },
  {
    slug: "pompy-ciepla",
    name: "Pompy ciepła",
    shortDescription:
      "Sprzedaż i montaż pomp ciepła powietrze-woda. Samsung, Mitsubishi Heavy, Fujitsu, Neoheat.",
    longDescription:
      "Oferujemy profesjonalny dobór, sprzedaż i montaż pomp ciepła powietrze-woda dla domów jednorodzinnych. Współpracujemy z czołowymi producentami — Samsung, Mitsubishi Heavy, Fujitsu i Neoheat. Pompa ciepła pozwala zaoszczędzić nawet do 70% kosztów ogrzewania w porównaniu z gazem. Pomagamy również w uzyskaniu dofinansowania z programu Czyste Powietrze.",
    icon: "Flame",
    steps: [
      { title: "Analiza potrzeb", description: "Oceniamy zapotrzebowanie cieplne budynku na podstawie metrażu, izolacji i lokalizacji." },
      { title: "Dobór pompy ciepła", description: "Proponujemy optymalny model pompy ciepła dopasowany do Twojego domu i budżetu." },
      { title: "Montaż i uruchomienie", description: "Realizujemy kompleksowy montaż — hydraulika, elektryka, uruchomienie i konfiguracja." },
      { title: "Serwis gwarancyjny", description: "Zapewniamy pełen serwis gwarancyjny i pogwarancyjny oraz pomoc z dotacjami." },
    ],
    faq: [
      { question: "Ile kosztuje pompa ciepła z montażem?", answer: "Koszt pompy ciepła z montażem zaczyna się od ok. 30 000 zł. Dokładna cena zależy od mocy urządzenia i zakresu prac instalacyjnych." },
      { question: "Czy mogę uzyskać dofinansowanie?", answer: "Tak, w ramach programu Czyste Powietrze i Moje Ciepło można uzyskać dofinansowanie na pompę ciepła. Pomagamy w procesie aplikowania." },
    ],
    link: "/pompy-ciepla",
  },
  {
    slug: "wynajem-klimatyzatorow",
    name: "Wynajem klimatyzatorów",
    shortDescription:
      "Wynajem klimatyzatorów przenośnych na dni, tygodnie lub miesiące. Dostawa i odbiór na terenie Warszawy.",
    longDescription:
      "Oferujemy wynajem klimatyzatorów przenośnych na krótkie i długie okresy — idealne rozwiązanie na czas remontu, wydarzenia, sezonu letniego lub jako tymczasowe uzupełnienie stałej klimatyzacji. Dostarczamy i odbieramy sprzęt na terenie Warszawy i okolic. W ofercie mamy klimatyzatory przenośne o mocy od 2.5 kW do 5 kW, odpowiednie do pomieszczeń od 20 do 50 m².",
    icon: "Clock",
    steps: [
      { title: "Zamówienie", description: "Skontaktuj się z nami podając termin wynajmu, wielkość pomieszczenia i adres dostawy." },
      { title: "Dostawa", description: "Dostarczamy klimatyzator pod wskazany adres w umówionym terminie." },
      { title: "Użytkowanie", description: "Klimatyzator jest gotowy do użycia — wystarczy podłączyć do gniazdka i ustawić temperaturę." },
      { title: "Odbiór", description: "Po zakończeniu wynajmu odbieramy sprzęt z podanego adresu." },
    ],
    faq: [
      { question: "Na jaki okres mogę wynająć klimatyzator?", answer: "Minimalny okres wynajmu to 1 dzień. Oferujemy również stawki tygodniowe i miesięczne — im dłuższy okres, tym niższa stawka dzienna." },
      { question: "Czy dostawa jest w cenie?", answer: "Dostawa i odbiór na terenie Warszawy są wliczone w cenę wynajmu. Dla lokalizacji poza Warszawą naliczamy niewielką opłatę za transport." },
    ],
    link: "/wynajem-klimatyzatorow",
  },
];

export function getAllServices(): ServiceInfo[] {
  return services;
}

export function getServiceBySlug(slug: string): ServiceInfo | undefined {
  return services.find((s) => s.slug === slug);
}
