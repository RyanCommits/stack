// Sets up the edit card modal

$(document).ready(function () {
  $('.edit-button').click(function () {
    const cardFront = $(this).parent().prev().prev().text();
    const cardBack = $(this).parent().prev().text();

// extracts StackID and CardID
    const cardEditAttr = $(this).parent().next().children().first().attr('action').split('/');

    const idURL = cardEditAttr[2] + '/' + cardEditAttr[3];

    $('.editFrontLabel').text(cardFront);
    $('.editBackLabel').text(cardBack);
    $('.editForm').attr("action", "/dashboard/" + idURL + "/edit");

  });
});
