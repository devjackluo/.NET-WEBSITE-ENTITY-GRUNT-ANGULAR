$(document).ready(function () {

    // Parallax scrolling
    $('.parallax-window').parallax();

    /*This doesnt work apparently...

  // WOW animations*/
	new WOW().init();
	

    $("#sameBilling").on('click', function () {


        if ($("input#sameBilling").is(':checked')) {

            $("input#Billing_FirstName").val($("input#Shipping_FirstName").val());
            $("input#Billing_LastName").val($("input#Shipping_LastName").val());
            $("input#Billing_Address").val($("input#Shipping_Address").val());
            $("input#Billing_Apt").val($("input#Shipping_Apt").val());
            $("input#Billing_City").val($("input#Shipping_City").val());

            $("select#Billing_State").val($("select#Shipping_State").val());

            $("input#Billing_Postal").val($("input#Shipping_Postal").val());
            $("input#Billing_Phone").val($("input#Shipping_Phone").val());
            $("input#Billing_Email").val($("input#Shipping_Email").val());

        } else {

            $("input#Billing_FirstName").val('');
            $("input#Billing_LastName").val('');
            $("input#Billing_Address").val('');
            $("input#Billing_Apt").val('');
            $("input#Billing_City").val('');

            $("select#Billing_State").val('0');

            $("input#Billing_Postal").val('');
            $("input#Billing_Phone").val('');
            $("input#Billing_Email").val('');
        }

    });


});