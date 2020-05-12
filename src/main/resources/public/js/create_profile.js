$('#cleanForm').click(function (e) {
    $('#createForm')[0].reset();
    e.preventDefault();
});

$('#cancelCreate').click(function () {
    window.location = 'search-debtor';
});

$('#createForm').submit(async function (e) {

    e.preventDefault();
    let fullName = $('#fullName').val();
    let email = $('#email').val();
    let stateAgency = $('#stateAgency').val();
    let phoneNumber = $('#phoneNumber').val();
    let password = $('#password').val();

    let data = {
        fullName,
        email,
        stateAgency,
        phoneNumber,
        password
    };

    console.log(data);

    await $.ajax({
        url: '/api/user',
        type: 'post',
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function(data, textStatus, xhr) {
            console.log(xhr.status);
            console.log(data);
            window.location = `profile?id=${data}`;
        },
        error: function(){
            $("#message").html("Виникла помилка. " + message);
        }
    });

});