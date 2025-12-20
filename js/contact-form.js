// ============================================
// CONTACT FORM HANDLER
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contact-form');

  if (!form) return;

  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    // Get form data
    const formData = {
      name: document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      eventDate: document.getElementById('event-date').value,
      eventType: document.getElementById('event-type').value,
      guestCount: document.getElementById('guest-count').value,
      message: document.getElementById('message').value.trim(),
      newsletter: document.getElementById('newsletter').checked
    };

    // Validate form
    if (!validateForm(formData)) {
      return;
    }

    // Get the recipient email from config
    const recipientEmail = window.siteConfig?.business?.email || 'info@wrightmemorialevents.com';

    // Create email body
    const emailSubject = `New Contact Form Submission - ${formData.eventType}`;
    const emailBody = createEmailBody(formData);

    // Create mailto link
    const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    // Show success message
    showMessage('Opening email client...', 'info');

    // Small delay to show the message
    setTimeout(() => {
      // Open mailto link
      window.location.href = mailtoLink;

      // Reset form
      form.reset();

      // Show success message
      showMessage('Thank you! Your email client should open. Please send the email to complete your inquiry.', 'success');
    }, 500);
  });

  function validateForm(data) {
    let isValid = true;
    const errors = document.querySelectorAll('.form-error');

    // Hide all errors first
    errors.forEach(error => error.style.display = 'none');

    // Validate name
    if (!data.name) {
      showFieldError('name');
      isValid = false;
    }

    // Validate email
    if (!data.email || !isValidEmail(data.email)) {
      showFieldError('email');
      isValid = false;
    }

    // Validate phone
    if (!data.phone) {
      showFieldError('phone');
      isValid = false;
    }

    // Validate event date
    if (!data.eventDate) {
      showFieldError('event-date');
      isValid = false;
    }

    // Validate event type
    if (!data.eventType) {
      showFieldError('event-type');
      isValid = false;
    }

    // Validate guest count
    if (!data.guestCount || data.guestCount < 1) {
      showFieldError('guest-count');
      isValid = false;
    }

    // Validate message
    if (!data.message) {
      showFieldError('message');
      isValid = false;
    }

    if (!isValid) {
      showMessage('Please fill in all required fields correctly.', 'error');
    }

    return isValid;
  }

  function showFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    const error = field.parentElement.querySelector('.form-error');
    if (error) {
      error.style.display = 'block';
      field.classList.add('error');
    }
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function createEmailBody(data) {
    const eventTypeLabels = {
      'wedding': 'Wedding',
      'corporate': 'Corporate Event',
      'birthday': 'Birthday Party',
      'anniversary': 'Anniversary',
      'shower': 'Bridal/Baby Shower',
      'prom': 'Prom/School Event',
      'fundraiser': 'Fundraiser/Gala',
      'dinner': 'Private Dinner',
      'photoshoot': 'Photoshoot',
      'other': 'Other'
    };

    const eventDate = new Date(data.eventDate);
    const formattedDate = eventDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return `
NEW EVENT INQUIRY - Wright Memorial Event Center
=================================================

CONTACT INFORMATION:
-------------------
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}

EVENT DETAILS:
-------------
Event Type: ${eventTypeLabels[data.eventType] || data.eventType}
Event Date: ${formattedDate}
Estimated Guest Count: ${data.guestCount}

MESSAGE:
--------
${data.message}

ADDITIONAL INFO:
---------------
Newsletter Subscription: ${data.newsletter ? 'Yes' : 'No'}

Submitted on: ${new Date().toLocaleString('en-US')}

=================================================
This inquiry was submitted through the Wright Memorial Event Center website contact form.
    `.trim();
  }

  function showMessage(text, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    // Create message element
    const message = document.createElement('div');
    message.className = `form-message form-message-${type}`;
    message.textContent = text;

    // Insert message before submit button
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.parentElement.insertBefore(message, submitButton);

    // Auto-remove success/info messages after 5 seconds
    if (type === 'success' || type === 'info') {
      setTimeout(() => {
        message.remove();
      }, 5000);
    }
  }

  // Clear error styling on input
  const inputs = form.querySelectorAll('.form-input, .form-select, .form-textarea');
  inputs.forEach(input => {
    input.addEventListener('input', function() {
      this.classList.remove('error');
      const error = this.parentElement.querySelector('.form-error');
      if (error) {
        error.style.display = 'none';
      }
    });
  });
});
