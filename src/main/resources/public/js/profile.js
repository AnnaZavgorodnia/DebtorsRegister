$(document).ready(function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');

    if (queryString) {
        if (id) {
            //TODO request get profile by id

            let testData = {
                "fullName": "Анатолій Сергійович Санжаровський",
                "stateAgency": "Кропивницький районний участок чого то там",
                "email": "cool_email#@mail.ru",
                "phoneNumber": "+380939393093",
                "password": "qwerty123456"
            };

            let data = "{\n" +
                "   \"fullName\":\"Олександр Сергійович Млекович\",\n" +
                "   \"stateAgency\":\"Кропивницький районний ....\",\n" +
                "   \"email\":\"cool_email#@mail.ru\",\n" +
                "   \"phoneNumber\":\"+380939393093\",\n" +
                "   \"password\":\"qwerty123456\"\n" +
                "}";


            let parsed_data = JSON.parse(data);


            let profileInfoHtml = `<div>
                        <fieldset>
                            <label for="fullName">ПІБ реєстратора:</label>
                            <div id="fullName">${parsed_data.fullName ? parsed_data.fullName : 'Дані відсутні'}</div>
                        </fieldset>

                        <fieldset>
                            <label for="stateAgency">Назва державного органу, для якого створюється профіль
                                реєстратора:</label>
                            <div id="stateAgency">${parsed_data.stateAgency ? parsed_data.stateAgency : 'Дані відсутні'}</div>
                        </fieldset>


                        <fieldset>
                            <label for="email">Електронна адреса реєстратора:</label>
                            <div id="email">${parsed_data.email ? parsed_data.email : 'Дані відсутні'}</div>
                        </fieldset>

                        <fieldset>
                            <label for="phoneNumber">Номер телефону реєстратора:</label>
                            <div id="phoneNumber">${parsed_data.phoneNumber ? parsed_data.phoneNumber : 'Дані відсутні'}</div>
                        </fieldset>

                        <fieldset>
                            <label for="password">Пароль для профілю реєстратора:</label>
                            <div id="password">${parsed_data.password ? parsed_data.password : 'Дані відсутні'}</div>
                        </fieldset>
                    </div>`;

            $('#profileInfo').append(profileInfoHtml);

        } else {
            //invalid query
            window.location = 'search_debtor.html';
        }

    }
});

