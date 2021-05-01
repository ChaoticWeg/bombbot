const $ = require("jquery");

const Greetings = [
    "Hey",
    "Hello",
    "Hej",
    "Hola",
    "Greetings",
    "What's up",
    "Heyo",
    "Salut",
    "Privyet",
    "Ciao",
    "Yo",
    "Hi",
    "Hoi",
    "Witaj",
    "Selam",
    "Hei"
];

function randomGreeting() {
    const idx = Math.floor(Math.random() * Greetings.length);
    return Greetings[idx];
}

exports.setGreeting = () => {
    const greeting = randomGreeting();
    $("span#greeting").text(greeting);
}
