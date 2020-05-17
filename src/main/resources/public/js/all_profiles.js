$(document).ready(async function () {

    let parsed_data = await $.ajax({
        url: `/api/user`,
        type: 'get',
        success: function(data, textStatus, xhr) {
            console.log(xhr.status);
            console.log(data);
        },
        error: function(){
        }
    });

    let all_profiles = parsed_data.map(el=>({
        id: el.id,
        fullname: el.fullName,
        state_agency: el.stateAgency,
        email: el.email,
        phone_number: el.phoneNumber,
        is_active: el.isActive
    }));

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
                <td class="${entity.is_active ? 'active' : 'non-active'}">${entity.is_active ? 'Активний' : 'Деактивований'}</td>
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