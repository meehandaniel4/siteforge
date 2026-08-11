document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) { event.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

const orderForm = document.querySelector('#order-form');

if (orderForm) {
  const templateName = new URLSearchParams(window.location.search).get('template');
  const templateLabel = document.querySelector('[data-template-name]');
  const templateField = document.querySelector('[data-template-field]');
  const hiddenTemplateField = orderForm.querySelector('input[name="template"]');

  if (templateName) {
    if (templateLabel) templateLabel.textContent = templateName;
    if (templateField) templateField.value = templateName;
    if (hiddenTemplateField) hiddenTemplateField.value = templateName;
  }

  orderForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!orderForm.checkValidity()) {
      orderForm.reportValidity();
      return;
    }

    const submitter = event.submitter;
    const method = submitter?.dataset.method || 'email';
    const formData = new FormData(orderForm);
    const name = formData.get('name');
    const business = formData.get('business');
    const contact = formData.get('contact');
    const project = formData.get('project');
    const details = formData.get('details');
    const template = formData.get('template');
    const isTemplateInquiry = orderForm.dataset.formType === 'template';
    const message = [
      isTemplateInquiry ? 'New SiteForge template inquiry' : 'New SiteForge custom order request',
      '',
      template ? `Template: ${template}` : '',
      `Name: ${name}`,
      `Business: ${business}`,
      `Contact: ${contact}`,
      `Project type: ${project}`,
      '',
      'Project details:',
      details
    ].join('\n');

    if (method === 'text') {
      window.location.href = `sms:+12672814478?body=${encodeURIComponent(message)}`;
      return;
    }

    const subject = isTemplateInquiry
      ? `SiteForge template inquiry - ${template || project}`
      : `SiteForge custom order - ${business}`;
    window.location.href = `mailto:siteforgemarketingllc@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  });
}
