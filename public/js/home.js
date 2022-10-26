async function editFormHandler(event) {
    event.preventDefault();

let element = event.target;
var postId = element.getAttribute("data-postId");
const title="yes";
const content="yes";

if (title && content) {
  const response = await fetch('/api/comment/', {
    method: 'POST',
    body: JSON.stringify({ postid }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/comment');
  } else {
    alert(response.statusText);
  }
}
};
document
    .querySelector('#main')
    .addEventListener('click', editFormHandler);