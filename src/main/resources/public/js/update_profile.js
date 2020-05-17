const reg_exp_more_than_one_space = /\s{2,}/;
let id;
let profile;

$(document).ready(async function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ID = urlParams.get('id');

    if (queryString && ID) {

        console.log(`id: ${ID}`);

        id = ID;

        if (queryString && ID) {

            console.log(`id: ${ID}`);

            let parsed_data = await $.ajax({
                url: `/api/user/${ID}`,
                type: 'get',
                success: function (data, textStatus, xhr) {
                    console.log(xhr.status);
                    console.log(data);
                },
                error: function () {
                    window.location='error';
                }
            });

            profile = {
                id: parsed_data.id,
                fullname: parsed_data.fullName,
                stateAgency: parsed_data.stateAgency,
                email: parsed_data.email,
                phoneNumber: parsed_data.phoneNumber,
                is_active: parsed_data.isActive
            };

            console.log("profile:");
            console.log(profile);

            $('#fullName').val(profile.fullname);
            $('#stateAgency').val(profile.stateAgency);
            $('#email').val(profile.email);
            $('#phoneNumber').val(profile.phoneNumber);

            if (profile.is_active)
                $("#deactivateProfile").removeClass('ng-hide');
            else
                $("#activateProfile").removeClass('ng-hide');

        } else {
            window.location = 'search-registers-profile';
        }

        $('#cancelUpdate').click(function (e) {
            e.preventDefault();

            window.location = `search-registers-profile?id=${ID}`;
        });

        $("#updateForm").submit(async function (e) {
            e.preventDefault();

            let full_name = $('#fullName').val();
            let state_agency = $('#stateAgency').val();
            let email = $('#email').val();
            let phone_number = $('#phoneNumber').val();
            let password = $('#password').val();

            let data = {
                fullName: full_name,
                stateAgency: state_agency,
                email: email,
                phoneNumber: phone_number,
                password: password
            };

            await $.ajax({
                url: `/api/user/${ID}`,
                type: 'put',
                contentType: "application/json",
                data: JSON.stringify(data),
                success: function (data, textStatus, xhr) {
                    console.log(xhr.status);
                    console.log(data);
                    window.location = `profile?id=${ID}`;
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    $("#message").html(xhr.responseJSON.message);
                }
            });
        });
    }

    $("#deactivateProfile").click(async function (e) {
        e.preventDefault();

        if (profile.is_active === true) {

            await $.ajax({
                url: `/api/user/${ID}`,
                type: 'delete',
                success: function(data, textStatus, xhr) {
                    console.log(xhr.status);
                    console.log(data);
                    $("#activateProfile").removeClass('ng-hide');
                    $("#deactivateProfile").addClass('ng-hide');
                },
                error: function(){
                    response.message = 'Не вдалося деактивувати профіль';
                    $("#message").html(response.message);
                }
            });

            profile.is_active = false;
        }
    });

    $("#activateProfile").click(async function (e) {
        e.preventDefault();

        if (profile.is_active === false) {

            await $.ajax({
                url: `/api/user/${ID}`,
                type: 'patch',
                success: function(data, textStatus, xhr) {
                    console.log (xhr.status);
                    console.log(data);
                    $("#activateProfile").addClass('ng-hide');
                    $("#deactivateProfile").removeClass('ng-hide');
                },
                error: function(){
                    $("#message").html('Не вдалося активувати профіль');
                }
            });

            profile.is_active = true;

        }
    });
});

$('input[type=text]').keyup(function () {
    if($(this).prop('required')) {
        let val = $(this).val();

        if (val === ' ' || reg_exp_more_than_one_space.test(val))
            $(this).closest('fieldset').addClass('invalid').trigger('changeClass');
        else
            $(this).closest('fieldset').removeClass('invalid').trigger('changeClass');
    }
});

$("fieldset").on('changeClass', function () {
    $("#submitCreate").prop('disabled', $('fieldset').hasClass('invalid'))
});