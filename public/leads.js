/**
 * Lead modal + form handler for Whale website.
 */
(function () {
  'use strict';

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PHONE_RE = /^[0-9\s+\-()]{7,20}$/;

  const modal = document.getElementById('leadModal');
  const form = modal ? modal.querySelector('[data-lead-form]') : null;
  const errorEl = modal ? modal.querySelector('.lead-error') : null;
  const sourceTypeInput = document.getElementById('leadModalSourceType');
  const toast = document.getElementById('leadToast');

  if (!modal || !form) return;

  function generateUnionCode() {
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const random = Math.random().toString(36).slice(2, 8).toUpperCase();
    return `WHL-${date}-${random}`;
  }

  function setError(message) {
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.hidden = false;
    }
  }

  function clearError() {
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.hidden = true;
    }
  }

  function resetForm() {
    form.reset();
    const unionInput = form.querySelector('input[name="unionCode"]');
    if (unionInput) unionInput.value = generateUnionCode();
    clearError();
    form.hidden = false;
  }

  function showToast() {
    if (!toast) return;
    toast.hidden = false;
    setTimeout(() => {
      toast.hidden = true;
    }, 4000);
  }

  function openModal(sourceType) {
    if (sourceTypeInput) sourceTypeInput.value = sourceType || '官网立即咨询留资';
    resetForm();
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    const firstInput = form.querySelector('input:not([type="hidden"])');
    if (firstInput) firstInput.focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = '';
  }

  function validate(data) {
    if (!data.customerName || data.customerName.trim() === '') {
      return 'Please enter your company name.';
    }
    if (!data.contactName || data.contactName.trim() === '') {
      return 'Please enter your full name.';
    }
    if (!data.customerCountryCode || data.customerCountryCode.trim() === '') {
      return 'Please select your country.';
    }
    if (!data.contactPhone || data.contactPhone.trim() === '') {
      return 'Please enter your phone number.';
    }
    if (!PHONE_RE.test(data.contactPhone)) {
      return 'Please enter a valid phone number.';
    }
    if (!data.contactEmail || data.contactEmail.trim() === '') {
      return 'Please enter your work email.';
    }
    if (!EMAIL_RE.test(data.contactEmail)) {
      return 'Please enter a valid email address.';
    }
    if (!data.sourceType || data.sourceType.trim() === '') {
      return 'Please select a product interest.';
    }
    return null;
  }

  async function submitForm() {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalLabel = submitBtn ? submitBtn.textContent : 'Submit';

    const formData = new FormData(form);
    const data = {
      unionCode: generateUnionCode(),
      customerName: String(formData.get('customerName') || ''),
      customerCountryCode: String(formData.get('customerCountryCode') || ''),
      contactName: String(formData.get('contactName') || ''),
      contactPhone: String(formData.get('contactPhone') || ''),
      contactEmail: String(formData.get('contactEmail') || ''),
      sourceType: String(formData.get('sourceType') || ''),
      remark: String(formData.get('remark') || '')
    };

    const error = validate(data);
    if (error) {
      setError(error);
      return;
    }

    clearError();

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
    }

    try {
      const response = await fetch('/.netlify/functions/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      let result;
      const contentType = response.headers.get('content-type') || '';
      try {
        result = contentType.includes('application/json') ? await response.json() : { ok: false, message: await response.text() };
      } catch {
        result = { ok: false, message: `Server returned ${response.status}` };
      }

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
      }

      if (!response.ok || !result.ok) {
        setError(result.message || `Submission failed (${response.status}). Please try again.`);
        return;
      }

      closeModal();
      resetForm();
      showToast();
    } catch (err) {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
      }
      setError('Unable to connect to the submission service. If you are testing locally, make sure Netlify Dev is running (npm run dev only serves the static site).');
    }
  }

  // Open modal triggers
  document.querySelectorAll('[data-open-modal]').forEach((btn) => {
    btn.addEventListener('click', () => {
      openModal(btn.dataset.sourceType);
    });
  });

  // Close modal triggers
  modal.querySelectorAll('[data-close-modal]').forEach((el) => {
    el.addEventListener('click', closeModal);
  });

  // Escape to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hidden) {
      closeModal();
    }
  });

  // Form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    submitForm();
  });
})();
