$(document).ready(async function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');

    if (queryString) {
        if (id) {

        let parsed_data = await $.ajax({
                url: `/api/user/${id}`,
                type: 'get',
                success: function(data, textStatus, xhr) {
                    console.log(xhr.status);
                    console.log(data);
                },
                error: function(){
                    window.location='error';
                }
            });

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
                    </div>`;

            $('#profileInfo').append(profileInfoHtml);

        } else {
            //invalid query
            window.location = 'search-debtor';
        }

    }
});

