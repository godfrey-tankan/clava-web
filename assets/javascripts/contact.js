function sendMail(event) {
  // Prevent default form submission behavior
  event.preventDefault();

  const successAlert = document.getElementById("alert-success");
  const errorAlert = document.getElementById("alert-error");
  const submitButton = document.getElementById("submit-btn");

  const form = document.getElementById("send-email");

  // Get the required form fields
  const nameInput = form.querySelector("#name");
  const emailInput = form.querySelector("#email");
  const messageInput = form.querySelector("#message");
  const subjectInput = form.querySelector("#subject");

  // Show the submit button

  if (
    nameInput.value === "" ||
    emailInput.value === "" ||
    messageInput.value === ""
  ) {
    errorAlert.innerHTML =
      "Please fill in all required fields!".toLocaleUpperCase();

    errorAlert.style.display = "block";
    errorAlert.style.color = "red";
    errorAlert.style.backgroundColor = "white";
    setTimeout(() => {
      errorAlert.style.display = "none";
    }, 2000);
    return;
  }
  if (submitButton.textContent.trimStart().trimEnd() === "Send") {
    submitButton.textContent = "sending...";
    setTimeout(function () {
      submitButton.textContent = "Sent!";
    }, 2000); // 1000 milliseconds = 1 second
  }
  emailjs.sendForm("service_7rfvwkn", "template_2u09n2j", form).then(
    (response) => {
      successAlert.style.display = "block";
      setTimeout(() => {
        successAlert.style.display = "none";
      }, 4000);
      form.reset();
    },
    (error) => {
      console.log("FAILED...", error);
    }
  );
}

function newsLetter(event) {
  event.preventDefault();
  const newLetterBtn = document.getElementById("news-letter");
  const newsLetterInput = document.getElementById("newsletter-input");

  newLetterBtn.addEventListener("click", (e) => {
    console.log("Button clicked");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (newsLetterInput.value.match(emailRegex)) {
      console.log("Email is valid");
      newsLetterInput.value = "Subscribed!";
      newsLetterInput.style.color = "green";
      setTimeout(() => {
        newsLetterInput.value = "";
        newsLetterInput.style.color = "black";
      }, 3000);
      return;
    } else {
      console.log("Email is invalid");
      // newsLetterInput.style.border = "4px solid red";
      // setTimeout(() => {
      //   newsLetterInput.style.border = "none";
      //   newsLetterInput.style.color = "black";
      // }, 1000);
    }
  });
}

function optionSelected(selectElement) {
  // Get the selected option value
  const selectedValue = selectElement.value;
  document.getElementById("subject").value = selectedValue;
}

function showPopup(serviceName, serviceAmount) {
  // Get the popup elements
  const popup = document.getElementById("popup");
  const popupServiceName = document.getElementById(
    "service-form-popup-service-name"
  );
  const popupServiceAmount = document.getElementById(
    "service-form-popup-service-amount"
  );
  popupServiceName.textContent = serviceName;
  popupServiceAmount.textContent = serviceAmount;

  const formResponse = document.getElementById("service-form-popup-response");
  popup.style.display = "block";

  // Add event listener to the form
  const form = document.getElementById("service-form-popup-form");
  form.addEventListener("submit", (event) =>
    handleFormSubmit(event, serviceName, serviceAmount, formResponse)
  );
}

function handleFormSubmit(event, serviceName, serviceAmount, formResponse) {
  event.preventDefault(); // Prevent the default form submission
  const form = document.getElementById("service-form-popup-form");

  var isSuccess;
  // Add form validation and submission
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("service-form-popup-email").value;
    const phone = document.getElementById("service-form-popup-phone").value;
    const serviceDateTime = document.getElementById(
      "service-form-popup-date"
    ).value;

    isSuccess = false;
    // Validate email, phone, and service date

    // Form is valid, send the email
    if (!validateEmail(email)) {
      formResponse.textContent = "Please enter a valid email address.";
      formResponse.style.color = "red";
      return;
    }

    if (!validatePhone(phone)) {
      formResponse.textContent =
        "Please enter a valid phone number (10-14 digits).";
      formResponse.style.color = "red";
      return;
    }
    form.querySelector("#service_name").value = serviceName;
    form.querySelector("#service_amount").value = serviceAmount;
    emailjs.sendForm("service_7rfvwkn", "template_92w3oc8", form).then(
      (response) => {
        formResponse.textContent =
          "Order submitted successfully, we will get back to you soon!";
        formResponse.style.color = "green";
        formResponse.style.display = "block";
        setTimeout(() => {
          formResponse.style.display = "none";
          document.getElementById("popup").style.display = "none";
          form.reset();
        }, 4000);
      },
      (error) => {
        formResponse.textContent = "Order submission failed. Please try again.";
        formResponse.style.color = "red";
        formResponse.style.display = "block";
        console.log("FAILED...", error);
      }
    );
  });
}

function hidePopup() {
  const popupElement = document.getElementById("popup");
  popupElement.style.display = "none";
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhone(phone) {
  const phoneRegex = /^\d{10,14}$/;
  return phoneRegex.test(phone);
}
