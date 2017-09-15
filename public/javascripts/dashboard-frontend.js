// select tag JS to select shared settings

$(document).ready(function () {
    $(".btn-select").each(function (e) {
        var value = $(this).find("ul li.selected").html();
        if (value != undefined) {
            $(this).find(".btn-select-input").val(value);
            $(this).find(".btn-select-value").html(value);
        }
    });
});

$(document).on('click', '.btn-select', function (e) {
    e.preventDefault();
    var ul = $(this).find("ul");
    if ($(this).hasClass("active")) {
        if (ul.find("li").is(e.target)) {
            var target = $(e.target);
            target.addClass("selected").siblings().removeClass("selected");
            var value = target.html();
            $(this).find(".btn-select-input").val(value);
            $(this).find(".btn-select-value").html(value);
        }
        ul.hide();
        $(this).removeClass("active");
    }
    else {
        $('.btn-select').not(this).each(function () {
            $(this).removeClass("active").find("ul").hide();
        });
        ul.slideDown(300);
        $(this).addClass("active");
    }
});

$(document).on('click', function (e) {
    var target = $(e.target).closest(".btn-select");
    if (!target.length) {
        $(".btn-select").removeClass("active").find("ul").hide();
    }
});

// dashboard left panel active css control

$(document).ready(function () {
  if (document.location.pathname.indexOf("my-stacks") > -1) {
    $(".leftNav").removeClass("active");
    $(".leftNavStack").addClass("active");
}
  if (document.location.pathname.indexOf("home") > -1) {
    $(".leftNav").removeClass("active");
    $(".leftNavDash").addClass("active");
}
  if (document.location.pathname.indexOf("profile") > -1) {
    $(".leftNav").removeClass("active");
    $(".leftNavProf").addClass("active");
}
  if (document.location.pathname.indexOf("public-stacks") > -1) {
    $(".leftNav").removeClass("active");
    $(".leftNavPublic").addClass("active");
}
});
