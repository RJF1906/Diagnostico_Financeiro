const form = document.getElementById('multiStepForm');
const steps = Array.from(document.querySelectorAll('.form-step'));
const nextBtns = document.querySelectorAll('.next');
const prevBtns = document.querySelectorAll('.prev');
const loadingMessage = document.getElementById('loadingMessage');
let currentStep = 0;

function showStep(index) {
  steps.forEach((step, i) => step.classList.toggle('active', i === index));
}

nextBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const currentInputs = steps[currentStep].querySelectorAll('input[required]');
    let valid = true;
    currentInputs.forEach(input => {
      if (!input.checkValidity()) {
        input.reportValidity();
        valid = false;
      }
    });
    if (valid) {
      currentStep++;
      showStep(currentStep);
    }
  });
});

prevBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    currentStep--;
    showStep(currentStep);
  });
});

form.addEventListener('submit', e => {
  e.preventDefault();

  // Mostra mensagem de carregamento
  loadingMessage.classList.remove('hidden');

  const formData = new FormData(form);
  
  // Coleta as respostas múltiplas de dores e metas
  const dores = Array.from(document.querySelectorAll('input[name="dores"]:checked')).map(cb => cb.value).join(', ');
  const metas = Array.from(document.querySelectorAll('input[name="metas"]:checked')).map(cb => cb.value).join(', ');
  
  // Adiciona no formData
  formData.set('dores', dores);
  formData.set('metas', metas);

  // Envia os dados para o Google Apps Script
  fetch('https://script.google.com/macros/s/AKfycbxCKVU0TtezySipbQeQqDcVjeEJsL_sO7SsmWSzF7svF5S1IqWSfGa7Jx4g1DMn_vrFGQ/exec', {
    method: 'POST',
    body: formData
  }).then(() => {
    loadingMessage.classList.add('hidden'); // Oculta após envio
    currentStep++;
    showStep(currentStep);
    form.reset();
  }).catch(err => {
    loadingMessage.classList.add('hidden'); // Oculta se der erro
    alert("Erro ao enviar os dados. Tente novamente.");
  });
});

showStep(currentStep);
