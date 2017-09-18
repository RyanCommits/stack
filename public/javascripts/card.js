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


// User submits their difficulty recalling answers, saves to backend

$(document).ready(function () {
  $('.testbtn0').click(function () {
    $(this).closest('.inputContainer').find('.difficultyInput').val(0);
  });

  $('.testbtn1').click(function () {
    $(this).closest('.inputContainer').find('.difficultyInput').val(1);
  });

  $('.testbtn2').click(function () {
    $(this).closest('.inputContainer').find('.difficultyInput').val(2);
  });
  $('.testbtn3').click(function () {
    $(this).closest('.inputContainer').find('.difficultyInput').val(3);
  });

  $('.testbtn4').click(function () {
    $(this).closest('.inputContainer').find('.difficultyInput').val(4);
  });

  $('.testbtn5').click(function () {
    $(this).closest('.inputContainer').find('.difficultyInput').val(5);
  });
});

// Populates test cards one by one

$(document).ready(function () {

  const testPageDetect = $('.prompt').length;
  let i = 0;

  if (testPageDetect !== 0) {

      $(`.cardFooter${i}`).addClass('cardVisible');
      $(`.ct-chart${i}`).addClass('cardVisible');

      // answer button function

      $('.answerbtn').click(function () {
        $(`.answerbtn`).eq(i).addClass('hide');
        $(`.answerText`).eq(i).addClass('cardVisible');
      });

      // progression button

      $('.testbtn').click(function () {

        $(`.cardFooter${i}`).removeClass('cardVisible');
        $(`.ct-chart${i}`).removeClass('cardVisible');

// checks for end of test

        if(testPageDetect === i + 1) {
            $('.endTestTop').addClass('endVisible');
            $('.endTest').addClass('endVisible');
            // $('.memoForm').submit();
          return;
        }

        i++;
        $(`.cardFooter${i}`).addClass('cardVisible');
        $(`.ct-chart${i}`).addClass('cardVisible');
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

// Submits Supermemo data

$(document).ready(function () {
  $('.saveQuit').click(function () {
    $('.memoForm').submit();
  });
  $('.dashBtn').click(function () {
    $('.memoForm').submit();
  });
});
