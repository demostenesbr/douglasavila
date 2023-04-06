// Polls_vote - votacao
// $(document).ready(function(){
console.log("Polls vote.js loaded");

// document.addEventListener("DOMContentLoaded", function(event) {

$(".poll_form:not(.pollexec)").submit(function (event) {
  event.preventDefault();
  var div_poll_resposta = $(this).parent(".poll_respostas");
  div_poll_resposta.empty().append("<p>Enviando seu voto...</p>");
  // $("#cadastroMain").css('background-color','#ff4939');
  $form = $(this);
  // poll_id = $form.find("input[name='poll_id']").val();
  csrfmiddlewaretoken = $form.find("input[name='csrfmiddlewaretoken']").val();
  poll_respostas = [];
  url = $form.attr("action");
  method = $form.attr("method") || "get";
  method = method.toLowerCase();

  console.log("Polls vote.js DOMContentLoaded submit event");

  $form.find("input:checked").each(function () {
    poll_respostas.push($(this).val());
  });

  payload = {
    // 'poll_id': poll_id,
    poll_respostas: poll_respostas.join(","),
    // 'csrfmiddlewaretoken': csrfmiddlewaretoken,
    // 'cache_avoider': Math.random() * 1000000,
    is_ajax: 1,
  };

  if (method == "get") {
    var posting = $.get(url, payload);
  } else {
    var posting = $.post(url, payload);
  }

  posting.done(function (data) {
    //var content = $(data).find("#jqueryAjaxResponse");
    // $("#cadastroMain").css('background-color','green');
    div_poll_resposta.empty().append(data);
  });
  posting.fail(function (data) {
    // console.log(data);
    var message = "Ocorreu um erro inesperado. Tente mais tarde.";
    if (data.status == 429) {
      message = "Seu voto já foi computado. Volte mais tarde";
    }
    // $("#cadastroMain").css('background-color','red');
    // div_poll_resposta.empty().append(data);
    div_poll_resposta.empty().append(message);
  });
});
$(".poll_form").addClass("pollexec");
$('.poll_form input[type="submit"]').prop("disabled", false);

// ScrollToView
$(".poll_vote_button input").each(function (index) {
  $(this).on("click", function () {
    $(this).parents("blockquote.amdb-polls")[0].scrollIntoView(true);
  });
});
