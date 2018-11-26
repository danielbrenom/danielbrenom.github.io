let ida = $("#partida"),
    enableLoc = $("#useLoc"),
    dates = $("#dates"),
    from = $("#icon_prefix_part"),
    dest = $("#icon_prefix_dest"),
    enableDate = $("#useDate"),
    search = $("#searchForm"),
    view = $("#resultArea"),
    drawArea = $("#drawable"),
    dateFrom = $('#icon_prefix_partd'),
    dateTo = $('#icon_prefix_destd');
$().ready(function () {
    view.toggle('fast');
    if (!$('#useLoc').is(':checked')) {
        ida.toggle('fast');
    }
    if (!$('input[type="checkbox"][name="dateCheck"]').is(":checked")) {
        dates.toggle('fast');
    }
    $('.datepicker').datepicker({
        format: 'dd/mm/yyyy'
    });
    $.get("js/json/capitais.json", {}, function (json) {
    }).done(function (json) {
        let aut = {};
        $.each(json, function (key, value) {
            aut[value.Nome] = null;
        });
        $(".typeahead").autocomplete({
            data: aut,
        });
    });
    $('.modal').modal();
});
enableLoc.change(function () {
    if ($(this).is(':checked')) {
        ida.show('slow');
    } else {
        ida.hide('slow');
    }
    from.val("");
});
enableDate.change(function () {
    if ($(this).is(':checked')) {
        dates.show('slow')
    } else {
        dates.hide('slow')
    }
    $('.datepicker').val("");
});


$("#searchButton").click(function () {
    search.toggle('slow');
    view.toggle('slow');
    $("h3.header").empty().append("Resultados da busca para: " + dest.val());
    generateFlights({ida: $("#icon_prefix_partd").val(), volta: $("#icon_prefix_destd").val()}, dest.val(), from.val())
});

$("#returnButton").click(function () {
    search.toggle('slow');
    view.toggle('slow');
    $(".progress").toggle('fast');
});
let cities = [],
    selectedCities = [],
    flightPrices = [],
    flightDepartures = [],
    totalFlights,
    lastCity = [],
    datesFromArray = [],
    datesToArray = [],
    today = new Date(),
    company = ["latam", "gol", "azul", "avianca"];

function generateFlights(days, desti, departure) {
    console.log(days);
    if (lastCity[0] !== desti || lastCity[1] !== departure || lastCity[2] !== days.ida || lastCity[3] !== days.volta) {
        drawArea.empty();
        lastCity[0] = desti;
        lastCity[1] = departure;
        lastCity[3] = days.ida;
        lastCity[4] = days.volta;
        totalFlights = Math.round(Math.random() * 50);
        let tempInidate;
        tempIniDate = days.ida !== "" ? new Date(returnDateValue(days.ida)) : new Date();
        generateFlightPrices(totalFlights);
        $.get("js/json/capitais.json", {}, function (json) {
            cities = json;
        }).done(function () {
            for (let c = 0; c <= totalFlights; c++) {
                let ar = new Date();

                drawArea.append(generateFlightCard(
                    (from.val() !== "" ? {Nome: from.val()} :
                        cities[Math.round(Math.random() * cities.length)]),
                    (dest.val() !== "" ? {Nome: dest.val()} :
                        ""),
                    flightPrices[c],
                    {
                        "departure": generateFlightDate(tempIniDate, true),
                        "arrival": generateFlightDate((days.volta === "" ? tempIniDate : new Date(returnDateValue(days.volta))), (days.volta !== ""))
                    },
                    company[Math.round(Math.random() * 3)]
                ));
            }
        });
        $(".progress").toggle('fast');
    } else {
        $(".progress").toggle('fast');
    }

}

function generateFlightCard(departure, destiny, price, dates, company) {
    let data = {
        comp : company
    };
    if (typeof departure !== 'undefined' && departure.Nome !== dest.val()) {
        return '<div class="col-6 s12 m7">' +
            '       <div class="card horizontal">' +
            '           <div class="row" style="margin: 0;">' +
            '               <div class="col-2" style="padding: 0;">' +
            '                   <img style="width: 100%; height: 100%;" src="img/' + company + '.png">' +
            '               </div>' +
            '               <div class="card-stacked col-10" style="padding: 0">' +
            '                   <div class="card-content">' +
            '                       <p>Partindo de ' + departure.Nome + "</p>" +
            '                       <p>Ida: ' + returnDateString(dates.departure) + '  Retorno: ' + returnDateString(dates.arrival) + '</p>' +
            '                       <button class="btn-floating halfway-fab waves-effect waves-light red modal-trigger" onclick="buy(\''+company+','+departure.Nome+','+destiny.Nome+','+returnDateString(dates.departure) +','+returnDateString(dates.arrival)   +'\')" data-target="modal1"><i class="fa fa-shopping-cart fa-lg"></i></btn>' +
            '                   </div>' +
            '                   <div class="card-action">' +
            '                       <a>Preço R$:' + price + '</a>' +
            '                   </div>' +
            '                </div>' +
            '            </div>' +
            '        </div>' +
            '    </div>';
    }
}

function returnDateString(date) {
    return (date.getDate() + 1) + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
}

function returnDateValue(date) {
    return date.split('/').reverse().join('-')
}

function generateFlightPrices(totalFlights) {
    for (let c = 0; c <= totalFlights; c++) {
        flightPrices[c] = Math.round(Math.random() * 10000);
    }
    flightPrices.sort(function (a, b) {
        return a - b;
    });
}

function generateFlightDate(date, toGenerate) {
    if (date === "" && !toGenerate) {
        tempDate = new Date();
        return datesFromArray = new Date(tempDate.setDate(tempDate.getDate() + Math.round(Math.random() * 30)));
    } else if (date !== "" && toGenerate) {
        return new Date(date);
    }
    else {
        tempDate = new Date(date);
        return datesFromArray = new Date(tempDate.setDate(tempDate.getDate() + Math.round(Math.random() * 30)));
    }
}

let flightCard =
    "<div class=\"col-6 s12 m7\">\n" +
    "                    <div class=\"card horizontal\">\n" +
    "                        <div class=\"row\" style=\"margin: 0;\">\n" +
    "                            <div class=\"col-2\" style=\"padding: 0;\">\n" +
    "                                <img style=\"width: 100%; height: 100%;\" src=\"../img/latam.png\">\n" +
    "                            </div>\n" +
    "                            <div class=\"card-stacked col-10\" style=\"padding: 0\">\n" +
    "                                <div class=\"card-content\">\n" +
    "                                    <p>I am a very simple card. I am good at containing small bits of information.</p>\n" +
    "                                </div>\n" +
    "                                <div class=\"card-action\">\n" +
    "                                    <a href=\"#\">This is a link</a>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>";

function buy(c) {
    let info = c.split(',');
    console.log(c.split(','));
    $(".modal").find('.textBuy').empty().text('Você deseja comprar a passagem para ' + info[1]+'?');
    $(".modal").find('.com').empty().text('Companhia: ' + info[0].replace(/\b\w/g, l => l.toUpperCase()));
    $(".modal").find('.dep').empty().text('Partida: ' + info[1]);
    $(".modal").find('.arv').empty().text('Destino: ' + info[2]);
    $(".modal").find('.depD').empty().text('Data partida: ' + info[3]);
    $(".modal").find('.arvD').empty().text('Data retorno: ' + info[4]);
}

function showBought() {
    $("#modal2").modal('open')
}
