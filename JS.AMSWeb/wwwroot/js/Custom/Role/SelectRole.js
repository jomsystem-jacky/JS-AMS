function InitSelectRoleOptions(selectId, roleId) {
    $.ajax({
        async: true,
        method: 'GET',
        url: "/api/v1/RoleAPI/GetAllRoles",
        success: function (data, textStatus, jqXHR) {
            $(selectId).empty();
            // add new options
            $.each(data, function (index, role) {
                $(selectId).append('<option value="' + role.id + '">' + role.name + '</option>');
            });

            // refresh selectpicker
            $(selectId).selectpicker('refresh');

            if (typeof roleId != 'undefined')
                SetSelectRoleValue(selectId, roleId);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            ShowFailMessageBox(jqXHR.responseText);
        }

    });
}

function SetSelectRoleValue(selectId, roleId) {
    $(selectId).val(roleId);
    $(selectId).selectpicker('refresh');
}
