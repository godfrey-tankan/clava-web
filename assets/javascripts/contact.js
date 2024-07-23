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
  if (submitButton.textContent === "Send") {
    console.log("sending...,true..");
    submitButton.textContent = "sending...";
    setTimeout(function () {
      submitButton.textContent = "Sent!";
    }, 2000); // 1000 milliseconds = 1 second
  }
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
  emailjs.sendForm("service_7rfvwkn", "template_2u09n2j", form).then(
    (response) => {
      successAlert.style.display = "block";
      setTimeout(() => {
        successAlert.style.display = "none";
      }, 2000);
      form.reset();
    },
    (error) => {
      console.log("FAILED...", error);
    }
  );
}

function optionSelected(selectElement) {
  // Get the selected option value
  const selectedValue = selectElement.value;
  document.getElementById("subject").value = selectedValue;
}
