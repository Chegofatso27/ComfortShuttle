const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

// Initialize Firebase Admin
admin.initializeApp();

// Email transport using your Gmail + App Password
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "comforttransport07@gmail.com", // 👉 your Gmail
    pass: "hygglgvmmqyahnnd",   // 👉 App Password (from https://myaccount.google.com/apppasswords)
  },
});

// Function triggers when a new booking is added
exports.sendBookingToBusiness = functions.database
  .ref("/bookings/{bookingId}")
  .onCreate((snapshot, context) => {
    const booking = snapshot.val();

    // Compose the email content
    const mailOptions = {
      from: '"Comfort Shuttle Booking Alert" <comforttransport07@gmail.com>',
      to: "comforttransport07@gmail.com", // ✅ send to yourself
      subject: "🚐 New Booking Received",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 10px;">
          <h2>📋 New Booking Submitted</h2>
          <p><strong>Name:</strong> ${booking.name}</p>
          <p><strong>Email:</strong> ${booking.email}</p>
          <p><strong>Pickup Location:</strong> ${booking.pickup}</p>
          <p><strong>Destination:</strong> ${booking.destination}</p>
          <p><strong>Submitted At:</strong> ${booking.timestamp}</p>
        </div>
      `,
    };

    // Send email
    return transporter.sendMail(mailOptions)
      .then(() => {
        console.log("📧 Booking email sent to comforttransport07@gmail.com");
      })
      .catch((error) => {
        console.error("❌ Error sending email:", error);
      });
  });
const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach((question) => {
  question.addEventListener("click", () => {
    const answer = question.nextElementSibling;

    // Toggle dropdown
    answer.style.display = answer.style.display === "block" ? "none" : "block";
  });
});


