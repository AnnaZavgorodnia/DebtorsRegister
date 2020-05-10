$("#submitBtn").click(function () {
    e.preventDefault();

    let username = $("#username").val().trim();
    let password = $("#password").val().trim();

    let mode = 'user';

    if (username !== "" && password !== "") {
        $("#login-form").submit();
    }
});

