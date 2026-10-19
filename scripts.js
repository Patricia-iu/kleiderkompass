const geschaeftsstellePlz = "10105";
const geschaeftsstelleOrt = "Berlin";
const geschaeftsstelleStrasse = "Musterstraße 7";

document.getElementById("abholadresse").hidden = true;

document.getElementById("geschaeftsstelle").onclick = function () {
  document.getElementById("abholadresse").hidden = true;
  document.getElementById("strasse").required = false;
  document.getElementById("plz").required = false;
  document.getElementById("ort").required = false;
  document.getElementById("plz").disabled = true;
  pruefePlz();
};

document.getElementById("abholung").onclick = function () {
  document.getElementById("abholadresse").hidden = false;
  document.getElementById("strasse").required = true;
  document.getElementById("plz").required = true;
  document.getElementById("ort").required = true;
  document.getElementById("plz").disabled = false;
  pruefePlz();
};

function pruefePlz() {
  const plz = document.getElementById("plz");
  const abholung = document.getElementById("abholung");

  plz.setCustomValidity("");

  if (
    abholung.checked &&
    plz.value.length === 5 &&
    plz.value.slice(0, 2) !== geschaeftsstellePlz.slice(0, 2)
  ) {
    plz.setCustomValidity(
      "Abholung ist nur bei Postleitzahlen möglich, die mit 10 beginnen.",
    );
  }
}

document.getElementById("plz").oninput = pruefePlz;

document.getElementById("spendenformular").onsubmit = function (ereignis) {
  ereignis.preventDefault();

  if (document.getElementById("abholung").checked) {
    const strasse = document.getElementById("strasse");
    const ort = document.getElementById("ort");

    strasse.value = strasse.value.trim();
    ort.value = ort.value.trim();

    if (!document.getElementById("spendenformular").reportValidity()) {
      return;
    }
  }

  const spende = {
    kleidung: document.getElementById("kleidung").selectedOptions[0].text,
    region: document.getElementById("region").selectedOptions[0].text,
    uebergabe: document.querySelector('input[name="uebergabe"]:checked').value,
    zeitpunkt: new Date().toISOString(),
  };

  if (document.getElementById("abholung").checked) {
    spende.strasse = document.getElementById("strasse").value.trim();
    spende.plz = document.getElementById("plz").value.trim();
    spende.ort = document.getElementById("ort").value.trim();
  } else {
    spende.strasse = geschaeftsstelleStrasse;
    spende.plz = geschaeftsstellePlz;
    spende.ort = geschaeftsstelleOrt;
  }

  sessionStorage.setItem("kleiderspende", JSON.stringify(spende));
  window.location.href = "bestaetigung.html";
};

if (document.getElementById("abholung").checked) {
  document.getElementById("abholung").onclick();
} else {
  document.getElementById("geschaeftsstelle").onclick();
}
