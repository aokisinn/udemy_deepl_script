const elm = document.body;
const config = {
  attributes: true,
  childList: true,
  characterData: true,
  subtree: true,
};

let caption;
let nowString;
const observer = new MutationObserver(function () {
  caption =
    $("div[class^='well--container--']").length == 1
      ? $("div[class^='well--container--']").text()
      : $("div[class^='captions-display--captions-container']").text();
  if (caption !== "" && nowString !== caption) {
    console.log("go transration");
    nowString = caption;
    observer.disconnect();
    $.post("https://api-free.deepl.com/v2/translate", {
      // TODO ここDeeplのAPIキーに置き換え
      auth_key: "b339986d-280b-665d-7534-5e389d0b706f:fx",
      text: nowString,
      target_lang: "JA",
    })
      .done(function (data) {
        console.log(data);
        console.log(data.translations[0].text);
        $(".well--text--2H_p0").text(data.translations[0].text);
      })
      .always(function () {
        observer.observe(elm, config);
      });
  }
});

observer.observe(elm, config);
