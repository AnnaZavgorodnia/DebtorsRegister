const reg_exp_more_than_one_space = /\s{2,}/;

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
        error: function (xhr, ajaxOptions, thrownError) {
            if(xhr.status === 400){
                console.log(xhr);
                if(xhr.responseJSON.message === "Користувач з такою електронною адресою вже існує")
                    $("#message").html("Користувач з такою поштою вже існує");
                else
                    $("#message").html("Перевірте правильність введених даних");
            }
        }
    });

});

$('input[type=text]').keyup(function () {
    let val = $(this).val();

    if ( val === ' ' || reg_exp_more_than_one_space.test(val))
        $(this).closest('fieldset').addClass('invalid').trigger('changeClass');
    else
        $(this).closest('fieldset').removeClass('invalid').trigger('changeClass');

});

$("fieldset").on('changeClass', function () {
    $("#submitCreate").prop('disabled', $('fieldset').hasClass('invalid'))
});