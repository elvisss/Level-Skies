/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function resized() {
    var alto = $(window).height();
    var ancho = $(window).width();
    //alert(ancho);
    var header = $('header').height();
    var footer = $('footer').height();
    
    var footerpages = 0;
    $('footer ul li').each ( function() {
        footerpages += $(this).width() + 51;
    });
    
    $('footer ul').width(footerpages);
    
    //if (ancho < 467) {
        $(".content, .lateral-menu").height((alto - header) + "px");
    //} else {
    //    $(".content, .lateral-menu").height((alto - 103) + "px");
    //}
    
    $('.content section').css('min-height',(($('.content').height()) - (footer + 8)));

    $('#container, .header').css({
        'left':'0'
        //'height' : alto
    });
    $('.content').css('overflow','auto');
    $('.bars').removeClass('open');
    
    var left = ($(window).width() - $('header aside').width()) + 'px';
    $('#navigation').width(left);
    
}

$(document).ready(function(){
    resized();
    
    /* Autocomplete & PopUp */
    
    $('#show-from-depart').click(function(){
        openPopup();
        //$("#from-depart, #backgroundPopup").fadeIn(500);
        $("#from-depart").animate({
            top: '0'
        },1000);
        $('.autocomplete-suggestions').css({
            width: $('.searchfield-from').width()
        });
    });
    
    $('#show-to-depart').click(function(){
        openPopup();
        //$("#to-depart, #backgroundPopup").fadeIn(500);
        $("#to-depart").animate({
            top: '0'
        },1000);
        $('.autocomplete-suggestions').css({
            width: $('.searchfield-to').width()
        });
    });
    
    $(this).keyup(function(event) {
        if (event.which == 27 || event.which == 13) {
            disabledPopup();
        }
    });
    
    function openPopup() {
        $('#navigation, #container').css('z-index','-1');
        
    }
    
    function disabledPopup() {
        //$("#from-depart, #to-depart, #backgroundPopup").fadeOut(500);
        $(".popup").animate({
            top: '100%'
        },1000);
        $('#navigation').css('z-index','1');
        $('#container').css('z-index','2');
    }
    
  
   /*$('#autocomplete-to').autocomplete({
    lookup: currencies,
    onSelect: function (suggestion) {
      //var thehtml = '<strong>Currency Name:</strong> ' + suggestion.value + ' <br> <strong>Symbol:</strong> ' + suggestion.data;
      $('#to-from-depart .depart .name').html(suggestion.value);
      disabledPopup();
    }
  });*/
    
    /* Menú Lateral */

    $( ".bars" ).click(function() {

        $('#navigation').show();

        var left = ($(window).width() - $('header aside').width()) + 'px';

        $(this).toggleClass("open");
        
        if ($(this).hasClass("open")) {
            //$('#navigation').css('overflow','auto');
            $('#gotop').fadeOut();
            $('.content').css('overflow','hidden');
            $('.lateral-menu').css('overflow','auto');
            $('#container, header').animate({
                left: left
            }, 500, function() {
                // Animation complete.
            });
        }   else {
            //$('#navigation').css('overflow','hidden');
            $('.content').css('overflow','auto');
            $('#container, header').animate({
                left: 0
            }, 500, function() {
                // Animation complete.
            });
        }
        
    });
    
    $('.accordion-item i').click(function(){
        //alert("msg");
        $(this).toggleClass("active").parent().siblings('.accordion-content').toggle('fast');
    });
    
    $("#gotop").hide();

    $('.content').scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('#gotop').fadeIn();
        } else {
            $('#gotop').fadeOut();
        }
    });
        
    $('#gotop a').click(function (event) {
        event.preventDefault();
        $('.content').animate({
            scrollTop: 0
        }, 800);
        return false;
    });
    
    $('.flexi').click(function(){
        $(this).toggleClass('flexi-selected');
    });


});

$(window).resize(function(){
    resized();
});

$(window).on("load", function() {
    //console.log($(window).width())
    $currentcalendar = "";
    var $lastcalendat = ""
    $(document).on("click", "label .white-bot-arrow", function() {
        $currentcalendar = $(this).parents(".control").next();
        $lastcalendat = $($currentcalendar);
        if ($(this).hasClass("second")) {
            $(this).parents(".control").next().find(".day").text($(".first-calendar").find(".day").text())
            $(this).parents(".control").next().find(".month").text($(".first-calendar").find(".month").text())
            $(this).parents(".control").next().find(".year").text($(".first-calendar").find(".year").text())
        }
        $($currentcalendar).slideDown();
    });
    $(".first-control").on("click", function() {
        $(".second-calendar").slideUp();
        $(".second-calendar").prev().find(".date").html($(".second-calendar").find(".day").text() +
                '/' + $(".second-calendar").find(".month").text() + '/' + $(".second-calendar").find(".year").text() + "<i class='sprite white-bot-arrow second'></i>");
    });
    $(".second-control").on("click", function() {
        $(".first-calendar").slideUp();
        $(".first-calendar").prev().find(".date").html($(".first-calendar").find(".day").text() +
                '/' + $(".first-calendar").find(".month").text() + '/' + $(".first-calendar").find(".year").text() + "<i class='sprite white-bot-arrow first'></i>");

    });
    $("body").on("click", function(e) {
        if (!$(e.target).is(".calendar-control") && !$(e.target).parents(".calendar-control").length > 0) {
            $($currentcalendar).slideUp();
            $($lastcalendat).prev().find(".date").html($($lastcalendat).find(".day").text() +
                    '/' + $($lastcalendat).find(".month").text() + '/' + $($lastcalendat).find(".year").text() + "<i class='sprite white-bot-arrow'></i>");
        }
    });
    var d = new Date(), day = d.getDate(), month = d.getMonth() + 1, year = d.getFullYear();
    $(".day").text(day);
    $(".month").text(month);
    $(".year").text(year);
    var $change = "", $calcday = "", $calcmonth = "", $calcyear = "", $daysinmonth = 0;

    $(".calendar-content .blue-top-arrow").on("click", function() {
        if ($(this).hasClass("first")) {
            calendartopcalculate($(this), year, month);
        } else {
            calendartopcalculate($(this), $(".first-calendar").find(".year").text(),
                    $(".first-calendar").find(".month").text());
        }
    });
    $(".calendar-content .blue-bot-arrow.first,.calendar-content .blue-bot-arrow.second").on("click", function() {
        if ($(this).hasClass("first")) {
            calendarbotcalculate($(this), year, month, day);
        } else {
            calendarbotcalculate($(this), $(".first-calendar").find(".year").text(),
                    $(".first-calendar").find(".month").text(), $(".first-calendar").find(".day").text());
        }
    });



    function calendartopcalculate($this, yeartop, monthtop) {
        $change = $($this).next();
        $calcmonth = $($this).parents("ul").find(".month").text();
        $calcyear = $($this).parents("ul").find(".year").text();
        if ($($change).hasClass("day")) {
            $daysinmonth = daysInMonth($calcmonth, $calcyear);
            if (parseInt($($change).text()) < $daysinmonth) {
                $($change).text(parseInt($($change).text()) + 1);
            }
        } else if ($($change).hasClass("month")) {
            if ($calcyear == yeartop) {
                if (parseInt($($change).text()) < 12) {
                    $($change).text(parseInt($($change).text()) + 1);
                }
            } else {
                if ($calcmonth < monthtop - 1) {
                    $($change).text(parseInt($($change).text()) + 1);
                }
            }
            $daysinmonth = daysInMonth(parseInt($($change).text()), $calcyear);
            if ($daysinmonth < parseInt($($this).parents("ul").find(".day").text())) {
                $($this).parents("ul").find(".day").text($daysinmonth);
            }
        } else if ($($change).hasClass("year")) {
            if (parseInt($($change).text()) < parseInt(yeartop) + 1) {
                $($change).text(parseInt($($change).text()) + 1);
                $($this).parents("ul").find(".month").text(1);
            }
        }
    }
    function calendarbotcalculate($this, yearbot, monthbot, daybot) {
        $change = $($this).prev();
        $calcday = $($this).parents("ul").find(".day").text();
        $calcmonth = $($this).parents("ul").find(".month").text();
        $calcyear = $($this).parents("ul").find(".year").text();
        if ($($change).hasClass("day")) {
            if (($calcmonth > monthbot || $calcyear > yearbot) && parseInt($($change).text()) > 1) {
                $($change).text(parseInt($($change).text()) - 1);
            } else if (parseInt($($change).text()) > 1 && ($calcmonth == monthbot && parseInt($($change).text()) > day)) {
                $($change).text(parseInt($($change).text()) - 1);
            }
        } else if ($($change).hasClass("month")) {
            if (parseInt($($change).text()) > 1 && (parseInt($calcmonth) > monthbot || $calcyear > yearbot)) {
                $($change).text(parseInt($($change).text()) - 1);
                if ($calcday < daybot && monthbot == parseInt($($change).text())) {
                    $($this).parents("ul").find(".day").text(daybot);
                }
                $daysinmonth = daysInMonth(parseInt($($change).text()), $calcyear);
                if ($daysinmonth < parseInt($($this).parents("ul").find(".day").text())) {
                    $($this).parents("ul").find(".day").text($daysinmonth);
                }
            }
        } else if ($($change).hasClass("year")) {
            if (parseInt($($change).text()) > yearbot) {
                $($change).text(parseInt($($change).text()) - 1);
                $($this).parents("ul").find(".month").text(12);
            }
        }
    }
    function daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }
});

/*file*/