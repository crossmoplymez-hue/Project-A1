// Form Validation JavaScript File

// Document Ready
$(document).ready(function () {
  // Initialize form validation
  initFormValidation();
  initPasswordToggle();
  initNewsletterValidation();
  initContactFormValidation();
  initRegistrationFormValidation();
  initLoginFormValidation();
});

// Form Validation
function initFormValidation() {
  $("form").each(function () {
    const form = $(this);

    form.on("submit", function (e) {
      let isValid = true;

      // Validate required fields
      form.find("[required]").each(function () {
        const field = $(this);
        const value = field.val().trim();

        if (!value) {
          isValid = false;
          showError(field, "Field ini wajib diisi");
        } else {
          clearError(field);

          // Email validation
          if (field.attr("type") === "email") {
            if (!isValidEmail(value)) {
              isValid = false;
              showError(field, "Format email tidak valid");
            }
          }

          // Phone validation
          if (field.attr("type") === "tel") {
            if (!isValidPhone(value)) {
              isValid = false;
              showError(field, "Format telepon tidak valid");
            }
          }

          // URL validation
          if (field.attr("type") === "url") {
            if (!isValidUrl(value)) {
              isValid = false;
              showError(field, "Format URL tidak valid");
            }
          }

          // Password validation
          if (field.attr("type") === "password") {
            if (!isValidPassword(value)) {
              isValid = false;
              showError(
                field,
                "Password harus minimal 8 karakter, mengandung huruf besar, huruf kecil, dan angka"
              );
            }
          }

          // Confirm password validation
          if (field.hasClass("confirm-password")) {
            const password = form.find(".password").val();
            if (value !== password) {
              isValid = false;
              showError(field, "Konfirmasi password tidak cocok");
            }
          }
        }
      });

      if (!isValid) {
        e.preventDefault();

        // Scroll to first error
        const firstError = form.find(".error").first();
        if (firstError.length) {
          $("html, body").animate(
            {
              scrollTop: firstError.offset().top - 100,
            },
            500
          );
        }
      }
    });

    // Remove error on input
    form.find("input, textarea, select").on("input", function () {
      clearError($(this));
    });
  });
}

// Show Error Message
function showError(field, message) {
  field.addClass("error");
  field.siblings(".error-message").remove();
  field.after(`<span class="error-message">${message}</span>`);
}

// Clear Error Message
function clearError(field) {
  field.removeClass("error");
  field.siblings(".error-message").remove();
}

// Email Validation
function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

// Phone Validation
function isValidPhone(phone) {
  const phonePattern = /^[+]?[\d\s\-()]+$/;
  return phonePattern.test(phone);
}

// URL Validation
function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

// Password Validation
function isValidPassword(password) {
  // Minimum 8 characters, at least one uppercase, one lowercase, and one number
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordPattern.test(password);
}

// Password Toggle
function initPasswordToggle() {
  const passwordToggles = $(".password-toggle");

  if (passwordToggles.length) {
    passwordToggles.on("click", function () {
      const passwordInput = $(this).siblings("input");
      const type =
        passwordInput.attr("type") === "password" ? "text" : "password";

      passwordInput.attr("type", type);
      $(this).toggleClass("fa-eye fa-eye-slash");
    });
  }
}

// Newsletter Validation
function initNewsletterValidation() {
  const newsletterForms = $(".newsletter-form");

  if (newsletterForms.length) {
    newsletterForms.on("submit", function (e) {
      e.preventDefault();

      const form = $(this);
      const emailInput = form.find('input[type="email"]');
      const email = emailInput.val().trim();

      if (!email) {
        showError(emailInput, "Email wajib diisi");
        return;
      }

      if (!isValidEmail(email)) {
        showError(emailInput, "Format email tidak valid");
        return;
      }

      // Simulate successful subscription
      form.html(
        '<div class="success-message">Terima kasih telah berlangganan newsletter kami!</div>'
      );
    });
  }
}

// Contact Form Validation
function initContactFormValidation() {
  const contactForms = $(".contact-form");

  if (contactForms.length) {
    contactForms.on("submit", function (e) {
      e.preventDefault();

      const form = $(this);
      let isValid = true;

      // Validate name
      const nameInput = form.find('input[name="name"]');
      const name = nameInput.val().trim();

      if (!name) {
        isValid = false;
        showError(nameInput, "Nama wajib diisi");
      } else {
        clearError(nameInput);
      }

      // Validate email
      const emailInput = form.find('input[name="email"]');
      const email = emailInput.val().trim();

      if (!email) {
        isValid = false;
        showError(emailInput, "Email wajib diisi");
      } else if (!isValidEmail(email)) {
        isValid = false;
        showError(emailInput, "Format email tidak valid");
      } else {
        clearError(emailInput);
      }

      // Validate subject
      const subjectInput = form.find('input[name="subject"]');
      const subject = subjectInput.val().trim();

      if (!subject) {
        isValid = false;
        showError(subjectInput, "Subjek wajib diisi");
      } else {
        clearError(subjectInput);
      }

      // Validate message
      const messageInput = form.find('textarea[name="message"]');
      const message = messageInput.val().trim();

      if (!message) {
        isValid = false;
        showError(messageInput, "Pesan wajib diisi");
      } else {
        clearError(messageInput);
      }

      if (isValid) {
        // Simulate successful form submission
        form.html(
          '<div class="success-message">Pesan Anda telah terkirim! Kami akan menghubungi Anda segera.</div>'
        );
      }
    });
  }
}

// Registration Form Validation
function initRegistrationFormValidation() {
  const registrationForms = $(".registration-form");

  if (registrationForms.length) {
    registrationForms.on("submit", function (e) {
      e.preventDefault();

      const form = $(this);
      let isValid = true;

      // Validate name
      const nameInput = form.find('input[name="name"]');
      const name = nameInput.val().trim();

      if (!name) {
        isValid = false;
        showError(nameInput, "Nama wajib diisi");
      } else {
        clearError(nameInput);
      }

      // Validate email
      const emailInput = form.find('input[name="email"]');
      const email = emailInput.val().trim();

      if (!email) {
        isValid = false;
        showError(emailInput, "Email wajib diisi");
      } else if (!isValidEmail(email)) {
        isValid = false;
        showError(emailInput, "Format email tidak valid");
      } else {
        clearError(emailInput);
      }

      // Validate password
      const passwordInput = form.find('input[name="password"]');
      const password = passwordInput.val().trim();

      if (!password) {
        isValid = false;
        showError(passwordInput, "Password wajib diisi");
      } else if (!isValidPassword(password)) {
        isValid = false;
        showError(
          passwordInput,
          "Password harus minimal 8 karakter, mengandung huruf besar, huruf kecil, dan angka"
        );
      } else {
        clearError(passwordInput);
      }

      // Validate confirm password
      const confirmPasswordInput = form.find('input[name="confirm_password"]');
      const confirmPassword = confirmPasswordInput.val().trim();

      if (!confirmPassword) {
        isValid = false;
        showError(confirmPasswordInput, "Konfirmasi password wajib diisi");
      } else if (confirmPassword !== password) {
        isValid = false;
        showError(confirmPasswordInput, "Konfirmasi password tidak cocok");
      } else {
        clearError(confirmPasswordInput);
      }

      // Validate terms
      const termsInput = form.find('input[name="terms"]');

      if (!termsInput.is(":checked")) {
        isValid = false;
        showError(termsInput, "Anda harus menyetujui syarat dan ketentuan");
      } else {
        clearError(termsInput);
      }

      if (isValid) {
        // Simulate successful registration
        form.html(
          '<div class="success-message">Pendaftaran berhasil! Silakan periksa email Anda untuk verifikasi.</div>'
        );
      }
    });
  }
}

// Login Form Validation
function initLoginFormValidation() {
  const loginForms = $(".login-form");

  if (loginForms.length) {
    loginForms.on("submit", function (e) {
      e.preventDefault();

      const form = $(this);
      let isValid = true;

      // Validate email
      const emailInput = form.find('input[name="email"]');
      const email = emailInput.val().trim();

      if (!email) {
        isValid = false;
        showError(emailInput, "Email wajib diisi");
      } else if (!isValidEmail(email)) {
        isValid = false;
        showError(emailInput, "Format email tidak valid");
      } else {
        clearError(emailInput);
      }

      // Validate password
      const passwordInput = form.find('input[name="password"]');
      const password = passwordInput.val().trim();

      if (!password) {
        isValid = false;
        showError(passwordInput, "Password wajib diisi");
      } else {
        clearError(passwordInput);
      }

      if (isValid) {
        // Simulate successful login
        form.html(
          '<div class="success-message">Login berhasil! Mengarahkan ke dashboard...</div>'
        );

        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          window.location.href = "dashboard.html";
        }, 2000);
      }
    });
  }
}

// File Upload Validation
function initFileUploadValidation() {
  const fileInputs = $('input[type="file"]');

  if (fileInputs.length) {
    fileInputs.on("change", function () {
      const input = $(this);
      const file = input[0].files[0];

      if (file) {
        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
          showError(input, "Ukuran file terlalu besar. Maksimal 5MB");
          input.val("");
          return;
        }

        // Validate file type
        const allowedTypes =
          input.data("allowed-types") || "image/jpeg,image/png,image/gif";
        if (!allowedTypes.includes(file.type)) {
          showError(
            input,
            "Tipe file tidak diizinkan. Hanya file gambar yang diizinkan"
          );
          input.val("");
          return;
        }

        clearError(input);

        // Show file name
        const fileName = file.name;
        input.siblings(".file-name").text(fileName);
      }
    });
  }
}

// Initialize when document is ready
$(document).ready(function () {
  initFileUploadValidation();
});

// Real-time Validation
function initRealTimeValidation() {
  const realTimeInputs = $("input[data-validate]");

  if (realTimeInputs.length) {
    realTimeInputs.on("blur", function () {
      const input = $(this);
      const value = input.val().trim();
      const validateType = input.data("validate");

      if (value) {
        let isValid = true;
        let errorMessage = "";

        switch (validateType) {
          case "email":
            isValid = isValidEmail(value);
            errorMessage = "Format email tidak valid";
            break;
          case "phone":
            isValid = isValidPhone(value);
            errorMessage = "Format telepon tidak valid";
            break;
          case "url":
            isValid = isValidUrl(value);
            errorMessage = "Format URL tidak valid";
            break;
          case "password":
            isValid = isValidPassword(value);
            errorMessage =
              "Password harus minimal 8 karakter, mengandung huruf besar, huruf kecil, dan angka";
            break;
        }

        if (!isValid) {
          showError(input, errorMessage);
        } else {
          clearError(input);
        }
      }
    });
  }
}

// Initialize when document is ready
$(document).ready(function () {
  initRealTimeValidation();
});

// Form Submission Animation
function initFormSubmissionAnimation() {
  const forms = $("form");
}
if (forms.length) {
  forms.on("submit"),
    function (e) {
      const form = $();
    };
  // Form Submission Animation
  function initFormSubmissionAnimation() {
    const forms = $("form");
  }
  if (forms.length) {
    forms.on("submit", function (e) {
      const form = $(this);
      const submitBtn = form.find('button[type="submit"]');

      // Show loading animation
      submitBtn.prop("disabled", true);
      submitBtn.html('<i class="fas fa-spinner fa-spin"></i> Memproses...');

      // Simulate AJAX request
      setTimeout(() => {
        // Reset button
        submitBtn.prop("disabled", false);
        submitBtn.html("Kirim");

        // Show success message
        form.prepend(
          '<div class="alert alert-success">Form berhasil dikirim!</div>'
        );

        // Clear form
        form[0].reset();

        // Remove success message after 3 seconds
        setTimeout(() => {
          form.find(".alert").fadeOut(() => $(this).remove());
        }, 3000);
      }, 2000);
    });
  }
}

// Initialize when document is ready
$(document).ready(function () {
  initFormSubmissionAnimation();
});

// Character Counter
function initCharacterCounter() {
  const textareas = $("textarea[data-max-length]");

  if (textareas.length) {
    textareas.each(function () {
      const textarea = $(this);
      const maxLength = textarea.data("max-length");
      const counter = $(
        `<div class="char-counter"><span class="char-count">0</span>/${maxLength}</div>`
      );

      textarea.after(counter);

      textarea.on("input", function () {
        const length = $(this).val().length;
        const charCount = counter.find(".char-count");

        charCount.text(length);

        if (length > maxLength) {
          counter.addClass("over-limit");
        } else {
          counter.removeClass("over-limit");
        }
      });
    });
  }
}

// Initialize when document is ready
$(document).ready(function () {
  initCharacterCounter();
});

// Password Strength Meter
function initPasswordStrengthMeter() {
  const passwordInputs = $('input[type="password"][data-strength-meter]');

  if (passwordInputs.length) {
    passwordInputs.each(function () {
      const input = $(this);
      const meter = $(`<div class="password-strength-meter">
                <div class="strength-bar"></div>
                <div class="strength-text"></div>
            </div>`);

      input.after(meter);

      input.on("input", function () {
        const password = $(this).val();
        const strength = calculatePasswordStrength(password);
        const bar = meter.find(".strength-bar");
        const text = meter.find(".strength-text");

        // Update bar
        bar.css("width", strength.percentage + "%");
        bar.removeClass("very-weak weak medium strong very-strong");
        bar.addClass(strength.class);

        // Update text
        text.text(strength.text);
      });
    });
  }
}

// Calculate Password Strength
function calculatePasswordStrength(password) {
  let strength = 0;
  let text = "Sangat Lemah";
  let className = "very-weak";
  let percentage = 0;

  if (password.length > 0) {
    percentage = 20;

    // Length check
    if (password.length > 6) strength++;
    if (password.length > 8) strength++;

    // Character variety checks
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    // Determine strength level
    if (strength < 2) {
      text = "Lemah";
      className = "weak";
      percentage = 40;
    } else if (strength < 3) {
      text = "Cukup";
      className = "medium";
      percentage = 60;
    } else if (strength < 4) {
      text = "Kuat";
      className = "strong";
      percentage = 80;
    } else {
      text = "Sangat Kuat";
      className = "very-strong";
      percentage = 100;
    }
  }

  return {
    text: text,
    class: className,
    percentage: percentage,
  };
}

// Initialize when document is ready
$(document).ready(function () {
  initPasswordStrengthMeter();
});

// Credit Card Validation
function initCreditCardValidation() {
  const cardInputs = $("input[data-credit-card]");

  if (cardInputs.length) {
    cardInputs.on("input", function () {
      const input = $(this);
      let value = input.val().replace(/\D/g, "");

      // Format card number with spaces
      if (value.length > 0) {
        value = value.match(new RegExp(".{1,4}", "g")).join(" ");
      }

      input.val(value);

      // Detect card type
      const cardType = detectCardType(value.replace(/\s/g, ""));
      const cardIcon = input.siblings(".card-icon");

      if (cardIcon.length) {
        cardIcon.removeClass("visa mastercard amex discover unknown");
        if (cardType) {
          cardIcon.addClass(cardType);
        } else {
          cardIcon.addClass("unknown");
        }
      }
    });
  }
}

// Detect Credit Card Type
function detectCardType(cardNumber) {
  const patterns = {
    visa: /^4/,
    mastercard: /^5[1-5]/,
    amex: /^3[47]/,
    discover: /^6(?:011|5)/,
  };

  for (const [type, pattern] of Object.entries(patterns)) {
    if (pattern.test(cardNumber)) {
      return type;
    }
  }

  return null;
}

// Initialize when document is ready
$(document).ready(function () {
  initCreditCardValidation();
});

// Expiry Date Validation
function initExpiryDateValidation() {
  const expiryInputs = $("input[data-expiry-date]");

  if (expiryInputs.length) {
    expiryInputs.on("input", function () {
      const input = $(this);
      let value = input.val().replace(/\D/g, "");

      // Format expiry date with slash
      if (value.length > 2) {
        value = value.substring(0, 2) + "/" + value.substring(2, 4);
      }

      input.val(value);

      // Validate expiry date
      if (value.length === 5) {
        const [month, year] = value.split("/");
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100;
        const currentMonth = currentDate.getMonth() + 1;

        if (parseInt(month) > 12 || parseInt(month) < 1) {
          showError(input, "Bulan tidak valid");
        } else if (
          parseInt(year) < currentYear ||
          (parseInt(year) === currentYear && parseInt(month) < currentMonth)
        ) {
          showError(input, "Kartu telah kedaluwarsa");
        } else {
          clearError(input);
        }
      }
    });
  }
}

// Initialize when document is ready
$(document).ready(function () {
  initExpiryDateValidation();
});

// CVV Validation
function initCVVValidation() {
  const cvvInputs = $("input[data-cvv]");

  if (cvvInputs.length) {
    cvvInputs.on("input", function () {
      const input = $(this);
      let value = input.val().replace(/\D/g, "");

      // Limit to 3-4 digits
      if (value.length > 4) {
        value = value.substring(0, 4);
      }

      input.val(value);

      // Validate CVV length
      if (value.length < 3) {
        showError(input, "CVV harus 3-4 digit");
      } else {
        clearError(input);
      }
    });
  }
}

// Initialize when document is ready
$(document).ready(function () {
  initCVVValidation();
});

// Multi-Step Form
function initMultiStepForm() {
  const multiStepForms = $(".multi-step-form");

  if (multiStepForms.length) {
    multiStepForms.each(function () {
      const form = $(this);
      const steps = form.find(".form-step");
      const nextBtns = form.find(".next-step");
      const prevBtns = form.find(".prev-step");
      const progress = form.find(".progress-bar");

      let currentStep = 0;

      // Show first step
      showStep(currentStep);

      // Next button click
      nextBtns.on("click", function () {
        // Validate current step
        const currentStepElem = steps.eq(currentStep);
        const inputs = currentStepElem.find(
          "input, select, textarea[required]"
        );
        let isValid = true;

        inputs.each(function () {
          const input = $(this);
          const value = input.val().trim();

          if (!value) {
            isValid = false;
            showError(input, "Field ini wajib diisi");
          } else {
            clearError(input);
          }
        });

        if (isValid) {
          currentStep++;
          showStep(currentStep);
          updateProgress();
        }
      });

      // Previous button click
      prevBtns.on("click", function () {
        currentStep--;
        showStep(currentStep);
        updateProgress();
      });

      // Show specific step
      function showStep(step) {
        steps.hide();
        steps.eq(step).show();

        // Show/hide navigation buttons
        form.find(".prev-step").toggle(step > 0);
        form.find(".next-step").toggle(step < steps.length - 1);
        form.find(".submit-form").toggle(step === steps.length - 1);
      }

      // Update progress bar
      function updateProgress() {
        const progressPercentage = (currentStep / (steps.length - 1)) * 100;
        progress.css("width", progressPercentage + "%");
      }
    });
  }
}

// Initialize when document is ready
$(document).ready(function () {
  initMultiStepForm();
});

// Address Autocomplete
function initAddressAutocomplete() {
  const addressInputs = $("input[data-address-autocomplete]");

  if (addressInputs.length && typeof google !== "undefined") {
    addressInputs.each(function () {
      const input = $(this);
      const autocomplete = new google.maps.places.Autocomplete(input[0], {
        types: ["geocode"],
      });

      google.maps.event.addListener(autocomplete, "place_changed", function () {
        const place = autocomplete.getPlace();

        // Fill address fields
        fillAddressFields(place);
      });
    });
  }
}

// Fill Address Fields
function fillAddressFields(place) {
  // Extract address components
  let street = "";
  let city = "";
  let state = "";
  let zip = "";
  let country = "";

  for (const component of place.address_components) {
    const types = component.types;

    if (types.includes("street_number")) {
      street = component.long_name + " ";
    } else if (types.includes("route")) {
      street += component.long_name;
    } else if (types.includes("locality")) {
      city = component.long_name;
    } else if (types.includes("administrative_area_level_1")) {
      state = component.short_name;
    } else if (types.includes("postal_code")) {
      zip = component.long_name;
    } else if (types.includes("country")) {
      country = component.long_name;
    }
  }

  // Fill form fields
  $('input[name="street"]').val(street);
  $('input[name="city"]').val(city);
  $('input[name="state"]').val(state);
  $('input[name="zip"]').val(zip);
  $('input[name="country"]').val(country);
}

// Initialize when document is ready
$(document).ready(function () {
  initAddressAutocomplete();
});

// Form Data Persistence
function initFormDataPersistence() {
  const forms = $("form[data-persist]");

  if (forms.length) {
    forms.each(function () {
      const form = $(this);
      const formId =
        form.attr("id") || "form-" + Math.random().toString(36).substr(2, 9);

      // Load saved data
      const savedData = localStorage.getItem(formId);
      if (savedData) {
        const data = JSON.parse(savedData);

        for (const [name, value] of Object.entries(data)) {
          form.find(`[name="${name}"]`).val(value);
        }
      }

      // Save data on input
      form.on("input", "input, select, textarea", function () {
        const formData = {};

        form.serializeArray().forEach((item) => {
          formData[item.name] = item.value;
        });

        localStorage.setItem(formId, JSON.stringify(formData));
      });

      // Clear data on submit
      form.on("submit", function () {
        localStorage.removeItem(formId);
      });
    });
  }
}

// Initialize when document is ready
$(document).ready(function () {
  initFormDataPersistence();
});

// Input Masking
function initInputMasking() {
  // Phone number masking
  $('input[type="tel"]').on("input", function () {
    let value = $(this).val().replace(/\D/g, "");

    if (value.length > 0) {
      value = "(" + value;

      if (value.length > 4) {
        value = value.substring(0, 4) + ") " + value.substring(4);
      }

      if (value.length > 9) {
        value = value.substring(0, 9) + "-" + value.substring(9, 13);
      }
    }

    $(this).val(value);
  });

  // Date masking
  $('input[type="date"]').on("input", function () {
    let value = $(this).val().replace(/\D/g, "");

    if (value.length > 0) {
      if (value.length > 2) {
        value = value.substring(0, 2) + "/" + value.substring(2);
      }

      if (value.length > 5) {
        value = value.substring(0, 5) + "/" + value.substring(5, 9);
      }
    }

    $(this).val(value);
  });

  // Currency masking
  $("input[data-currency]").on("input", function () {
    let value = $(this).val().replace(/[^\d]/g, "");

    if (value.length > 0) {
      value = parseInt(value).toLocaleString("id-ID");
    }

    $(this).val(value);
  });
}

// Initialize when document is ready
$(document).ready(function () {
  initInputMasking();
});

// Dependent Selects
function initDependentSelects() {
  const dependentSelects = $("select[data-dependent]");

  if (dependentSelects.length) {
    dependentSelects.each(function () {
      const select = $(this);
      const targetSelectId = select.data("dependent");
      const targetSelect = $(`#${targetSelectId}`);
      const dataUrl = select.data("url");

      select.on("change", function () {
        const selectedValue = $(this).val();

        if (selectedValue) {
          // Show loading
          targetSelect.html('<option value="">Memuat...</option>');

          // Simulate AJAX request
          setTimeout(() => {
            // This would typically be an AJAX call to get dependent data
            const options = getDependentOptions(selectedValue);

            targetSelect.html('<option value="">Pilih...</option>');

            for (const [value, text] of Object.entries(options)) {
              targetSelect.append(`<option value="${value}">${text}</option>`);
            }
          }, 500);
        } else {
          targetSelect.html('<option value="">Pilih...</option>');
        }
      });
    });
  }
}

// Get Dependent Options (simulated)
function getDependentOptions(selectedValue) {
  // This would typically come from an API
  const data = {
    category1: {
      sub1: "Subcategory 1",
      sub2: "Subcategory 2",
      sub3: "Subcategory 3",
    },
    category2: {
      sub4: "Subcategory 4",
      sub5: "Subcategory 5",
      sub6: "Subcategory 6",
    },
    category3: {
      sub7: "Subcategory 7",
      sub8: "Subcategory 8",
      sub9: "Subcategory 9",
    },
  };

  return data[selectedValue] || {};
}

// Initialize when document is ready
$(document).ready(function () {
  initDependentSelects();
});

// Form Analytics
function initFormAnalytics() {
  const forms = $("form[data-analytics]");

  if (forms.length) {
    forms.each(function () {
      const form = $(this);
      const formId = form.attr("id") || "unknown-form";
      let startTime = Date.now();
      let fieldInteractions = {};

      // Track form view
      trackEvent("Form", "View", formId);

      // Track time spent
      const trackTimeSpent = () => {
        const timeSpent = Date.now() - startTime;
        trackEvent("Form", "Time Spent", formId, timeSpent);
      };

      // Track field interactions
      form.on("focus", "input, select, textarea", function () {
        const fieldName = $(this).attr("name");
        fieldInteractions[fieldName] = (fieldInteractions[fieldName] || 0) + 1;
      });

      // Track form submission
      form.on("submit", function () {
        trackTimeSpent();

        // Track field interactions
        for (const [field, count] of Object.entries(fieldInteractions)) {
          trackEvent("Form Field", "Interaction", field, count);
        }

        trackEvent("Form", "Submit", formId);
      });

      // Track form abandonment
      $(window).on("beforeunload", function () {
        if (!form.hasClass("submitted")) {
          trackTimeSpent();
          trackEvent("Form", "Abandon", formId);
        }
      });
    });
  }
}

// Track Event (simulated)
function trackEvent(category, action, label, value) {
  console.log("Event tracked:", { category, action, label, value });
  // This would typically send data to Google Analytics or another analytics service
}

// Initialize when document is ready
$(document).ready(function () {
  initFormAnalytics();
});

// Accessibility Features
function initAccessibilityFeatures() {
  // Add skip to content link
  if ($("#skip-to-content").length === 0) {
    $("body").prepend(
      '<a href="#main-content" id="skip-to-content" class="skip-link">Skip to main content</a>'
    );
  }

  // Add aria-labels to form elements without labels
  $("input, select, textarea")
    .not("[aria-label]")
    .not("[id]")
    .each(function () {
      const placeholder = $(this).attr("placeholder");
      if (placeholder) {
        $(this).attr("aria-label", placeholder);
      }
    });

  // Enhance focus styles
  $("a, button, input, select, textarea")
    .on("focus", function () {
      $(this).addClass("focus-visible");
    })
    .on("blur", function () {
      $(this).removeClass("focus-visible");
    });

  // Keyboard navigation for custom dropdowns
  $(".custom-dropdown").on("keydown", function (e) {
    const dropdown = $(this);
    const options = dropdown.find(".dropdown-option");
    const focusedOption = dropdown.find(".dropdown-option:focus");

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (focusedOption.length) {
          focusedOption.next().focus();
        } else {
          options.first().focus();
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        if (focusedOption.length) {
          focusedOption.prev().focus();
        } else {
          options.last().focus();
        }
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (focusedOption.length) {
          focusedOption.click();
        }
        break;
      case "Escape":
        dropdown.removeClass("open");
        break;
    }
  });
}

// Initialize when document is ready
$(document).ready(function () {
  initAccessibilityFeatures();
});

// Form Recovery
function initFormRecovery() {
  const forms = $("form[data-recovery]");

  if (forms.length) {
    forms.each(function () {
      const form = $(this);
      const recoveryKey = "form-recovery-" + (form.attr("id") || "default");

      // Check for recovery data
      const recoveryData = sessionStorage.getItem(recoveryKey);
      if (recoveryData) {
        const data = JSON.parse(recoveryData);
        const recoveryTime = new Date(data.timestamp);
        const currentTime = new Date();
        const timeDiff = (currentTime - recoveryTime) / (1000 * 60); // Difference in minutes

        if (timeDiff < 30) {
          // Recovery valid for 30 minutes
          if (
            confirm(
              "Kami menemukan data form yang belum tersimpan. Apakah Anda ingin memulihkannya?"
            )
          ) {
            // Restore form data
            for (const [name, value] of Object.entries(data.fields)) {
              form.find(`[name="${name}"]`).val(value);
            }
          }

          // Clear recovery data
          sessionStorage.removeItem(recoveryKey);
        }
      }

      // Save form data on unload
      $(window).on("beforeunload", function () {
        if (
          form.find("input, select, textarea").filter(function () {
            return $(this).val() !== "";
          }).length > 0
        ) {
          const formData = {
            timestamp: new Date().toISOString(),
            fields: {},
          };

          form.serializeArray().forEach((item) => {
            if (item.value) {
              formData.fields[item.name] = item.value;
            }
          });

          sessionStorage.setItem(recoveryKey, JSON.stringify(formData));
        }
      });

      // Clear recovery data on submit
      form.on("submit", function () {
        sessionStorage.removeItem(recoveryKey);
      });
    });
  }
}

// Initialize when document is ready
$(document).ready(function () {
  initFormRecovery();
});

// International Telephone Input
function initInternationalTelInput() {
  const telInputs = $('input[type="tel"][data-international]');

  if (telInputs.length) {
    telInputs.each(function () {
      const input = $(this);
      const container = $('<div class="international-tel-input"></div>');
      const flag = $('<div class="iti-flag"></div>');
      const dropdown = $('<div class="iti-dropdown"></div>');

      input.wrap(container);
      input.before(flag);
      input.after(dropdown);

      // Simulate country detection based on IP (would typically use an API)
      setTimeout(() => {
        flag.addClass("id"); // Indonesia flag
        input.val("+62");
      }, 1000);

      // Allow only numbers and plus sign
      input.on("input", function () {
        $(this).val(
          $(this)
            .val()
            .replace(/[^\d+]/g, "")
        );
      });
    });
  }
}

// Initialize when document is ready
$(document).ready(function () {
  initInternationalTelInput();
});

// Form Field Instructions
function initFormFieldInstructions() {
  const fieldsWithInstructions = $(
    "input[data-instruction], select[data-instruction], textarea[data-instruction]"
  );

  if (fieldsWithInstructions.length) {
    fieldsWithInstructions.each(function () {
      const field = $(this);
      const instruction = field.data("instruction");
      const instructionElement = $(
        `<div class="field-instruction">${instruction}</div>`
      );

      field.after(instructionElement);

      // Show instruction on focus
      field.on("focus", function () {
        instructionElement.addClass("visible");
      });

      // Hide instruction on blur
      field.on("blur", function () {
        instructionElement.removeClass("visible");
      });
    });
  }
}

// Initialize when document is ready
$(document).ready(function () {
  initFormFieldInstructions();
});

// Custom File Upload
function initCustomFileUpload() {
  const fileInputs = $('input[type="file"]');

  if (fileInputs.length) {
    fileInputs.each(function () {
      const input = $(this);
      const label = $('<label class="custom-file-upload"></label>');
      const button = $('<span class="file-button">Pilih File</span>');
      const fileName = $(
        '<span class="file-name">Tidak ada file dipilih</span>'
      );

      input.wrap(label);
      input.before(button);
      input.after(fileName);

      input.on("change", function () {
        const name = this.files[0]?.name || "Tidak ada file dipilih";
        fileName.text(name);
      });
    });
  }
}

// Initialize when document is ready
$(document).ready(function () {
  initCustomFileUpload();
});

// Form Field Formatting
function initFormFieldFormatting() {
  // Uppercase formatting
  $("input[data-uppercase]").on("input", function () {
    $(this).val($(this).val().toUpperCase());
  });

  // Lowercase formatting
  $("input[data-lowercase]").on("input", function () {
    $(this).val($(this).val().toLowerCase());
  });

  // Title case formatting
  $("input[data-titlecase]").on("input", function () {
    $(this).val(
      $(this)
        .val()
        .replace(/\w\S*/g, function (txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        })
    );
  });

  // Auto-trim whitespace
  $("input[data-trim]").on("blur", function () {
    $(this).val($(this).val().trim());
  });
}

// Initialize when document is ready
$(document).ready(function () {
  initFormFieldFormatting();
});

// Form Field Suggestions
function initFormFieldSuggestions() {
  const suggestionInputs = $("input[data-suggestions]");

  if (suggestionInputs.length) {
    suggestionInputs.each(function () {
      const input = $(this);
      const suggestions = input.data("suggestions").split(",");
      const suggestionList = $('<ul class="suggestion-list"></ul>');

      input.after(suggestionList);

      input.on("input", function () {
        const value = $(this).val().toLowerCase();
        suggestionList.empty();

        if (value) {
          const filteredSuggestions = suggestions.filter((suggestion) =>
            suggestion.toLowerCase().includes(value)
          );

          filteredSuggestions.slice(0, 5).forEach((suggestion) => {
            const li = $("<li></li>").text(suggestion);
            li.on("click", function () {
              input.val(suggestion);
              suggestionList.empty();
            });
            suggestionList.append(li);
          });

          if (filteredSuggestions.length > 0) {
            suggestionList.addClass("visible");
          } else {
            suggestionList.removeClass("visible");
          }
        } else {
          suggestionList.removeClass("visible");
        }
      });

      // Hide suggestions when clicking outside
      $(document).on("click", function (e) {
        if (
          !$(e.target).closest(".suggestion-list, input[data-suggestions]")
            .length
        ) {
          suggestionList.removeClass("visible");
        }
      });
    });
  }
}

// Initialize when document is ready
$(document).ready(function () {
  initFormFieldSuggestions();
});

// Form Field Dependencies
function initFormFieldDependencies() {
  const dependentFields = $("[data-dependent-field]");

  if (dependentFields.length) {
    dependentFields.each(function () {
      const field = $(this);
      const targetField = $(field.data("dependent-field"));
      const expectedValue = field.data("expected-value");

      function toggleField() {
        if (field.val() === expectedValue) {
          targetField.show().attr("required", true);
        } else {
          targetField.hide().removeAttr("required").val("");
        }
      }

      field.on("change", toggleField);
      toggleField(); // Initial check
    });
  }
}

// Initialize when document is ready
$(document).ready(function () {
  initFormFieldDependencies();
});

// Form Submission Confirmation
function initFormSubmissionConfirmation() {
  const forms = $("form[data-confirm]");

  if (forms.length) {
    forms.on("submit", function (e) {
      const confirmationMessage =
        $(this).data("confirm") || "Apakah Anda yakin ingin mengirim form ini?";

      if (!confirm(confirmationMessage)) {
        e.preventDefault();
      }
    });
  }
}

// Initialize when document is ready
$(document).ready(function () {
  initFormSubmissionConfirmation();
});

// Form Reset Confirmation
function initFormResetConfirmation() {
  const forms = $("form[data-confirm-reset]");

  if (forms.length) {
    forms.on("reset", function (e) {
      const confirmationMessage =
        $(this).data("confirm-reset") ||
        "Apakah Anda yakin ingin mengosongkan form?";

      if (!confirm(confirmationMessage)) {
        e.preventDefault();
      }
    });
  }
}

// Initialize when document is ready
$(document).ready(function () {
  initFormResetConfirmation();
});

// Form Auto-Save
function initFormAutoSave() {
  const forms = $("form[data-auto-save]");

  if (forms.length) {
    forms.each(function () {
      const form = $(this);
      const saveKey = "autosave-" + (form.attr("id") || "default");
      const saveInterval = form.data("auto-save-interval") || 30000; // Default 30 seconds
      let saveTimer;

      // Load auto-saved data
      const savedData = localStorage.getItem(saveKey);
      if (savedData) {
        try {
          const data = JSON.parse(savedData);
          for (const [name, value] of Object.entries(data)) {
            form.find(`[name="${name}"]`).val(value);
          }

          // Show auto-save notification
          showNotification(
            "Data form telah dipulihkan dari penyimpanan otomatis.",
            "info"
          );
        } catch (e) {
          console.error("Error parsing auto-saved data:", e);
        }
      }

      // Auto-save function
      function autoSave() {
        const formData = {};

        form.serializeArray().forEach((item) => {
          formData[item.name] = item.value;
        });

        localStorage.setItem(saveKey, JSON.stringify(formData));

        // Show save indicator
        const indicator = form.find(".auto-save-indicator");
        if (indicator.length) {
          indicator.addClass("saving").text("Menyimpan...");

          setTimeout(() => {
            indicator.removeClass("saving").text("Tersimpan");

            setTimeout(() => {
              indicator.text("");
            }, 2000);
          }, 500);
        }
      }

      // Set up auto-save timer
      function startAutoSave() {
        saveTimer = setInterval(autoSave, saveInterval);
      }

      // Stop auto-save timer
      function stopAutoSave() {
        clearInterval(saveTimer);
      }

      // Start auto-save on input
      form.on("input", "input, select, textarea", function () {
        stopAutoSave();
        startAutoSave();
      });

      // Clear auto-saved data on submit
      form.on("submit", function () {
        localStorage.removeItem(saveKey);
        stopAutoSave();
      });

      // Initial auto-save check
      if (
        form.find("input, select, textarea").filter(function () {
          return $(this).val() !== "";
        }).length > 0
      ) {
        startAutoSave();
      }
    });
  }
}

// Show Notification
function showNotification(message, type = "info") {
  const notification = $(
    `<div class="notification notification-${type}">${message}</div>`
  );

  $("body").append(notification);

  // Show notification
  setTimeout(() => {
    notification.addClass("show");
  }, 100);

  // Hide notification after 5 seconds
  setTimeout(() => {
    notification.removeClass("show");

    // Remove notification after fade out
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 5000);
}

// Initialize when document is ready
$(document).ready(function () {
  initFormAutoSave();
});

// Form Field Validation Styles
function initFormFieldValidationStyles() {
  const fields = $("input, select, textarea");

  if (fields.length) {
    fields.on("blur", function () {
      const field = $(this);

      if (field.is(":invalid") && field.val() !== "") {
        field.addClass("invalid");
      } else {
        field.removeClass("invalid");
      }

      if (field.is(":valid") && field.val() !== "") {
        field.addClass("valid");
      } else {
        field.removeClass("valid");
      }
    });
  }
}

// Initialize when document is ready
$(document).ready(function () {
  initFormFieldValidationStyles();
});
