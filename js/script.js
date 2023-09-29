const editableText= document.getElementById('editable-text');

if(localStorage.getItem('savedText')){
  editableText.textContent=localStorage.getItem('savedText');
}


editableText.addEventListener('input', function(){
  localStorage.setItem('savedText',this.textContent);
})


// Function to perform a Google search
function googleSearch() {
    const searchInput = document.querySelector('input[type="text"]').value;
    if (searchInput.trim() !== '') {
        const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchInput)}`;
        window.location.href = searchUrl;
    }
}


// Function to perform a voice search using Web Speech API
function voiceSearch() {
    // Check if the browser supports the SpeechRecognition API
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

        recognition.onstart = function () {
            console.log('Voice recognition started...');
        };

        recognition.onresult = function (event) {
            const transcript = event.results[0][0].transcript;
            console.log('Voice recognition result:', transcript);

            // Populate the search input with the recognized query
            const searchInput = document.querySelector('input[type="text"]');
            searchInput.value = transcript;

            // Perform the search (same as the googleSearch function)
            googleSearch();
        };

        recognition.onend = function () {
            console.log('Voice recognition ended.');
        };

        // Start listening for voice input
        recognition.start();
    } else {
        // Browser does not support Web Speech API
        alert('Voice recognition is not supported in your browser.');
    }
}


// Event listeners for the search and voice buttons
document.querySelector('button[onclick="googleSearch();"]').addEventListener('click', googleSearch);
document.querySelector('button[onclick="voiceSearch();"]').addEventListener('click', voiceSearch);