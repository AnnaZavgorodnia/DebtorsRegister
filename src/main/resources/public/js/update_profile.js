const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const ID = urlParams.get('id');

let profile = {};

if (queryString && ID) {
    //TODO
    // запрос на отримання профілю по айді

    let testData = {
        "fullname": "Анатолій Сергійович Санжаровський",
        "stateAgency": "Кропивницький районний участок чого то там",
        "email": "cool_email#@mail.ru",
        "phoneNumber": "+380939393093",
        "password": "qwerty123456",
        "is_active": true
    };

    let data = "{\n" +
        "        \"fullname\": \"Анатолій Сергійович Санжаровський\",\n" +
        "        \"stateAgency\": \"Кропивницький районний участок чого то там\",\n" +
        "        \"email\": \"cool_email#@mail.ru\",\n" +
        "        \"phoneNumber\": \"+380939393093\",\n" +
        "        \"password\": \"qwerty123456\",\n" +
        "        \"is_active\": true\n" +
        "    }";

    profile = JSON.parse(data);


    $('#fullName').val(profile.fullname);
    $('#stateAgency').val(profile.stateAgency);
    $('#email').val(profile.email);
    $('#phoneNumber').val(profile.phoneNumber);
    $('#password').val(profile.password);

    if (profile.is_active)
        $("#deactivateProfile").removeClass('ng-hide');
    else
        $("#activateProfile").removeClass('ng-hide');

} else
    window.location = 'search-registers-profile';

$('#cancelUpdate').click(function (e) {
    e.preventDefault();

    window.location = `search-registers-profile?id=${ID}`;
});

$("#submitUpdate").click(function (e) {
    e.preventDefault();

    let full_name = $('#fullName').val();
    let state_agency = $('#stateAgency').val();
    let email = $('#email').val();
    let phone_number = $('#phoneNumber').val();
    let password = $('#password').val();

    let data = {
        id: ID,
        full_name,
        state_agency,
        email,
        phone_number,
        password
    };

    //TODO
    // запрос на апдейт профіля

    let response = {};

    if (response.message) {
        $("#message").html(response.message);
    } else {
        window.location = `profile?id=${ID}`;
    }
});

$("#activateProfile").click(function (e) {
    e.preventDefault();

    if (profile.is_active === false) {
        //TODO
        // запрос на активацію профіля по айді
        let response = {};

        profile.is_active = true;
        if (response.message) {
            $("#message").html(response.message);
        } else {
            $("#activateProfile").addClass('ng-hide');
            $("#deactivateProfile").removeClass('ng-hide');
        }
    }
});

$("#deactivateProfile").click(function (e) {
    e.preventDefault();

    if (profile.is_active === true) {
        //TODO
        // запрос на деактивацію профіля по айді

        profile.is_active = false;
        let response = {};

        if (response.message)
            $("#message").html(response.message);
        else {
            $("#activateProfile").removeClass('ng-hide');
            $("#deactivateProfile").addClass('ng-hide');
        }
    }
});