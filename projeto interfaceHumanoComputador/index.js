const chatCircle = document.getElementById('chat-circle');
const chatBox = document.getElementById('chat-box');
const closeChat = document.getElementById('close-chat');
const chatWindow = document.getElementById('chat-window');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');


const knowledgeBase = {
    
    "olá": "Olá! Eu sou a Lumi! ✨ Como posso iluminar seu dia hoje?",
    "oi": "Oi, oi! Tudo bem por aí? 😊",
    "como vai": "Estou radiante! ⚡ Pronta para te ajudar com o que precisar.",
    "obrigado": "Imagina! Fico feliz em ajudar. 💜",
    "obrigada": "Disponha! Sempre que precisar, é só chamar. 👋",
    "quem é você": "Eu sou a Lumi, sua assistente virtual cheia de energia! 🔋",
    "valor": "O investimento é de apenas R$ 497,00 ou 12x de R$ 49,70. Um brilho de oferta, né? ✨",
    "preço": "O curso está com 30% de desconto hoje! Sai por R$ 497,00. 💰",
    "garantia": "Você tem 7 dias de garantia total. Se não gostar, devolvemos seu dinheiro sem burocracia! ✅",
    "certificado": "Sim! Ao concluir todas as aulas, você recebe um certificado digital exclusivo da LumiDesign. 🎓",
    "tempo": "O acesso é vitalício! Você pode estudar no seu ritmo, para sempre. ⏳",
    "cartão": "Aceitamos cartão de crédito (em até 12x), boleto e Pix com aprovação imediata! 💳",
    "pix": "Com Pix o acesso cai na hora! ⚡ Quer o link para pagamento?"
};

const defaultResponses = [
    "Hum, não tenho certeza se entendi... 🤔 Pode explicar melhor?",
    "Essa eu não conheço! Mas sobre o curso, posso te falar do preço, certificado ou garantia. 📚",
    "Ops, meu sistema brilhou mas não encontrou essa resposta. 😅 Tenta de novo?",
    "Pode reformular? Se quiser saber sobre o curso, estou pronta para ajudar! ⚡"
];


chatCircle.onclick = () => {
    chatBox.classList.toggle('hidden');
    userInput.focus();
};

closeChat.onclick = () => {
    chatBox.classList.add('hidden');
};

function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);
    msgDiv.innerText = text;
    chatWindow.appendChild(msgDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}


function getResponse(input) {
    const cleanInput = input.toLowerCase().trim();

    for (let key in knowledgeBase) {
        if (cleanInput.includes(key)) {
            return knowledgeBase[key];
        }
    }

    const randomIndex = Math.floor(Math.random() * defaultResponses.length);
    return defaultResponses[randomIndex];
}


function handleSendMessage() {
    const text = userInput.value.trim();
    
    if (text !== "") {
        addMessage(text, 'user');
        userInput.value = "";

        
        const typingId = "typing-" + Date.now();
        const typingDiv = document.createElement('div');
        typingDiv.className = "message bot";
        typingDiv.id = typingId;
        typingDiv.innerText = "Lumi está digitando...";
        chatWindow.appendChild(typingDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight;

        setTimeout(() => {
            const indicator = document.getElementById(typingId);
            if (indicator) indicator.remove();
            
            const reply = getResponse(text);
            addMessage(reply, 'bot');
        }, 1200);
    }
}


sendBtn.onclick = handleSendMessage;

userInput.onkeypress = (e) => {
    if (e.key === 'Enter') {
        handleSendMessage();
    }
};


window.onload = () => userInput.focus();