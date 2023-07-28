function InitSelectCompanyOptions(selectId, companyId) {
    $.ajax({
        async: true,
        method: 'GET',
        url: "/api/v1/CompanyProfileAPI/GetAllCompanies",
        success: function (data, textStatus, jqXHR) {
            $(selectId).empty();
            // add new options
            $.each(data, function (index, company) {
                $(selectId).append('<option value="' + company.id + '">' + company.companyName + '</option>');
            });

            // refresh selectpicker
            $(selectId).selectpicker('refresh');

            if (typeof companyId != 'undefined')
                SetSelectCompanyValue(selectId, companyId);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            ShowFailMessageBox(jqXHR.responseText);
        }

    });
}

function SetSelectCompanyValue(selectId, companyId) {
    $(selectId).val(companyId);
    $(selectId).selectpicker('refresh');
}