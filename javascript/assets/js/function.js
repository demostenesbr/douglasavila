function docReady(fn) {
  // see if DOM is already available
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    // call on next available tick
    setTimeout(fn, 1);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

docReady(function () {
  // DOM is loaded and ready for manipulation here
  $("blockquote.amdb-polls[data-sid]").each(function (index) {
    var bloco = $(this);
    var surl = bloco.attr("data-sid");
    console.log("Polls embed.js docReady each amdb-polls", surl);
    $.get(surl, function (data) {
      bloco.html(data);
      console.log("Polls embed.js docReady get callback", bloco);
    });
  });
});
