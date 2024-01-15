document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('user-input').addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            askQuestion();
        }
    });
});

function askQuestion() {
    var userQuestion = document.getElementById('user-input').value;
    appendMessage('Você pergunta: ' + userQuestion, 'user');

    // Faça uma solicitação AJAX para o backend
    fetch('/ask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'user_question=' + encodeURIComponent(userQuestion),
    })
    .then(response => response.json())
    .then(data => {
        var answer = data.answer;
        appendMessage('Chatbot responde: ' + answer, 'bot');
    });
}

function appendMessage(message, sender) {
    var chatDiv = document.getElementById('chat');
    var messageDiv = document.createElement('div');
    messageDiv.className = sender;
    messageDiv.textContent = message;
    chatDiv.appendChild(messageDiv);
    document.getElementById('user-input').value = '';
    document.getElementById('user-input').focus();
}
