const daten = sessionStorage.getItem("kleiderspende");

if (daten !== null) {
  try {
    const spende = JSON.parse(daten);
    const Zeitpunkt = new Date(spende.zeitpunkt);

    document.getElementById("ausgabe-kleidung").textContent = spende.kleidung;
    document.getElementById("ausgabe-region").textContent = spende.region;

    document.getElementById("ausgabe-uebergabe").textContent =
      spende.uebergabe === "abholung"
        ? "Abholung"
        : "Übergabe an der Geschäftsstelle";

    document.getElementById("ausgabe-datum").textContent =
      Zeitpunkt.toLocaleDateString("de-DE");

    document.getElementById("ausgabe-uhrzeit").textContent =
      Zeitpunkt.toLocaleTimeString("de-DE", {
        hour: "2-digit",
        minute: "2-digit",
      });

    document.getElementById("ausgabe-ort").textContent =
      spende.strasse + ", " + spende.plz + " " + spende.ort;

    document.getElementById("status").textContent =
      "Deine Angaben wurden erfolgreich gespeichert. Vielen Dank für deine Spende!";

    document.getElementById("spendendetails").hidden = false;
  } catch (fehler) {
    document.getElementById("spendendetails").hidden = true;

    document.getElementById("status").textContent =
      "Deine Angaben konnten nicht geladen werden. Bitte registriere deine Spende erneut.";
  }
} else {
  document.getElementById("status").textContent =
    "Bitte registrieren Sie zuerst eine Kleiderspende.";
}
