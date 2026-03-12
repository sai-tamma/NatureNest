// ============================================
// CONTACT FORM HANDLER WITH EMAILJS
// ============================================
//
// SETUP INSTRUCTIONS:
// 1. Sign up at https://www.emailjs.com (free - 200 emails/month)
// 2. Add an Email Service (Gmail, Outlook, etc.)
// 3. Create an Email Template with these variables:
//    {{from_name}}, {{from_email}}, {{phone}}, {{event_date}},
//    {{event_type}}, {{guest_count}}, {{dates_flexible}}, {{budget_range}},
//    {{extra_services}}, {{interested_tour}}, {{message}},
//    {{transactional_consent}}, {{marketing_consent}}
// 4. Update the configuration below with your IDs
// ============================================

// EmailJS Configuration - UPDATE THESE VALUES
const EMAILJS_CONFIG = {
  publicKey: '0AMzvu5XQ97vUYOBQ',    // Get from EmailJS Dashboard > Account > API Keys
  serviceId: 'service_e8obffh',      // Get from EmailJS Dashboard > Email Services
  templateId: 'template_0obfxm2'     // Get from EmailJS Dashboard > Email Templates
};

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contact-form');

  if (!form) return;

  // Initialize EmailJS
  if (typeof emailjs !== 'undefined' && EMAILJS_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY') {
    emailjs.init(EMAILJS_CONFIG.publicKey);
  }

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
      datesFlexible: document.getElementById('dates-flexible')?.value || '',
      budgetRange: document.getElementById('budget-range')?.value || '',
      extraServices: document.getElementById('extra-services')?.value.trim() || '',
      interestedTour: document.getElementById('interested-tour')?.value || '',
      message: document.getElementById('message').value.trim(),
      transactionalConsent: document.getElementById('transactional-consent')?.checked || false,
      marketingConsent: document.getElementById('marketing-consent')?.checked || false
    };

    // Validate form
    if (!validateForm(formData)) {
      return;
    }

    // Check if EmailJS is configured
    if (typeof emailjs !== 'undefined' && EMAILJS_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY') {
      // Use EmailJS to send email
      await sendWithEmailJS(formData);
    } else {
      // Fallback to mailto
      sendWithMailto(formData);
    }
  });

  async function sendWithEmailJS(data) {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;

    // Show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin" style="margin-right: 0.5rem;"></i>Sending...';

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

    const budgetLabels = {
      '1500-2500': '$1,500 to $2,500',
      '2500-5000': '$2,500 to $5,000',
      '5000-10000': '$5,000 to $10,000',
      '10000+': '$10,000+'
    };

    // Format date
    //const eventDate = new Date(data.eventDate);
    const formattedDate = new Date(data.eventDate + "T00:00:00").toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Prepare template parameters
    const templateParams = {
      to_email: 'info@wrightmemorialevents.com',
      from_name: data.name,
      from_email: data.email,
      phone: data.phone,
      event_date: formattedDate,
      event_type: eventTypeLabels[data.eventType] || data.eventType,
      guest_count: data.guestCount,
      dates_flexible: data.datesFlexible === 'yes' ? 'Yes' : (data.datesFlexible === 'no' ? 'No' : 'Not specified'),
      budget_range: budgetLabels[data.budgetRange] || 'Not specified',
      extra_services: data.extraServices || 'None specified',
      interested_tour: data.interestedTour === 'yes' ? 'Yes' : (data.interestedTour === 'no' ? 'No' : 'Not specified'),
      message: data.message,
      transactional_consent: data.transactionalConsent ? 'Yes' : 'No',
      marketing_consent: data.marketingConsent ? 'Yes' : 'No',
      submitted_at: new Date().toLocaleString('en-US')
    };

    try {
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams
      );

      // Show success message
      showSuccessMessage();
      form.reset();

    } catch (error) {
      console.error('EmailJS Error:', error);
      showMessage('There was an error sending your message. Please try again or call us directly.', 'error');
    } finally {
      // Restore button
      submitButton.disabled = false;
      submitButton.innerHTML = originalText;
    }
  }

  function sendWithMailto(data) {
    const recipientEmail = 'info@wrightmemorialevents.com';
    const emailSubject = `New Contact Form Submission - ${data.eventType}`;
    const emailBody = createEmailBody(data);
    const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    showMessage('Opening email client...', 'info');

    setTimeout(() => {
      window.location.href = mailtoLink;
      form.reset();
      showMessage('Your email client should open. Please send the email to complete your inquiry.', 'success');
    }, 500);
  }

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

    const budgetLabels = {
      '1500-2500': '$1,500 to $2,500',
      '2500-5000': '$2,500 to $5,000',
      '5000-10000': '$5,000 to $10,000',
      '10000+': '$10,000+'
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
Dates Flexible: ${data.datesFlexible === 'yes' ? 'Yes' : (data.datesFlexible === 'no' ? 'No' : 'Not specified')}
Budget Range: ${budgetLabels[data.budgetRange] || 'Not specified'}
Extra Services Needed: ${data.extraServices || 'None specified'}
Interested in Tour: ${data.interestedTour === 'yes' ? 'Yes' : (data.interestedTour === 'no' ? 'No' : 'Not specified')}

MESSAGE:
--------
${data.message}

CONSENT:
--------
Transactional Messages: ${data.transactionalConsent ? 'Yes' : 'No'}
Marketing Messages: ${data.marketingConsent ? 'Yes' : 'No'}

Submitted on: ${new Date().toLocaleString('en-US')}

=================================================
This inquiry was submitted through the Wright Memorial Event Center website contact form.
    `.trim();
  }

  function showSuccessMessage() {
    const successDiv = document.getElementById('form-success');
    if (successDiv) {
      successDiv.style.display = 'block';
      successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // Hide after 10 seconds
      setTimeout(() => {
        successDiv.style.display = 'none';
      }, 10000);
    }
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
