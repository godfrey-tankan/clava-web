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
