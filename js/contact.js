//dates
const d = new Date();
let year = d.getFullYear();

//drop down menu tags
let yearElement = document.getElementById("year");
let monthElement = document.getElementById("month");
let dayElement = document.getElementById("day");

//form field tags
let nameElement = document.getElementById("fname");
let emialElement = document.getElementById("femail");
let confirmEmialElement = document.getElementById("fconfirm-email");
let phoneNumberElement = document.getElementById("fphone-number");
let subjectElement = document.getElementById("fsubject");
let textCheckBox = document.getElementById("text-check-box");
let emailCheckBox = document.getElementById("email-check-box");
let myButton = document.querySelector('.submit');
let form = document.getElementById("form")


//get the next 10 years 
let option = []

for (let i = 0; i < 10; i++) {
    option[i] = document.createElement("option");
    option[i].text = year + i;
    option.value = year + 1;
    yearElement.add(option[i]);
};



//create the option tags for the days
setDays();

//when sumbit button is pressed validateForm
myButton.addEventListener('click', function () {
    validateForm();
});

//create the options for the number of days
function setDays() {
    var option = [];

    //removes all previous elements 
    while (dayElement.firstChild) {
        dayElement.removeChild(dayElement.firstChild);
    };

    //create the option tags
    for (var i = 0; i < numberOfDayInaMonth(monthElement.value, yearElement.value); i++) {
        option[i] = document.createElement("option");
        option[i].text = i + 1;
        dayElement.appendChild(option[i]);
    };

};

//return number of days in a month
function numberOfDayInaMonth(month, year) {
    switch (parseInt(month)) {
        case 1:
            return 31;
        case 2:
            if ((year % 4) == 0) { return 29; }
            else { return 28; }
        case 3:
            return 31;
        case 4:
            return 31;
        case 5:
            return 30
        case 6:
            return 31
        case 7:
            return 31;
        case 8:
            return 30;
        case 9:
            return 31;
        case 10:
            return 30;
        case 11:
            return 31;
        default:
            console.log("numberOfDayInAMonth: error month does not exist")
    }
};

//checks if date is day ahead of the current day
function checkDate() {

    if (yearElement.value == d.getFullYear()) {
        if (monthElement.value <= d.getMonth() + 1) {
            if (dayElement.value <= d.getDate()) {
                return false;
            }

        }
    }

    return true;



};

//checks emails are the same
function checkEmail(email) {
    var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);


};

//check for valid phone number
function checkPhoneNumber(number) {
    var phoneRegex = /^\d{10}$|^\d{11}$/;

    return phoneRegex.test(number);
};


//runs when button is clicked
function validateForm() {

    var error = "Unable to submit form because of;\n"
    var isError = false;
    var sendingMessageType = ""


    //check name

    if (nameElement.value == "") {
        error += "The name field has not been filled!\n";
        isError = true;
    }


    // check email are valid and match

    if (!checkEmail(emialElement.value)) {
        error += "The email is not valid!\n";
        isError = true;

    }
    if (!(emialElement.value == confirmEmialElement.value)) {
        error += "The emails do not match!\n";
        isError = true;
    }

    //check phone number
    if (!checkPhoneNumber(phoneNumberElement.value)) {
        error += "The phone number is not valid or the field has not been entered!\n";
        isError = true;
    }
    //checkdate
    if (!checkDate()) {
        error += "The date selected is not available!\n";
        isError = true;
    }

    if (subjectElement.value == "") {
        error += "There is no subject!\n"
        isError = true;
    }

    //check check boxes

    if (textCheckBox.checked) {
        sendingMessageType += "text";
    }
    else if (emailCheckBox.checked) {
        sendingMessageType += "email";
    }
    else {
        error += "Please tick your preferred method of communication!";
        isError = true;
    }

    if (isError) {
        alert(error);
    }
    else {
        alert("To 230414675@aston.ac.uk\n" + "From " + emialElement.value + "\n" + nameElement.value + "\n" + phoneNumberElement.value +"\n" + "Sent via " + sendingMessageType + "\n" + dayElement.value + "/" + monthElement.value + "/" + yearElement.value + "\n" + subjectElement.value + "\nPress OK to confirm");
        form.reset();
    }


};



