
let currentStep = 0;
const form = document.getElementById('multiStepForm');
const steps = form.querySelectorAll('.form-step');

function nextStep() {
    if (!validateStep()) return;
    steps[currentStep].classList.remove('active');
    currentStep++;
    steps[currentStep].classList.add('active');
}

function validateStep() {
    const inputs = steps[currentStep].querySelectorAll('input[required]');
    for (let input of inputs) {
        if (!input.value) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return false;
        }
    }
    return true;
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(form);
    fetch('https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec', {
        method: 'POST',
        body: formData
    }).then(response => {
        steps[currentStep].classList.remove('active');
        currentStep++;
        steps[currentStep].classList.add('active');
    }).catch(error => {
        alert('Erro ao enviar. Tente novamente.');
        console.error(error);
    });
});

window.onload = () => {
    const metas = [
        "Quitar dívidas e limpar meu nome.",
        "Montar uma reserva de emergência.",
        "Organizar meus gastos e começar a economizar.",
        "Aprender a investir com segurança.",
        "Comprar um imóvel ou carro.",
        "Fazer uma viagem dos sonhos.",
        "Ter um plano para aposentadoria.",
        "Ajudar meus pais ou filhos financeiramente.",
        "Mudar de carreira ou abrir um negócio.",
        "Me sentir seguro e no controle do meu dinheiro."
    ];
    const metasContainer = document.getElementById('metasContainer');
    metas.forEach(meta => {
        const label = document.createElement('label');
        label.innerHTML = \`<input type="checkbox" name="metas" value="\${meta}"> \${meta}\`;
        metasContainer.appendChild(label);
    });
};
