$('#showInfo').click(function () {

    let info = $('#info');

    if (info.hasClass('ng-hide'))
        info.removeClass('ng-hide')
    else
        info.addClass('ng-hide');
});

$(document).ready(async function () {

    let d = await  $.ajax({
                 url: '/api/record?chargebackCategory=5',
                 type: 'get'
             });

    let temp = d.map(el => ({
                                     fullname: el.obligor.fullName,
                                     amount_of_money_to_be_recovered: el.moneyAmountToBeRecovered,
                                     identification_code: el.obligor.identificationCode,
                                     number_of_issue: 1
                            }));

    let t = temp.reduce(function (obj, el) {

    	// If the integer doesn't already exist as a key in the object, create it
    	if (!obj.hasOwnProperty(el.fullname)) {
    		obj[el.fullname] = [];
    	}

    	// Push the number to its integer key
    	obj[el.fullname].push(el);

    	// Pass the object on to the next loop
    	return obj;

    }, {});

    console.log("reduced:");
    console.log(t);

    let somear = [];

    Object.keys(t).map(function(key, index) {
      var ar = t[key];
      let tmp = ar.reduce(function(obj, el){
            if (!obj.hasOwnProperty("amount_of_money_to_be_recovered")) {
                obj.amount_of_money_to_be_recovered = 0;
                obj.number_of_issues = 0;
            }
                obj.amount_of_money_to_be_recovered += el.amount_of_money_to_be_recovered;
                obj.number_of_issues += 1;

           return obj;
      },{});
      tmp.fullname = ar[0].fullname;
      tmp.identification_code = ar[0].identification_code;
      somear.push(tmp);
    });

    console.log("reduced2:");
    console.log(somear);

    let testData = "[\n" +
        "        {\n" +
        "            \"id\": \"1\",\n" +
        "            \"identification_code\": \"05747991\",\n" +
        "            \"fullname\": \"АКЦІОНЕРНЕ ТОВАРИСТВО \\\"СУМСЬКЕ МАШИНОБУДІВНЕ НАУКОВО-ВИРОБНИЧЕ ОБ'ЄДНАННЯ\\\"\",\n" +
        "            \"amount_of_money_to_be_recovered\": \"170442994.07\",\n" +
        "            \"number_of_issues\":\"3720\"\n" +
        "        },\n" +
        "        {\n" +
        "            \"id\": \"2\",\n" +
        "            \"identification_code\": \"24341697\",\n" +
        "            \"fullname\": \"Публічне акціонерне товариство \\\"Футбольний клуб \\\"Металіст\\\"\",\n" +
        "            \"amount_of_money_to_be_recovered\": \"46323898.07\",\n" +
        "            \"number_of_issues\":\"29\"\n" +
        "        },\n" +
        "        {\n" +
        "            \"id\": \"3\",\n" +
        "            \"identification_code\": \"\\t33270581\",\n" +
        "            \"fullname\": \"ПРИВАТНЕ АКЦІОНЕРНЕ ТОВАРИСТВО \\\"СЄВЄРОДОНЕЦЬКЕ ОБ'ЄДНАННЯ АЗОТ\\\"\",\n" +
        "            \"amount_of_money_to_be_recovered\": \"142394.07\",\n" +
        "            \"number_of_issues\":\"680\"\n" +
        "        },\n" +
        "        {\n" +
        "            \"id\": \"4\",\n" +
        "            \"identification_code\": \"05747991\",\n" +
        "            \"fullname\": \"КП ШКЗ Зірка\",\n" +
        "            \"amount_of_money_to_be_recovered\": \"1743294.07\",\n" +
        "            \"number_of_issues\":\"1021\"\n" +
        "        },\n" +
        "        {\n" +
        "            \"id\": \"5\",\n" +
        "            \"identification_code\": \"05747991\",\n" +
        "            \"fullname\": \"\\tАКЦІОНЕРНЕ ТОВАРИСТВО \\\"ЗАВОД \\\"МАЯК\\\"\",\n" +
        "            \"amount_of_money_to_be_recovered\": \"538687543.07\",\n" +
        "            \"number_of_issues\":\"720\"\n" +
        "        },\n" +
        "        {\n" +
        "            \"id\": \"6\",\n" +
        "            \"identification_code\": \"05747991\",\n" +
        "            \"fullname\": \"ДП \\\"ДЕВЗ\\\"\",\n" +
        "            \"amount_of_money_to_be_recovered\": \"123423.07\",\n" +
        "            \"number_of_issues\":\"30\"\n" +
        "        }\n" +
        "\n" +
        "    ]";
    let data = [
        {
            "id": "1",
            "identification_code": "05747991",
            "fullname": "АКЦІОНЕРНЕ ТОВАРИСТВО \"СУМСЬКЕ МАШИНОБУДІВНЕ НАУКОВО-ВИРОБНИЧЕ ОБ'ЄДНАННЯ\"",
            "amount_of_money_to_be_recovered": "170442994.07",
            "number_of_issues": "3720"
        },
        {
            "id": "2",
            "identification_code": "24341697",
            "fullname": "Публічне акціонерне товариство \"Футбольний клуб \"Металіст\"",
            "amount_of_money_to_be_recovered": "170442994.07",
            "number_of_issues": "29"
        },
        {
            "id": "3",
            "identification_code": "\t33270581",
            "fullname": "ПРИВАТНЕ АКЦІОНЕРНЕ ТОВАРИСТВО \"СЄВЄРОДОНЕЦЬКЕ ОБ'ЄДНАННЯ АЗОТ\"",
            "amount_of_money_to_be_recovered": "170442994.07",
            "number_of_issues": "680"
        },
        {
            "id": "4",
            "identification_code": "05747991",
            "fullname": "КП ШКЗ Зірка",
            "amount_of_money_to_be_recovered": "170442994.07",
            "number_of_issues": "1021"
        },
        {
            "id": "5",
            "identification_code": "05747991",
            "fullname": "\tАКЦІОНЕРНЕ ТОВАРИСТВО \"ЗАВОД \"МАЯК\"",
            "amount_of_money_to_be_recovered": "170442994.07",
            "number_of_issues": "3720"
        },
        {
            "id": "6",
            "identification_code": "05747991",
            "fullname": "ДП \"ДЕВЗ\"",
            "amount_of_money_to_be_recovered": "170442994.07",
            "number_of_issues": "3720"
        }

    ];

//    let parsed_data = JSON.parse(testData);

    let parsed_data = somear;

    $('#numberOfRecords').text(`Кількість записів в реєстрі: ${parsed_data.length}`);

    let index = 1;

    parsed_data.forEach(function (entity) {
        let entityElement = `<tr  class="print-no-page-break">
                        <td data-title="№">${index}</td>
                        <td data-title="Ідентифікаційний номер">${entity.identification_code}</td>
                        <td data-title="Найменування боржника">
                            <span >${entity.fullname}</span>
                        </td>
                        <td data-title="Загальна сума заборгованості">${entity.amount_of_money_to_be_recovered}</td>
                        <td data-title="Кількість відкритих ВП">${entity.number_of_issues}</td>
                        <td>
                            <a href="search-debtor?id_code=${entity.identification_code}&type=legal" >
                                Шукати у єдиному реєстрі боржників
                            </a>
                        </td>
                    </tr>`;

        $("#results").append(entityElement);

        index++;
    });

});
