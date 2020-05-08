(async function () {
  console.log("USER SCRIPT EXECUTING on", window.location.href, {
    documentReadyState: document.readyState,
  });
  const oldStoredValue = await GM_getValue("testkey");
  await GM_setValue("testkey", window.location.href);
  const newStoredValue = await GM_getValue("testkey");

  const overwriteBody = () => {
    document.body.innerHTML = `<h1>This page has been eaten: ${JSON.stringify({oldStoredValue, newStoredValue})}<h1>`
  }

  if (document.body) {
    overwriteBody();
  } else {
    window.addEventListener("load", overwriteBody, {once: true});
  }
})();