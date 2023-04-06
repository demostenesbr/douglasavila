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
  var blockquotes = document.querySelectorAll(
    "blockquote.amdb-polls[data-sid]"
  );
  blockquotes.forEach(function (bloco) {
    var surl = bloco.getAttribute("data-sid");
    console.log("Polls embed.js docReady each amdb-polls", surl);
    fetch(surl)
      .then(function (response) {
        return response.text();
      })
      .then(function (data) {
        bloco.innerHTML = data;
        console.log("Polls embed.js docReady get callback", bloco);
      });
  });
});

// Response

console.log("Polls vote.js loaded");

document.querySelectorAll(".poll_form:not(.pollexec)").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const divPollResposta = form.parentNode.querySelector(".poll_respostas");
    divPollResposta.innerHTML = "<p>Enviando seu voto...</p>";
    const csrfmiddlewaretoken = form.querySelector(
      "input[name='csrfmiddlewaretoken']"
    ).value;
    let pollRespostas = [];
    const url = form.getAttribute("action");
    let method = form.getAttribute("method") || "get";
    method = method.toLowerCase();

    console.log("Polls vote.js DOMContentLoaded submit event");

    form.querySelectorAll("input:checked").forEach((input) => {
      pollRespostas.push(input.value);
    });

    const payload = {
      poll_respostas: pollRespostas.join(","),
      is_ajax: 1,
    };

    let posting;
    if (method === "get") {
      posting = fetch(url, {
        method: "GET",
        body: JSON.stringify(payload),
      });
    } else {
      posting = fetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
      });
    }

    posting
      .then((response) => response.text())
      .then((data) => {
        divPollResposta.innerHTML = data;
      })
      .catch((error) => {
        let message = "Ocorreu um erro inesperado. Tente mais tarde.";
        if (error.status === 429) {
          message = "Seu voto já foi computado. Volte mais tarde";
        }
        divPollResposta.innerHTML = message;
      });
  });
});

document.querySelectorAll(".poll_form").forEach((form) => {
  form.classList.add("pollexec");
});

document
  .querySelectorAll('.poll_form input[type="submit"]')
  .forEach((input) => {
    input.disabled = false;
  });

// ScrollToView
document.querySelectorAll(".poll_vote_button input").forEach((input) => {
  input.addEventListener("click", () => {
    const parent = input.closest("blockquote.amdb-polls");
    parent.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
