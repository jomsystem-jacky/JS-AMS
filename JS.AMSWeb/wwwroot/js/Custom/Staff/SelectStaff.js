function InitStaffSelectOptions(selectId, companyId, staffId) {
    $.ajax({
        async: true,
        method: 'GET',
        data: {
            "companyId": companyId,
            "staffId": staffId
        },
        url: "/api/v1/StaffAPI/GetStaffByCompanyId",
        success: function (data, textStatus, jqXHR) {
            $(selectId).empty();
            // add new options
            $.each(data, function (index, item) {
                $(selectId).append('<option value="' + item.id + '">' + item.name + '</option>');
            });

            // refresh selectpicker
            $(selectId).selectpicker('refresh');

            if (typeof countryId != 'undefined')
                SetCountrySelectValue(selectId, staffId);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseText);
        }

    });
}

function InitStaffExceptSelfSelectOptions(selectId, companyId, staffId) {
    $.ajax({
        async: true,
        method: 'GET',
        data: {
            "companyId": companyId,
            "staffId": staffId
        },
        url: "/api/v1/StaffAPI/GetStaffExceptSelfByCompanyId",
        success: function (data, textStatus, jqXHR) {
            $(selectId).empty();
            // add new options
            $.each(data, function (index, item) {
                $(selectId).append('<option value="' + item.id + '">' + item.name + '</option>');
            });

            // refresh selectpicker
            $(selectId).selectpicker('refresh');

            if (typeof countryId != 'undefined')
                SetCountrySelectValue(selectId, staffId);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseText);
        }

    });
}

function SetStaffSelectValue(selectId, staffId) {
    $(selectId).val(staffId);
    $(selectId).selectpicker('refresh');
}
