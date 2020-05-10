$(document).ready(function () {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let id = urlParams.get('id');
    let identification_code = urlParams.get('id_code');
    let fullname = urlParams.get('fullname');
    let type = urlParams.get('type');

    if ((fullname || identification_code) && type) {

        if (type === 'physical') {
            if (fullname) {
                let fullname_parts = fullname.split(' ');

                $("#inputSurname").val(fullname_parts[0]).trigger('keyup');
                $("#inputName").val(fullname_parts[1]).trigger('keyup');
                $("#inputPatro").val(fullname_parts[2]);
            }
            if (identification_code) {
                $("#inputPersonCode").val(identification_code).trigger('keyup');
            }

            $("#radioPhysical").prop('checked', 'checked');
            $('#searchBtnPhysical').trigger('click');

        } else if (type === 'legal') {

            if (identification_code) {
                $("#inputFirmCode").val(identification_code).trigger('keyup');
            }

            $('input:radio[name="debtorType"]').trigger('change');

            $("#radioLegalEntity").prop('checked', 'checked');
            $('#searchBtnLegal').trigger('click');
        }
    } else if (id) {


    }
});

function setEntitiesById(id) {
    //TODO
    //запрос на сервер за інф. про боржника
    let debtorData = {
        full_name: 'Хтото',
        is_legal_entity: true,
        identification_code: "7536483398"
    };
    //запрос на сервер за боргами цього боржника
    if( debtorData.is_legal_entity === true)
        setLegalEntities(debtorData.full_name,debtorData.identification_code, null);
    else
        setPhysicalEntities(debtorData.full_name, null, debtorData.identification_code, null);


}

function setPhysicalEntities(fullname, birthday, identification_code, chargeback_category) {
    //TODO
    //запрос на сервер по всім полям пошуку фіз.особи

    let dataArray = [
        {
            "id": "1",
            "full_name": "Вороніна Вероніка Анатоліївна",
            "birth_date": "09.10.1987",
            "executive_document_reciever": "інший орган, посадова особа Корабельний РВ ДВС м Херсон",
            "issuer_state_agency": "Переяслав-Хмельницький міськрайонний відділ державної виконавчої служби Центрального міжрегіонального управління Міністерства юстиції (м. Київ)",
            "issuer_full_name": "Марченко Ярослав Олександрович",
            "issuer_email": "pr_xmdvs@ukr.net",
            "issuer_phone_number": "045677-23-35",
            "executive_document_number_of_issue": "60217212",
            "chargeback_category": "стягнення коштів на користь держави"
        },
        {
            "id": "2",
            "full_name": "Петренко Оксана Петрівна",
            "birth_date": "08.08.1973",
            "executive_document_reciever": "господарський суд Господарський суд Одеської області , суддя Демешин О.А.",
            "issuer_state_agency": "Лиманський районний відділ державної виконавчої служби Головного територіального управління юстиції в Одеській області",
            "issuer_full_name": "Баловнєва Оксана Сергіївна (не діє)",
            "issuer_email": "info@km.od.dvs.gov.ua",
            "issuer_phone_number": "57277648",
            "executive_document_number_of_issue": "60217212",
            "chargeback_category": "стягнення коштів"
        },
        {
            "id": "3",
            "full_name": "Петренко Оксана Петрівна",
            "birth_date": "08.08.1973",
            "executive_document_reciever": "господарський суд Господарський суд Одеської області , суддя Демешин О.А.",
            "issuer_state_agency": "Лиманський районний відділ державної виконавчої служби Головного територіального управління юстиції в Одеській області",
            "issuer_full_name": "Баловнєва Оксана Сергіївна (не діє)",
            "issuer_email": "info@km.od.dvs.gov.ua",
            "issuer_phone_number": "57277648",
            "executive_document_number_of_issue": "60217212",
            "chargeback_category": "стягнення коштів"
        },
        {
            "id": "4",
            "full_name": "Петренко Оксана Петрівна",
            "birth_date": "08.08.1973",
            "executive_document_reciever": "господарський суд Господарський суд Одеської області , суддя Демешин О.А.",
            "issuer_state_agency": "Лиманський районний відділ державної виконавчої служби Головного територіального управління юстиції в Одеській області",
            "issuer_full_name": "Баловнєва Оксана Сергіївна (не діє)",
            "issuer_email": "info@km.od.dvs.gov.ua",
            "issuer_phone_number": "57277648",
            "executive_document_number_of_issue": "60217212",
            "chargeback_category": "стягнення коштів"
        }
    ];
    let testData = "[\n" +
        "        {\n" +
        "            \"id\": \"1\",\n" +
        "            \"full_name\": \"Вороніна Вероніка Анатоліївна\",\n" +
        "            \"birth_date\": \"09.10.1987\",\n" +
        "            \"executive_document_reciever\": \"інший орган, посадова особа Корабельний РВ ДВС м Херсон\",\n" +
        "            \"issuer_state_agency\": \"Переяслав-Хмельницький міськрайонний відділ державної виконавчої служби Центрального міжрегіонального управління Міністерства юстиції (м. Київ)\",\n" +
        "            \"issuer_full_name\": \"Марченко Ярослав Олександрович\",\n" +
        "            \"issuer_email\": \"pr_xmdvs@ukr.net\",\n" +
        "            \"issuer_phone_number\": \"045677-23-35\",\n" +
        "            \"executive_document_number_of_issue\": \"60217212\",\n" +
        "            \"chargeback_category\": \"стягнення коштів на користь держави\"\n" +
        "        },\n" +
        "        {\n" +
        "            \"id\": \"2\",\n" +
        "            \"full_name\": \"Петренко Оксана Петрівна\",\n" +
        "            \"birth_date\": \"08.08.1973\",\n" +
        "            \"executive_document_reciever\": \"господарський суд Господарський суд Одеської області , суддя Демешин О.А.\",\n" +
        "            \"issuer_state_agency\": \"Лиманський районний відділ державної виконавчої служби Головного територіального управління юстиції в Одеській області\",\n" +
        "            \"issuer_full_name\": \"Баловнєва Оксана Сергіївна (не діє)\",\n" +
        "            \"issuer_email\": \"info@km.od.dvs.gov.ua\",\n" +
        "            \"issuer_phone_number\": \"57277648\",\n" +
        "            \"executive_document_number_of_issue\": \"60217212\",\n" +
        "            \"chargeback_category\": \"стягнення коштів\"\n" +
        "        },\n" +
        "        {\n" +
        "            \"id\": \"3\",\n" +
        "            \"full_name\": \"Петренко Оксана Петрівна\",\n" +
        "            \"birth_date\": \"08.08.1973\",\n" +
        "            \"executive_document_reciever\": \"господарський суд Господарський суд Одеської області , суддя Демешин О.А.\",\n" +
        "            \"issuer_state_agency\": \"Лиманський районний відділ державної виконавчої служби Головного територіального управління юстиції в Одеській області\",\n" +
        "            \"issuer_full_name\": \"Баловнєва Оксана Сергіївна (не діє)\",\n" +
        "            \"issuer_email\": \"info@km.od.dvs.gov.ua\",\n" +
        "            \"issuer_phone_number\": \"57277648\",\n" +
        "            \"executive_document_number_of_issue\": \"60217212\",\n" +
        "            \"chargeback_category\": \"стягнення коштів\"\n" +
        "        },\n" +
        "        {\n" +
        "            \"id\": \"4\",\n" +
        "            \"full_name\": \"Петренко Оксана Петрівна\",\n" +
        "            \"birth_date\": \"08.08.1973\",\n" +
        "            \"executive_document_reciever\": \"господарський суд Господарський суд Одеської області , суддя Демешин О.А.\",\n" +
        "            \"issuer_state_agency\": \"Лиманський районний відділ державної виконавчої служби Головного територіального управління юстиції в Одеській області\",\n" +
        "            \"issuer_full_name\": \"Баловнєва Оксана Сергіївна (не діє)\",\n" +
        "            \"issuer_email\": \"info@km.od.dvs.gov.ua\",\n" +
        "            \"issuer_phone_number\": \"57277648\",\n" +
        "            \"executive_document_number_of_issue\": \"60217212\",\n" +
        "            \"chargeback_category\": \"стягнення коштів\"\n" +
        "        }\n" +
        "    ]";

    let parsed_data = JSON.parse(testData);

    let resTable = $('#physicalResultsTable');

    resTable.removeClass('ng-hide');

    {
        let today = new Date();
        let dateTimeStr = today.toLocaleDateString() + " " + today.toLocaleTimeString();

        $('#physicalSearchDateTime').text('Дата та час пошуку: ' + dateTimeStr);
    }


    parsed_data.forEach(function (entity) {
        let entityElement = `<tr class="print-no-page-break">
                            <td>${entity.full_name}</td>
                            <td>${entity.birth_date}</td>
                            <td>${entity.executive_document_reciever}</td>
                            <td class="wide-column">${entity.issuer_state_agency}
                                <br>
                                <br> ${entity.issuer_full_name}
                                <br>
                                <span> тел: <a href="tel:${entity.issuer_phone_number}">${entity.issuer_phone_number}</a></span>
                                <br>
                                <span> email: <a
                                        href="mailto:${entity.issuer_email}">${entity.issuer_email}</a></span>
                            </td>
                            <td>${entity.executive_document_number_of_issue}</td>
                            <td>${entity.chargeback_category}</td>
                            <td>
                                <button type="button" class="btn btn--color-negative delete-btn" data-id="${entity.id}" data-toggle="modal" data-target="#deleteModal">Видалити</button>
                                <button type="button" class="btn btn--color-warning update-btn" data-id="${entity.id}">Редагувати</button>
                            </td>
                            <td data-title="Детально" >
                                  <span class="cell-content">
                                            <a href="detailed_record_info.html?id=${entity.id}">
                                                Детальна інформація
                                            </a>
                                  </span>
                            </td>
                        </tr>`;

        $("#physicalResults").append(entityElement);
    });

    $('.delete-btn').bind('click', function () {
        $('#deleteModal').css('display', 'block');

        let entityId = $(this).attr('data-id');

        $('#confirmDeleteBtn').attr('data-delete_id', entityId);
    });

    $('.update-btn').bind('click', function () {
        let entityId = $(this).attr('data-id');

        window.location = `update_debt.html?id=${entityId}&type=physical`;
    });


    $('html, body').animate({
        scrollTop: resTable.offset().top
    }, 1000);
}

function setLegalEntities(firmname, identification_code, chargeback_category) {
    //TODO
    //запрос на сервер по всім полям пошуку юр.особи
    let testData = "[\n" +
        "                {\n" +
        "                    \"id\": \"13\",\n" +
        "                    \"full_name\": \"14307423 АТ \\\"ЗАВОД \\\"МАЯК\\\"\",\n" +
        "                    \"executive_document_reciever\": \"комісія по трудових спорах Комісія по трудових спорах АТ \\\"Завод \\\"Маяк\\\"\",\n" +
        "                    \"issuer_state_agency\": \"Оболонський районний відділ державної виконавчої служби у місті Києві Центрального міжрегіонального управління Міністерства юстиції (м. Київ)\",\n" +
        "                    \"issuer_full_name\": \"Манасерян Айкуі Арамівна\",\n" +
        "                    \"issuer_email\": \"vdvs.obolon@ukr.net\",\n" +
        "                    \"issuer_phone_number\": \"426-62-70\",\n" +
        "                    \"executive_document_number_of_issue\": \"59653780\",\n" +
        "                    \"chargeback_category\": \"стягнення коштів на користь держави\"\n" +
        "                },\n" +
        "                {\n" +
        "                    \"id\": \"12\",\n" +
        "                    \"full_name\": \"14307423 АТ \\\"ЗАВОД \\\"МАЯК\\\"\",\n" +
        "                    \"executive_document_reciever\": \"комісія по трудових спорах Комісія по трудових спорах АТ \\\"Завод \\\"Маяк\\\"\",\n" +
        "                    \"issuer_state_agency\": \"Оболонський районний відділ державної виконавчої служби у місті Києві Центрального міжрегіонального управління Міністерства юстиції (м. Київ)\",\n" +
        "                    \"issuer_full_name\": \"Манасерян Айкуі Арамівна\",\n" +
        "                    \"issuer_email\": \"vdvs.obolon@ukr.net\",\n" +
        "                    \"issuer_phone_number\": \"426-62-70\",\n" +
        "                    \"executive_document_number_of_issue\": \"59653780\",\n" +
        "                    \"chargeback_category\": \"стягнення коштів на користь держави\"\n" +
        "                },\n" +
        "                {\n" +
        "                    \"id\": \"11\",\n" +
        "                    \"full_name\": \"14307423 АТ \\\"ЗАВОД \\\"МАЯК\\\"\",\n" +
        "                    \"executive_document_reciever\": \"комісія по трудових спорах Комісія по трудових спорах АТ \\\"Завод \\\"Маяк\\\"\",\n" +
        "                    \"issuer_state_agency\": \"Оболонський районний відділ державної виконавчої служби у місті Києві Центрального міжрегіонального управління Міністерства юстиції (м. Київ)\",\n" +
        "                    \"issuer_full_name\": \"Манасерян Айкуі Арамівна\",\n" +
        "                    \"issuer_email\": \"vdvs.obolon@ukr.net\",\n" +
        "                    \"issuer_phone_number\": \"426-62-70\",\n" +
        "                    \"executive_document_number_of_issue\": \"59653780\",\n" +
        "                    \"chargeback_category\": \"стягнення коштів на користь держави\"\n" +
        "                },\n" +
        "                {\n" +
        "                    \"id\": \"10\",\n" +
        "                    \"full_name\": \"14307423 АТ \\\"ЗАВОД \\\"МАЯК\\\"\",\n" +
        "                    \"executive_document_reciever\": \"комісія по трудових спорах Комісія по трудових спорах АТ \\\"Завод \\\"Маяк\\\"\",\n" +
        "                    \"issuer_state_agency\": \"Оболонський районний відділ державної виконавчої служби у місті Києві Центрального міжрегіонального управління Міністерства юстиції (м. Київ)\",\n" +
        "                    \"issuer_full_name\": \"Манасерян Айкуі Арамівна\",\n" +
        "                    \"issuer_email\": \"vdvs.obolon@ukr.net\",\n" +
        "                    \"issuer_phone_number\": \"426-62-70\",\n" +
        "                    \"executive_document_number_of_issue\": \"59653780\",\n" +
        "                    \"chargeback_category\": \"стягнення коштів на користь держави\"\n" +
        "                },\n" +
        "                {\n" +
        "                    \"id\": \"9\",\n" +
        "                    \"full_name\": \"14307423 АТ \\\"ЗАВОД \\\"МАЯК\\\"\",\n" +
        "                    \"executive_document_reciever\": \"комісія по трудових спорах Комісія по трудових спорах АТ \\\"Завод \\\"Маяк\\\"\",\n" +
        "                    \"issuer_state_agency\": \"Оболонський районний відділ державної виконавчої служби у місті Києві Центрального міжрегіонального управління Міністерства юстиції (м. Київ)\",\n" +
        "                    \"issuer_full_name\": \"Манасерян Айкуі Арамівна\",\n" +
        "                    \"issuer_email\": \"vdvs.obolon@ukr.net\",\n" +
        "                    \"issuer_phone_number\": \"426-62-70\",\n" +
        "                    \"executive_document_number_of_issue\": \"59653780\",\n" +
        "                    \"chargeback_category\": \"стягнення коштів на користь держави\"\n" +
        "                },\n" +
        "                {\n" +
        "                    \"id\": \"8\",\n" +
        "                    \"full_name\": \"14307423 АТ \\\"ЗАВОД \\\"МАЯК\\\"\",\n" +
        "                    \"executive_document_reciever\": \"комісія по трудових спорах Комісія по трудових спорах АТ \\\"Завод \\\"Маяк\\\"\",\n" +
        "                    \"issuer_state_agency\": \"Оболонський районний відділ державної виконавчої служби у місті Києві Центрального міжрегіонального управління Міністерства юстиції (м. Київ)\",\n" +
        "                    \"issuer_full_name\": \"Манасерян Айкуі Арамівна\",\n" +
        "                    \"issuer_email\": \"vdvs.obolon@ukr.net\",\n" +
        "                    \"issuer_phone_number\": \"426-62-70\",\n" +
        "                    \"executive_document_number_of_issue\": \"59653780\",\n" +
        "                    \"chargeback_category\": \"стягнення коштів на користь держави\"\n" +
        "                },\n" +
        "                {\n" +
        "                    \"id\": \"7\",\n" +
        "                    \"full_name\": \"14307423 АТ \\\"ЗАВОД \\\"МАЯК\\\"\",\n" +
        "                    \"executive_document_reciever\": \"комісія по трудових спорах Комісія по трудових спорах АТ \\\"Завод \\\"Маяк\\\"\",\n" +
        "                    \"issuer_state_agency\": \"Оболонський районний відділ державної виконавчої служби у місті Києві Центрального міжрегіонального управління Міністерства юстиції (м. Київ)\",\n" +
        "                    \"issuer_full_name\": \"Манасерян Айкуі Арамівна\",\n" +
        "                    \"issuer_email\": \"vdvs.obolon@ukr.net\",\n" +
        "                    \"issuer_phone_number\": \"426-62-70\",\n" +
        "                    \"executive_document_number_of_issue\": \"59653780\",\n" +
        "                    \"chargeback_category\": \"стягнення коштів на користь держави\"\n" +
        "                },\n" +
        "                {\n" +
        "                    \"id\": \"6\",\n" +
        "                    \"full_name\": \"14307423 АТ \\\"ЗАВОД \\\"МАЯК\\\"\",\n" +
        "                    \"executive_document_reciever\": \"комісія по трудових спорах Комісія по трудових спорах АТ \\\"Завод \\\"Маяк\\\"\",\n" +
        "                    \"issuer_state_agency\": \"Оболонський районний відділ державної виконавчої служби у місті Києві Центрального міжрегіонального управління Міністерства юстиції (м. Київ)\",\n" +
        "                    \"issuer_full_name\": \"Манасерян Айкуі Арамівна\",\n" +
        "                    \"issuer_email\": \"vdvs.obolon@ukr.net\",\n" +
        "                    \"issuer_phone_number\": \"426-62-70\",\n" +
        "                    \"executive_document_number_of_issue\": \"59653780\",\n" +
        "                    \"chargeback_category\": \"стягнення коштів на користь держави\"\n" +
        "                },\n" +
        "                {\n" +
        "                    \"id\": \"5\",\n" +
        "                    \"full_name\": \"14307423 АТ \\\"ЗАВОД \\\"МАЯК\\\"\",\n" +
        "                    \"executive_document_reciever\": \"комісія по трудових спорах Комісія по трудових спорах АТ \\\"Завод \\\"Маяк\\\"\",\n" +
        "                    \"issuer_state_agency\": \"Оболонський районний відділ державної виконавчої служби у місті Києві Центрального міжрегіонального управління Міністерства юстиції (м. Київ)\",\n" +
        "                    \"issuer_full_name\": \"Манасерян Айкуі Арамівна\",\n" +
        "                    \"issuer_email\": \"vdvs.obolon@ukr.net\",\n" +
        "                    \"issuer_phone_number\": \"426-62-70\",\n" +
        "                    \"executive_document_number_of_issue\": \"59653780\",\n" +
        "                    \"chargeback_category\": \"стягнення коштів на користь держави\"\n" +
        "                },\n" +
        "                {\n" +
        "                    \"id\": \"4\",\n" +
        "                    \"full_name\": \"14307423 АТ \\\"ЗАВОД \\\"МАЯК\\\"\",\n" +
        "                    \"executive_document_reciever\": \"комісія по трудових спорах Комісія по трудових спорах АТ \\\"Завод \\\"Маяк\\\"\",\n" +
        "                    \"issuer_state_agency\": \"Оболонський районний відділ державної виконавчої служби у місті Києві Центрального міжрегіонального управління Міністерства юстиції (м. Київ)\",\n" +
        "                    \"issuer_full_name\": \"Манасерян Айкуі Арамівна\",\n" +
        "                    \"issuer_email\": \"vdvs.obolon@ukr.net\",\n" +
        "                    \"issuer_phone_number\": \"426-62-70\",\n" +
        "                    \"executive_document_number_of_issue\": \"59653780\",\n" +
        "                    \"chargeback_category\": \"стягнення коштів на користь держави\"\n" +
        "                },\n" +
        "                {\n" +
        "                    \"id\": \"3\",\n" +
        "                    \"full_name\": \"14307423 АТ \\\"ЗАВОД \\\"МАЯК\\\"\",\n" +
        "                    \"executive_document_reciever\": \"комісія по трудових спорах Комісія по трудових спорах АТ \\\"Завод \\\"Маяк\\\"\",\n" +
        "                    \"issuer_state_agency\": \"Оболонський районний відділ державної виконавчої служби у місті Києві Центрального міжрегіонального управління Міністерства юстиції (м. Київ)\",\n" +
        "                    \"issuer_full_name\": \"Манасерян Айкуі Арамівна\",\n" +
        "                    \"issuer_email\": \"vdvs.obolon@ukr.net\",\n" +
        "                    \"issuer_phone_number\": \"426-62-70\",\n" +
        "                    \"executive_document_number_of_issue\": \"59653780\",\n" +
        "                    \"chargeback_category\": \"стягнення коштів на користь держави\"\n" +
        "                },\n" +
        "                {\n" +
        "                    \"id\": \"2\",\n" +
        "                    \"full_name\": \"14307423 АТ \\\"ЗАВОД \\\"МАЯК\\\"\",\n" +
        "                    \"executive_document_reciever\": \"комісія по трудових спорах Комісія по трудових спорах АТ \\\"Завод \\\"Маяк\\\"\",\n" +
        "                    \"issuer_state_agency\": \"Оболонський районний відділ державної виконавчої служби у місті Києві Центрального міжрегіонального управління Міністерства юстиції (м. Київ)\",\n" +
        "                    \"issuer_full_name\": \"Манасерян Айкуі Арамівна\",\n" +
        "                    \"issuer_email\": \"vdvs.obolon@ukr.net\",\n" +
        "                    \"issuer_phone_number\": \"426-62-70\",\n" +
        "                    \"executive_document_number_of_issue\": \"59653780\",\n" +
        "                    \"chargeback_category\": \"стягнення коштів на користь держави\"\n" +
        "                }\n" +
        "            ]";
    let dataArray = [
        {
            "id": "13",
            "full_name": "14307423 АТ \"ЗАВОД \"МАЯК\"",
            "executive_document_reciever": "комісія по трудових спорах Комісія по трудових спорах АТ \"Завод \"Маяк\"",
            "issuer_state_agency": "Оболонський районний відділ державної виконавчої служби у місті Києві Центрального міжрегіонального управління Міністерства юстиції (м. Київ)",
            "issuer_full_name": "Манасерян Айкуі Арамівна",
            "issuer_email": "vdvs.obolon@ukr.net",
            "issuer_phone_number": "426-62-70",
            "executive_document_number_of_issue": "59653780",
            "chargeback_category": "стягнення коштів на користь держави"
        },
        {
            "id": "12",
            "full_name": "14307423 АТ \"ЗАВОД \"МАЯК\"",
            "executive_document_reciever": "комісія по трудових спорах Комісія по трудових спорах АТ \"Завод \"Маяк\"",
            "issuer_state_agency": "Оболонський районний відділ державної виконавчої служби у місті Києві Центрального міжрегіонального управління Міністерства юстиції (м. Київ)",
            "issuer_full_name": "Манасерян Айкуі Арамівна",
            "issuer_email": "vdvs.obolon@ukr.net",
            "issuer_phone_number": "426-62-70",
            "executive_document_number_of_issue": "59653780",
            "chargeback_category": "стягнення коштів на користь держави"
        },
        {
            "id": "11",
            "full_name": "14307423 АТ \"ЗАВОД \"МАЯК\"",
            "executive_document_reciever": "комісія по трудових спорах Комісія по трудових спорах АТ \"Завод \"Маяк\"",
            "issuer_state_agency": "Оболонський районний відділ державної виконавчої служби у місті Києві Центрального міжрегіонального управління Міністерства юстиції (м. Київ)",
            "issuer_full_name": "Манасерян Айкуі Арамівна",
            "issuer_email": "vdvs.obolon@ukr.net",
            "issuer_phone_number": "426-62-70",
            "executive_document_number_of_issue": "59653780",
            "chargeback_category": "стягнення коштів на користь держави"
        },
        {
            "id": "10",
            "full_name": "14307423 АТ \"ЗАВОД \"МАЯК\"",
            "executive_document_reciever": "комісія по трудових спорах Комісія по трудових спорах АТ \"Завод \"Маяк\"",
            "issuer_state_agency": "Оболонський районний відділ державної виконавчої служби у місті Києві Центрального міжрегіонального управління Міністерства юстиції (м. Київ)",
            "issuer_full_name": "Манасерян Айкуі Арамівна",
            "issuer_email": "vdvs.obolon@ukr.net",
            "issuer_phone_number": "426-62-70",
            "executive_document_number_of_issue": "59653780",
            "chargeback_category": "стягнення коштів на користь держави"
        },
        {
            "id": "9",
            "full_name": "14307423 АТ \"ЗАВОД \"МАЯК\"",
            "executive_document_reciever": "комісія по трудових спорах Комісія по трудових спорах АТ \"Завод \"Маяк\"",
            "issuer_state_agency": "Оболонський районний відділ державної виконавчої служби у місті Києві Центрального міжрегіонального управління Міністерства юстиції (м. Київ)",
            "issuer_full_name": "Манасерян Айкуі Арамівна",
            "issuer_email": "vdvs.obolon@ukr.net",
            "issuer_phone_number": "426-62-70",
            "executive_document_number_of_issue": "59653780",
            "chargeback_category": "стягнення коштів на користь держави"
        },
        {
            "id": "8",
            "full_name": "14307423 АТ \"ЗАВОД \"МАЯК\"",
            "executive_document_reciever": "комісія по трудових спорах Комісія по трудових спорах АТ \"Завод \"Маяк\"",
            "issuer_state_agency": "Оболонський районний відділ державної виконавчої служби у місті Києві Центрального міжрегіонального управління Міністерства юстиції (м. Київ)",
            "issuer_full_name": "Манасерян Айкуі Арамівна",
            "issuer_email": "vdvs.obolon@ukr.net",
            "issuer_phone_number": "426-62-70",
            "executive_document_number_of_issue": "59653780",
            "chargeback_category": "стягнення коштів на користь держави"
        },
        {
            "id": "7",
            "full_name": "14307423 АТ \"ЗАВОД \"МАЯК\"",
            "executive_document_reciever": "комісія по трудових спорах Комісія по трудових спорах АТ \"Завод \"Маяк\"",
            "issuer_state_agency": "Оболонський районний відділ державної виконавчої служби у місті Києві Центрального міжрегіонального управління Міністерства юстиції (м. Київ)",
            "issuer_full_name": "Манасерян Айкуі Арамівна",
            "issuer_email": "vdvs.obolon@ukr.net",
            "issuer_phone_number": "426-62-70",
            "executive_document_number_of_issue": "59653780",
            "chargeback_category": "стягнення коштів на користь держави"
        },
        {
            "id": "6",
            "full_name": "14307423 АТ \"ЗАВОД \"МАЯК\"",
            "executive_document_reciever": "комісія по трудових спорах Комісія по трудових спорах АТ \"Завод \"Маяк\"",
            "issuer_state_agency": "Оболонський районний відділ державної виконавчої служби у місті Києві Центрального міжрегіонального управління Міністерства юстиції (м. Київ)",
            "issuer_full_name": "Манасерян Айкуі Арамівна",
            "issuer_email": "vdvs.obolon@ukr.net",
            "issuer_phone_number": "426-62-70",
            "executive_document_number_of_issue": "59653780",
            "chargeback_category": "стягнення коштів на користь держави"
        },
        {
            "id": "5",
            "full_name": "14307423 АТ \"ЗАВОД \"МАЯК\"",
            "executive_document_reciever": "комісія по трудових спорах Комісія по трудових спорах АТ \"Завод \"Маяк\"",
            "issuer_state_agency": "Оболонський районний відділ державної виконавчої служби у місті Києві Центрального міжрегіонального управління Міністерства юстиції (м. Київ)",
            "issuer_full_name": "Манасерян Айкуі Арамівна",
            "issuer_email": "vdvs.obolon@ukr.net",
            "issuer_phone_number": "426-62-70",
            "executive_document_number_of_issue": "59653780",
            "chargeback_category": "стягнення коштів на користь держави"
        },
        {
            "id": "4",
            "full_name": "14307423 АТ \"ЗАВОД \"МАЯК\"",
            "executive_document_reciever": "комісія по трудових спорах Комісія по трудових спорах АТ \"Завод \"Маяк\"",
            "issuer_state_agency": "Оболонський районний відділ державної виконавчої служби у місті Києві Центрального міжрегіонального управління Міністерства юстиції (м. Київ)",
            "issuer_full_name": "Манасерян Айкуі Арамівна",
            "issuer_email": "vdvs.obolon@ukr.net",
            "issuer_phone_number": "426-62-70",
            "executive_document_number_of_issue": "59653780",
            "chargeback_category": "стягнення коштів на користь держави"
        },
        {
            "id": "3",
            "full_name": "14307423 АТ \"ЗАВОД \"МАЯК\"",
            "executive_document_reciever": "комісія по трудових спорах Комісія по трудових спорах АТ \"Завод \"Маяк\"",
            "issuer_state_agency": "Оболонський районний відділ державної виконавчої служби у місті Києві Центрального міжрегіонального управління Міністерства юстиції (м. Київ)",
            "issuer_full_name": "Манасерян Айкуі Арамівна",
            "issuer_email": "vdvs.obolon@ukr.net",
            "issuer_phone_number": "426-62-70",
            "executive_document_number_of_issue": "59653780",
            "chargeback_category": "стягнення коштів на користь держави"
        },
        {
            "id": "2",
            "full_name": "14307423 АТ \"ЗАВОД \"МАЯК\"",
            "executive_document_reciever": "комісія по трудових спорах Комісія по трудових спорах АТ \"Завод \"Маяк\"",
            "issuer_state_agency": "Оболонський районний відділ державної виконавчої служби у місті Києві Центрального міжрегіонального управління Міністерства юстиції (м. Київ)",
            "issuer_full_name": "Манасерян Айкуі Арамівна",
            "issuer_email": "vdvs.obolon@ukr.net",
            "issuer_phone_number": "426-62-70",
            "executive_document_number_of_issue": "59653780",
            "chargeback_category": "стягнення коштів на користь держави"
        }
    ];

    let parsed_data = JSON.parse(testData);

    let resTable = $('#legalResultsTable');

    resTable.removeClass('ng-hide');

    {
        let today = new Date();
        let dateTimeStr = today.toLocaleDateString() + " " + today.toLocaleTimeString();

        $('#legalSearchDateTime').text('Дата та час пошуку: ' + dateTimeStr);
    }


    parsed_data.forEach(function (entity) {
        let entityElement = `<tr class="print-no-page-break">
                                        <td>${entity.full_name}</td>
                                        <td>${entity.executive_document_reciever}</td>
                                        <td>${entity.issuer_state_agency}
                                            <br>
                                            <br> ${entity.issuer_full_name}
                                            <br>
                                            <span> тел: <a href="tel:${entity.issuer_phone_number}">${entity.issuer_phone_number}</a></span>
                                            <br>
                                            <span> email: <a href="mailto:${entity.issuer_email}">${entity.issuer_email}</a></span>
                                        </td>
                                        <td>${entity.executive_document_number_of_issue}</td>
                                        <td>${entity.chargeback_category}</td>
                                        <td >
                                            <button type="button" class="btn btn--color-negative delete-btn" data-id="${entity.id}" data-toggle="modal" data-target="#deleteModal">Видалити</button>
                                            <button type="button" class="btn btn--color-warning update-btn" data-id="${entity.id}">Редагувати</button>
                                        </td>
                                        <td data-title="Детально" >
                                            <span class="cell-content">
                                            <a href="detailed_record_info.html?id=${entity.id}">
                                                Детальна інформація
                                            </a>
                                            </span>
                                        </td>
                                     </tr>`;

        $("#legalResults").append(entityElement);
    });

    $('.delete-btn').bind('click', function () {
        $('#deleteModal').css('display', 'block');


        let entityId = $(this).attr('data-id');

        $('#confirmDeleteBtn').attr('data-delete_id', entityId);
    });

    $('.update-btn').bind('click', function () {
        let entityId = $(this).attr('data-id');

        window.location = `update_debt.html?id=${entityId}&type=legal`;
    });

    $('html, body').animate({
        scrollTop: resTable.offset().top
    }, 1000);
}

$('input:radio[name="debtorType"]').change(
    function () {
        if ($(this).val() === 'physical') {
            $('#physicalPage').removeClass('ng-hide');
            $('#legalPage').addClass('ng-hide');
        } else if ($(this).val() === 'legal') {
            $('#legalPage').removeClass('ng-hide');
            $('#physicalPage').addClass('ng-hide');
        }
    });

//physical
$("#inputSurname").keyup(function () {
    if ($(this).val().trim() !== '') {
        $('#surnameFieldset').removeClass('invalid');


        if ($('#nameFieldset').hasClass('invalid')) {
            $("#searchBtnPhysical").prop("disabled", true);

            if ($("#inputPersonCode").val() === '') {
                $('#codeFieldset').addClass('invalid');
            }
        } else {
            $("#searchBtnPhysical").prop("disabled", false);
            $('#codeFieldset').removeClass('invalid');
        }

    } else {
        $('#surnameFieldset').addClass('invalid');
        $("#searchBtnPhysical").prop("disabled", true);
    }
});

$("#inputName").keyup(function () {
    if ($(this).val().trim() !== '') {
        $('#nameFieldset').removeClass('invalid');


        if ($('#surnameFieldset').hasClass('invalid')) {
            $("#searchBtnPhysical").prop("disabled", true);

            if ($("#inputPersonCode").val() === '') {
                $('#codeFieldset').addClass('invalid');
            }
        } else {
            $("#searchBtnPhysical").prop("disabled", false);
            $('#codeFieldset').removeClass('invalid');
        }

    } else {
        $('#nameFieldset').addClass('invalid');
        $("#searchBtnPhysical").prop("disabled", true);

    }
});

$("#inputPersonCode").keyup(function () {

    if ($(this).val().trim() !== '') {
        $('#codeFieldset').removeClass('invalid');

        $('#nameFieldset').removeClass('invalid');
        $('#surnameFieldset').removeClass('invalid');

        $('#inputPersonCodeWarning').removeClass('ng-hide');

        $("#searchBtnPhysical").prop("disabled", false);

    } else {

        $('#inputPersonCodeWarning').addClass('ng-hide');

        $('#nameFieldset').addClass('invalid');
        $('#surnameFieldset').addClass('invalid');

        $("#searchBtnPhysical").prop("disabled", true);

        $('#codeFieldset').addClass('invalid');
    }
});

$('#cleanFormPhysical').click(function (e) {
    $('#physicalForm')[0].reset();

    $("#inputName").trigger('keyup');
    $("#inputSurname").trigger('keyup');
    $("#inputPersonCode").trigger('keyup');

    e.preventDefault();
});

$('#searchBtnPhysical').click(
    function (e) {
        e.preventDefault();

        let surname = $("#inputSurname").val();
        let name = $("#inputName").val();
        let identification_code = $("#inputPersonCode").val();

        if (identification_code !== '' || (name !== '' && surname !== '')) {
            let patro = $('#inputPatro').val();
            let birth_date = $('#inputBirthDate').val();
            let chargeback_category = $('#categorySelect_33 option:selected').text();

            let fullname = [name, surname, patro].join(' ');

            setPhysicalEntities(fullname, birth_date, identification_code, chargeback_category);

        } else {

        }
    }
);

//legal
$("#inputFirmName").keyup(function () {
    if ($(this).val().trim() !== '') {

        $('#searchBtnLegal').prop('disabled', false);

    } else {
        if ($("#inputFirmCode").val().trim() !== '') {
            $('#searchBtnLegal').prop('disabled', false);
        } else
            $('#searchBtnLegal').prop('disabled', true);
    }
});

$("#inputFirmCode").keyup(function () {
    if ($(this).val().trim() !== '') {

        $('#searchBtnLegal').prop('disabled', false);

    } else {
        if ($("#inputFirmName").val().trim() !== '') {
            $('#searchBtnLegal').prop('disabled', false);
        } else
            $('#searchBtnLegal').prop('disabled', true);
    }
});

$('#cleanFormLegal').click(function (e) {
    $('#legalForm')[0].reset();

    $("#inputFirmName").trigger('keyup');
    $("#inputFirmCode").trigger('keyup');

    e.preventDefault();
});

$('#searchBtnLegal').click(
    function (e) {
        e.preventDefault();

        let firmName = $("#inputFirmName").val().trim();
        let identification_code = $("#inputFirmCode").val().trim();

        if (identification_code !== '' || firmName !== '') {
            let chargeback_category = $('#categorySelect_164 option:selected').text();

            setLegalEntities(firmName, identification_code, chargeback_category);
        } else {
        }
    }
);

// modal
$('.closeModal').click(function () {
    $('#deleteModal').css('display', 'none');
});

$('#confirmDeleteBtn').click(function () {
    let id_to_delete = $(this).attr('data-delete_id');

    ($(`[data-id="${id_to_delete}"]`).closest('tr')).remove();

    $(this).attr('data-delete_id', '');
    $('#deleteModal').css('display', 'none');

    //TODO
    // запрос на видалення запису
});