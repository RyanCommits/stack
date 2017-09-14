// Sets up the edit card modal

$(document).ready(function () {
  $('.edit-button').click(function () {
    const cardFront = $(this).parent().prev().prev().text();
    const cardBack = $(this).parent().prev().text();
  });
});
