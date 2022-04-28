var ContactUs = {} || ContactUs;

ContactUs = {

    ApplicationForm: $('#ContactUsWidgetMainContianer form'),
    ContactUs: $('#ContactUsBtnSubmit'),
    errorClass: 'has-error',
    formGroupClass: '.fieldset',
    isValid: true,
    ContactUsDropdownElement: $('#ContactUsWidgetMainContianer form #field-subject-enquiry'),
    allFieldsInputSelectElement: $('#ContactUsWidgetMainContianer form input, select,textarea'),
    validateForm: function () {

        ContactUs.isValid = true;
        ContactUs.isValid = ContactUs.ApplicationForm.valid() && ContactUs.isValid;

        if (!ContactUs.isValid) {

            ContactUs.allFieldsInputSelectElement.each(function () {
                if ($(this).parent().find('span.field-validation-error').length > 0) {
                    $(this).parents(ContactUs.formGroupClass).addClass(ContactUs.errorClass);

                }
            });
        }
        else {

            ContactUs.allFieldsInputSelectElement.each(function () {
                if ($(this).parent().find('span.field-validation-valid').length > 0) {
                    $(this).parents(ContactUs.formGroupClass).removeClass(ContactUs.errorClass);
                }
            });
        }
        ContactUs.isValid = ContactUs.ApplicationForm.valid() && ContactUs.isValid;

        return ContactUs.isValid;
    },
    validateDropdownList: function () {
        if (ContactUs.ContactUsDropdownElement.val() === null) {
            ContactUs.ContactUsDropdownElement.parents(ContactUs.formGroupClass).addClass(ContactUs.errorClass);
            return false;
        }
        else {
            this.ContactUsDropdownElement.parents(ContactUs.formGroupClass).removeClass(ContactUs.errorClass);
            return true;
        }
    },
    onDropdownChangeEvent: function () {
        $(document).on('change', ContactUs.ContactUsDropdownElement, function () {
            if (ContactUs.validateDropdownList()) {
                $(this).parents(ContactUs.formGroupClass).removeClass(ContactUs.errorClass);
            }
        });
    },
    countCharacters: function (e) {
        var textEntered, countRemaining, counter;
        textEntered = document.getElementById('message').value;
        counter = (200 - (textEntered.length));
        countRemaining = document.getElementById('charactersRemaining');
        countRemaining.textContent = counter;

    },

    init: function () {
        ContactUs.onDropdownChangeEvent();
    }
};

$(document).ready(function () {
    if ($('#ContactUsWidgetMainContianer').length > 0) {
        ContactUs.init();
        var el = document.getElementById('message');
        el.addEventListener('keyup', ContactUs.countCharacters, false);
    }
});