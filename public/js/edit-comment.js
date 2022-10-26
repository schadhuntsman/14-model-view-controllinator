
async function updateFormHandler(event) {
  event.preventDefault();
  
  const content = document.querySelector('#content').value.trim();
  
  const response = await fetch('/api/comment/edit', {
    method: 'PUT',
    body: JSON.stringify({ content }),
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    document.location.replace('/comment');
  } else {
    alert(response.statusText);
  }
  document.location.replace('/comment');
};
    document
    .querySelector('#update')
    .addEventListener('submit', updateFormHandler);

async function deleteFormHandler(event) {
  event.preventDefault();
  event.preventDefault();

  const title = "test";
  const content = "test";
  
  if (title && content) {
    const response = await fetch('/api/comment/delete/', {
      method: 'DELETE',
      body: JSON.stringify({ }),
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
  .querySelector('#delete')
  .addEventListener('click', deleteFormHandler);

