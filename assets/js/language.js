// Source - https://stackoverflow.com/a/71243264
// Posted by DDomen, modified by community. See post 'Timeline' for change history
// Retrieved 2026-03-08, License - CC BY-SA 4.0

function updateLocalizedAttributes(languageCode) {
  const localizedAttributes = [
    "placeholder",
    "alt",
    "title",
    "aria-label",
    "value",
  ];

  localizedAttributes.forEach(function (attributeName) {
    const selector =
      "[data-" + attributeName + "-en][data-" + attributeName + "-da]";

    Array.from(document.querySelectorAll(selector)).forEach(function (elem) {
      const value = elem.getAttribute(
        "data-" + attributeName + "-" + languageCode,
      );

      if (value === null) {
        return;
      }

      if (attributeName === "value" && "value" in elem) {
        elem.value = value;
        return;
      }

      if (attributeName === "title" && elem.tagName.toLowerCase() === "title") {
        elem.textContent = value;
      }

      elem.setAttribute(attributeName, value);
    });
  });
}

function changeLanguage(languageCode) {
  Array.from(document.getElementsByClassName("lang")).forEach(function (elem) {
    const shouldShow = elem.classList.contains("lang-" + languageCode);
    elem.hidden = !shouldShow;
  });

  document.documentElement.setAttribute("data-lang", languageCode);
  document.documentElement.lang = languageCode;
  updateLocalizedAttributes(languageCode);
  document.documentElement.classList.remove("lang-pending");
}

// select handler
const selector = document.getElementById("langSelector");

if (selector) {
  selector.addEventListener("change", function () {
    changeLanguage(this.value);

    try {
      localStorage.setItem("preferredLanguage", this.value);
    } catch (error) {
      // Ignore browsers/settings that block storage.
    }
  });

  // detect initial browser language
  const browserLang = navigator.language || "en";
  const supportedLanguages = Array.from(selector.options).map(function (opt) {
    return opt.value;
  });

  let startLang =
    supportedLanguages.find(function (val) {
      return browserLang.toLowerCase().includes(val.toLowerCase());
    }) || "en";

  try {
    const preferredLanguage = localStorage.getItem("preferredLanguage");

    if (preferredLanguage && supportedLanguages.includes(preferredLanguage)) {
      startLang = preferredLanguage;
    }
  } catch (error) {
    // Ignore browsers/settings that block storage.
  }

  if (!supportedLanguages.includes(startLang)) {
    startLang = "en";
  }

  selector.value = startLang;
  changeLanguage(startLang);

  // Optional debug placeholders (present in demo snippets only).
  const browserLangElem = document.getElementById("browserLang");
  const startLangElem = document.getElementById("startLang");

  if (browserLangElem) {
    browserLangElem.innerText = browserLang;
  }

  if (startLangElem) {
    startLangElem.innerText = startLang;
  }
} else {
  document.documentElement.classList.remove("lang-pending");
}
