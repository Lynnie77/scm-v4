document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const successMsg = document.getElementById("success-message");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      alert("Please fill in all fields.");
      return;
    }

    const subject = "Contact Form Submission";
    const body = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;
    const mailtoLink = `mailto:sacredconnectionsministry@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Open mail client (not hidden)
    window.location.href = mailtoLink;

    form.reset(); // clear the form

    // Show success message
    if (successMsg) {
      successMsg.style.display = "block";
      setTimeout(() => successMsg.style.display = "none", 5000);
    }
  });
});
