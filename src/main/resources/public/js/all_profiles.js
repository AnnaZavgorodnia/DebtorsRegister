$(document).ready(function () {

    //TODO
    // запрос на сервер по всім профілям

    let testData = "[\n" +
        "        {\n" +
        "            \"id\": \"1\",\n" +
        "            \"fullname\": \"Воловик Леонід Васильович\",\n" +
        "            \"state_agency\": \"суд загальної юрисдикції Ленінський районний суд м. Дніпропетровська\",\n" +
        "            \"email\": \"info_prim@dp.dvs.gov.ua\",\n" +
        "            \"phone_number\": \"0567677236\",\n" +
        "            \"password\": \"zxcvbnm,./\",\n" +
        "            \"is_active\": true\n" +
        "        },\n" +
        "        {\n" +
        "            \"id\": \"2\",\n" +
        "            \"fullname\": \"Дрижирук Ольга Олександрівна\",\n" +
        "            \"state_agency\": \"Відділ примусового виконання рішень Управління забезпечення примусового виконання рішень у Дніпропетровській області Південно-Східного міжрегіонального управління Міністерства юстиції (м. Дніпро)\",\n" +
        "            \"email\": \"info_prim@dp.dvs.gov.ua\",\n" +
        "            \"phone_number\": \"0629388699\",\n" +
        "            \"password\": \";lkjtnbfdcserv\",\n" +
        "            \"is_active\": false\n" +
        "        },\n" +
        "        {\n" +
        "            \"id\": \"3\",\n" +
        "            \"fullname\": \"Зайцева Ірина Юріївна\",\n" +
        "            \"state_agency\": \"комісія по трудових спорах КТС ДП \\\"Дніпровський електровозобудівний завод\\\"\",\n" +
        "            \"email\": \"info_prim@dp.dvs.gov.ua\",\n" +
        "            \"phone_number\": \" 0629388699\",\n" +
        "            \"password\": \"1234567890\",\n" +
        "            \"is_active\": true\n" +
        "        },\n" +
        "        {\n" +
        "            \"id\": \"4\",\n" +
        "            \"fullname\": \"Шкляревська Яна Володимирівна\",\n" +
        "            \"state_agency\": \"комісія по трудових спорах КТС КП \\\"Експрес\\\" ДМР\",\n" +
        "            \"email\": \" info.dvskr@krm.pl.minjust.gov.ua\",\n" +
        "            \"phone_number\": \"0567677236\",\n" +
        "            \"password\": \"ilovemymother5555\",\n" +
        "            \"is_active\": true\n" +
        "        }\n" +
        "    ]";
    let data = [
        {
            "id": "1",
            "fullname": "Воловик Леонід Васильович",
            "state_agency": "суд загальної юрисдикції Ленінський районний суд м. Дніпропетровська",
            "email": "info_prim@dp.dvs.gov.ua",
            "phone_number": "0567677236",
            "password": "zxcvbnm,./",
            "is_active": true
        },
        {
            "id": "2",
            "fullname": "Дрижирук Ольга Олександрівна",
            "state_agency": "Відділ примусового виконання рішень Управління забезпечення примусового виконання рішень у Дніпропетровській області Південно-Східного міжрегіонального управління Міністерства юстиції (м. Дніпро)",
            "email": "info_prim@dp.dvs.gov.ua",
            "phone_number": "0629388699",
            "password": ";lkjtnbfdcserv",
            "is_active": false
        },
        {
            "id": "3",
            "fullname": "Зайцева Ірина Юріївна",
            "state_agency": "комісія по трудових спорах КТС ДП \"Дніпровський електровозобудівний завод\"",
            "email": "info_prim@dp.dvs.gov.ua",
            "phone_number": " 0629388699",
            "password": "1234567890",
            "is_active": true
        },
        {
            "id": "4",
            "fullname": "Шкляревська Яна Володимирівна",
            "state_agency": "комісія по трудових спорах КТС КП \"Експрес\" ДМР",
            "email": " info.dvskr@krm.pl.minjust.gov.ua",
            "phone_number": "0567677236",
            "password": "ilovemymother5555",
            "is_active": true
        }
    ];

    let all_profiles = JSON.parse(testData);

    $('#numberOfProfiles').text(`Кількість профілів в реєстрі: ${all_profiles.length}`);

    let index = 1;

    all_profiles.forEach(function (entity) {
        let entityElement = `<tr class="print-no-page-break">
                <td data-title="№"><span class="cell-content">${index}</span></td>
                <td>${entity.fullname}</td>
                <td>${entity.state_agency}
                </td>
                <td>${entity.email}</td>
                <td>${entity.phone_number}</td>
                <td>${entity.password}</td>
                <td>${entity.is_active ? 'Активний' : 'Деактивований'}</td>
                <td>
                    <button type="button" class="btn btn--color-warning update-btn" data-id="${entity.id}">
                            Редагувати
                     </button>
                </td>
            </tr>`;

        $("#results").append(entityElement);

        index++;
    });

    $('.update-btn').bind('click', function () {
        let profileId = $(this).attr('data-id');

        window.location = `update-profile?id=${profileId}`;
    });
});