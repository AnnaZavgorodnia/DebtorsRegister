$('#cleanForm').click(function (e) {
    $('#createForm')[0].reset();
    e.preventDefault();
});

$('#cancelCreate').click(function () {
    window.location = 'search_debtor.html';
});

$('#createForm').submit(function (e) {

    e.preventDefault();
    let fullname = $('#fullName').val();
    let email = $('#email').val();
    let stateAgency = $('#stateAgency').val();
    let phoneNumber = $('#phoneNumber').val();
    let password = $('#password').val();

    let data = {
        fullname,
        email,
        stateAgency,
        phoneNumber,
        password
    };
    //TODO
    // запрос на створення профілю

    let id = 111; // from response
    let message = 'Такий профіль вже існує';// from response

    if (true || !message) {
        window.location = `profile.html?id=${id}`;
    } else {
        $("#message").html("Виникла помилка. " + message);
    }

});