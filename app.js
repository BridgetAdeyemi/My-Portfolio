// show sidebar
document.addEventListener("DOMContentLoaded", function () {
  const bars = document.querySelector(".fa-bars");

  bars.addEventListener("click", addBars);

  function addBars() {
    const sidebar = document.querySelector(".sidebar");
    sidebar.style.display = "flex";
  }

  // hide side bar
  const hideBars = document.querySelector(".fa-xmark");
  hideBars.addEventListener("click", hideSideBars);

  function hideSideBars() {
    const hidebars = document.querySelector(".sidebar");
    hidebars.style.display = "none";
  }

  // projects display modal
  const projectImages = document.querySelectorAll(".project-img");

  projectImages.forEach((img) => {
    img.addEventListener("click", function () {
      const modalId = this.getAttribute("data-modal");
      const modal = document.getElementById(modalId);
      modal.style.display = "block";
    });
  });

  const closeButtons = document.querySelectorAll(".close-btn");

  closeButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const modal = this.closest(".modal");
      modal.style.display = "none";
    });
  });

  window.onclick = function (event) {
    if (event.target.classList.contains("modal")) {
      event.target.style.display = "none";
    }
  };

  //Aos animination
  AOS.init({
    duration: 1000, // Animation duration in milliseconds
    easing: "ease-in-out", // Easing function
    once: true, // Animation happens only once as you scroll
  });

  // contact form validation
  (function () {
    emailjs.init({
      publicKey: "K-xoeFdOa5Cr7guU7",
    });
  })();

  const msg = document.querySelector(".form-message");

  window.onload = function () {
    document
      .getElementById("contact-form")
      .addEventListener("submit", function (event) {
        event.preventDefault();

        // Get form field values
        const name = document.getElementById("name").value.trim();
        const mail = document.getElementById("mail").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        // Simple validation
        if (!name || !mail || !subject || !message) {
          msg.classList.add("show");
          msg.innerHTML =
            "<span class='error-msg'>All fields are required.</span>";
          setTimeout(() => msg.classList.remove("show"), 2000);
          return; // Stop the form from submitting
        }

        document.querySelector(".loader").classList.add("show");

        // Send form using EmailJs
        emailjs.sendForm("service_zr0cmjc", "template_b93cbet", this).then(
          function () {
            document.getElementById("contact-form").reset();
            document.querySelector(".loader").classList.remove("show");
            msg.innerHTML = "";
            msg.innerHTML += "<span class='success-msg'>Email Sent</span>";
            msg.classList.add("show");
            setTimeout(() => msg.classList.remove("show"), 2000);
          },

          //Error display message
          function (error) {
            document.querySelector(".loader").classList.toggle("show");
            msg.classList.add("show");
            msg.innerHTML += "<span class='error-msg'>Email Not Sent</span>";
          }
        );
      });
  };
});
