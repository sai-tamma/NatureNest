// ============================================
// FORM VALIDATION MODULE
// Handles contact form validation and submission
// ============================================

class FormValidator {
  constructor(formId) {
    this.form = document.getElementById(formId);
    if (!this.form) return;

    this.init();
  }

  init() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));

    // Real-time validation
    const inputs = this.form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => {
        if (input.parentElement.classList.contains('error')) {
          this.validateField(input);
        }
      });
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    // Clear previous errors
    this.clearErrors();

    // Validate all fields
    const isValid = this.validateForm();

    if (isValid) {
      this.submitForm();
    }
  }

  validateForm() {
    const inputs = this.form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });

    return isValid;
  }

  validateField(field) {
    const formGroup = field.parentElement;
    const errorElement = formGroup.querySelector('.form-error');
    let isValid = true;
    let errorMessage = '';

    // Clear previous error
    formGroup.classList.remove('error');

    // Check if field is required and empty
    if (field.hasAttribute('required') && !field.value.trim()) {
      isValid = false;
      errorMessage = 'This field is required';
    }
    // Email validation
    else if (field.type === 'email' && field.value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(field.value.trim())) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
      }
    }
    // Phone validation
    else if (field.type === 'tel' && field.value.trim()) {
      const phoneRegex = /^[\d\s\-\(\)]+$/;
      if (!phoneRegex.test(field.value.trim()) || field.value.trim().length < 10) {
        isValid = false;
        errorMessage = 'Please enter a valid phone number';
      }
    }
    // Date validation (must be in the future)
    else if (field.type === 'date' && field.value) {
      const selectedDate = new Date(field.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        isValid = false;
        errorMessage = 'Event date must be in the future';
      }
    }
    // Number validation (guest count)
    else if (field.type === 'number' && field.value) {
      const value = parseInt(field.value);
      if (value < 1) {
        isValid = false;
        errorMessage = 'Guest count must be at least 1';
      }
    }

    // Display error if invalid
    if (!isValid && errorElement) {
      formGroup.classList.add('error');
      errorElement.textContent = errorMessage;
    }

    return isValid;
  }

  clearErrors() {
    const errorGroups = this.form.querySelectorAll('.form-group.error');
    errorGroups.forEach(group => group.classList.remove('error'));
  }

  submitForm() {
    // Get form data
    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData.entries());

    // Here you would normally send the data to a server
    // For now, we'll just show a success message
    console.log('Form submitted with data:', data);

    // Show success message
    this.showSuccess();

    // Reset form
    this.form.reset();
  }

  showSuccess() {
    const successMessage = this.form.querySelector('.form-success');
    if (successMessage) {
      successMessage.classList.add('show');

      // Scroll to success message
      successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      // Hide after 5 seconds
      setTimeout(() => {
        successMessage.classList.remove('show');
      }, 5000);
    }
  }
}

// Initialize form validation when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new FormValidator('contact-form');
});
