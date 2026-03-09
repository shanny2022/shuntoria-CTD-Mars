const body = document.body;
const footerElement = document.createElement("footer");

body.appendChild(footerElement);

const today = new Date();
const thisYear = today.getFullYear();
const footer = document.querySelector("footer");
const copyright = document.createElement("p");

copyright.innerHTML = `Shuntoria Reid \u00A9 ${thisYear}`;
footer.appendChild(copyright);

const skills = ["JavaScript", "HTML", "CSS", "Git", "GitHub"];
const skillsSection = document.getElementById("skills");
const skillsList = skillsSection.querySelector("ul");

for (let i = 0; i < skills.length; i += 1) {
  const skill = document.createElement("li");
  skill.innerText = skills[i];
  skillsList.appendChild(skill);
}

const messageForm = document.forms.leave_message;
const messageSection = document.getElementById("messages");
const messageList = messageSection.querySelector("ul");

messageSection.hidden = true;

messageForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const usersName = event.target.usersName.value;
  const usersEmail = event.target.usersEmail.value;
  const usersMessage = event.target.usersMessage.value;

  console.log(usersName, usersEmail, usersMessage);

  const newMessage = document.createElement("li");
  newMessage.innerHTML = `<a href="mailto:${usersEmail}">${usersName}</a> <span>${usersMessage}</span>`;

  const removeButton = document.createElement("button");
  removeButton.innerText = "remove";
  removeButton.type = "button";
  removeButton.addEventListener("click", (clickEvent) => {
    const entry = clickEvent.target.parentNode;
    entry.remove();

    if (messageList.children.length === 0) {
      messageSection.hidden = true;
    }
  });

  newMessage.appendChild(removeButton);
  messageList.appendChild(newMessage);
  messageSection.hidden = false;

  messageForm.reset();
});
