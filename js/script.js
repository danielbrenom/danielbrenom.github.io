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
    })
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

function generateFlights(days, dest, departure) {
    console.log(days);
    if (lastCity[0] !== dest || lastCity[1] !== departure || lastCity[2] !== days.ida || lastCity[3] !== days.volta) {
        drawArea.empty();
        lastCity[0] = dest;
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
                    "",
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
            '                       <a class="btn-floating halfway-fab waves-effect waves-light red modal-trigger" href="#modal1"><i class="fa fa-shopping-cart fa-lg"></i></a>\n' +
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
    console.log(date);
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
