function SignIn() {

	document.getElementById("kt_login_signin_submit").addEventListener("click", function (event) {
		var link = this;
		link.setAttribute("disabled", "true");
	});


	var username = $("#signin-username").val();
	var password = $("#signin-password").val();

	var status = 'Invalid';

	if (username != null && username != '') {
		status = 'Valid';
	}

	if (password != null && password != '') {
		status = 'Valid';
	}

	if (status == 'Valid') {

		var formData = {
			username: username,
			password: password
		};

		$.ajax({
			method: "POST",
			url: "/api/v1/Identity/Login",
			contentType: "application/json; charset=utf-8",
			data: JSON.stringify(formData),
			beforeSend: function () {
				ShowLoading("Logging in...");
			},
			success: function (data, textStatus, jqXHR) {

				window.location.href = "/";
			},
			error: function (jqXHR, textStatus, errorThrown) {

				document.getElementById("kt_login_signin_submit").addEventListener("click", function (event) {
					var link = this;
					link.setAttribute("disabled", "false");
				});

				//Swal.fire({
				//	title: 'Opps...Something went wrong!',
				//	text: jqXHR.responseText,
				//	icon: 'error',
				//	confirmButtonText: 'Ok',
				//	timer: null,
				//});

				alert(jqXHR.responseText);
			},
			complete: function () {

				HideLoading();
			}
		});
	} else {

		document.getElementById("kt_login_signin_submit").addEventListener("click", function (event) {
			var link = this;
			link.setAttribute("disabled", "false");
		});

		swal.fire({
			text: "Sorry, looks like there are some errors detected, please try again.",
			icon: "error",
			buttonsStyling: false,
			confirmButtonText: "Ok, got it!",
			confirmButtonClass: "btn font-weight-bold btn-light"
		}).then(function () {
			KTUtil.scrollTop();
		});
	}
};