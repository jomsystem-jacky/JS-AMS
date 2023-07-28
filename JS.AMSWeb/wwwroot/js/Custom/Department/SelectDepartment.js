function InitDepartmentSelectOptions(selectId, companyId, departmentId) {
    $.ajax({
        async: true,
        method: 'GET',
        data: { "companyId": companyId },
        url: "/api/v1/DepartmentAPI/GetDepartmentByCompanyId",
        success: function (data, textStatus, jqXHR) {
            $(selectId).empty();
            // add new options
            $.each(data, function (index, item) {
                $(selectId).append('<option value="' + item.id + '">' + item.name + '</option>');
            });

            // refresh selectpicker
            $(selectId).selectpicker('refresh');

            if (typeof departmentId != 'undefined')
                SetCountrySelectValue(selectId, departmentId);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseText);
        }

    });
}

function SetDepartmentSelectValue(selectId, departmentId) {
    $(selectId).val(departmentId);
    $(selectId).selectpicker('refresh');
}
