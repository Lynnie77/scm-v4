document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) return;

    const subject = "Contact Form Submission";
    const body = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;
    const mailtoLink = `mailto:sacredconnectionsministry@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Create a temporary hidden anchor
    const tempLink = document.createElement('a');
    tempLink.href = mailtoLink;
    tempLink.style.display = 'none';
    document.body.appendChild(tempLink);

    // Click the link
    tempLink.click();

    // Remove the link
    document.body.removeChild(tempLink);
  });
});
