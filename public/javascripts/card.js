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

// Populates test cards one by one

$(document).ready(function () {

  const testPageDetect = $('.prompt').length;
  let i = 0;

  if (testPageDetect !== 0) {

      $(`.prompt${i}`).addClass('cardVisible');
      $(`.answer${i}`).addClass('cardVisible');

      // answer button function

      $('.answerbtn').click(function () {
        $(`.answerbtn`).eq(i).addClass('hide');
        $(`.answerText`).eq(i).addClass('cardVisible');
      });

      // progression button

      $('.testbtn').click(function () {

        $(`.prompt${i}`).removeClass('cardVisible');
        $(`.answer${i}`).removeClass('cardVisible');

// checks for end of test

        if(testPageDetect === i + 1) {
            $('.endTestTop').addClass('endVisible');
            $('.endTest').addClass('endVisible');
          return;
        }

        i++;
        $(`.prompt${i}`).addClass('cardVisible');
        $(`.answer${i}`).addClass('cardVisible');
        $('.cardCount').text(`${i+1} out of ${testPageDetect}`);
      });

// Tracks test progress ex: (1 out of 50 cards)

      $('.cardCount').text(`${i+1} out of ${testPageDetect}`);
      }
});

// Set privacy setting

$(document).ready(function () {
  $('.sharedSetting').click(function () {
    $(this).parent().submit();
  });

  $('.privateSetting').click(function () {
    $(this).parent().submit();
  });
});
