$(document).ready(function () {
    setMode();
    showLoginBtn();
});

function setMode() {
    let currentMode = "";

    if (MY_APP.user && MY_APP.user.role === "ADMIN")
        currentMode = `<div class="row" id="adminMode">
        <form action="javascript:void(0);">
            <fieldset class="hide-mobile">
                    <span class="radio toggle">
                        <span>
                            <label id="adminName">
                               Вітаємо, ${MY_APP.user.fullName}!
                            </label>
                        </span>

                        <span>
                            <button type="button" class="btn btn--color-positive" name="mainPages"
                                    id="createProfile" onClick="window.location = 'create-registers-profile';">Створити профіль реєстратора</button>
                        </span>

                        <span>
                            <button type="button" class="btn btn--color-info" name="mainPages"
                                    id="searchProfile"
                                    onClick="window.location = 'search-registers-profile';">Пошук реєстраторa</button>
                        </span>

                        <span>
                            <button type="button" class="btn btn--color-info" name="mainPages"
                                    id="viewProfiles"
                                    onClick="window.location = 'all-profiles';">Переглянути всіх реєстраторів</button>
                        </span>

                        <span>
                            <button type="button" class="btn btn--color-negative exit-btn" name="mainPages" onClick="window.location = 'logout'"
                                    >Вийти</button>
                        </span>
                    </span>
            </fieldset>
        </form>
    </div>`;
    else if (MY_APP.user && MY_APP.user.role === "REGISTER")
        currentMode = `<div class="row" id="registerMode">
        <form action="javascript:void(0);">
            <fieldset class="hide-mobile">
                    <span class="radio toggle">
                        <span>
                            <label id="registersName" >
                               Вітаємо, ${MY_APP.user.fullName}!
                            </label>
                        </span>
                        <span>
                            <button type="button" class="btn btn--color-positive" name="mainPages"
                                    id="createDebt" onClick="window.location = 'create-debt';">Створити запис про заборгованість</button>
                        </span>
                        <span>
                            <button type="button" class="btn btn--color-info" name="mainPages"
                                    id="viewMyProfile" onClick="window.location = 'profile?id=${MY_APP.user.id}';">Переглянути особистий профіль</button>
                        </span>

                        <span>
                            <button type="button" class="btn btn--color-negative exit-btn" name="mainPages" onClick="window.location = 'logout'"
                                    >Вийти</button>
                        </span>
                    </span>
            </fieldset>
        </form>
    </div>`;
    else {
        return;
    }

    $("#mode").append(currentMode);
}

function showLoginBtn(){
    if (MY_APP.user === "anonymousUser")
        $("#loginBtn").append("<button type=\"button\" onclick=\"location.href='login'\"\n" +
            "                    class=\"btn btn--size-l btn--color-none header-text\">\n" +
            "                Увійти\n" +
            "            </button>");
    else
        $("#loginBtn").empty();
}