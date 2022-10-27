const newFormHandler = async (event) => {
    event.preventDefault();
    const name = document.querySelector('#blogentry-name').value.trim();
    const post_content = document.querySelector('#blogentry-desc').value.trim();
    if (name && post_content) {
      const response = await fetch(`/api/blogentry`, {
        method: 'POST',
        body: JSON.stringify({ name, post_content }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to create post!');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
      const response = await fetch(`/api/blogentry/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        document.location.replace('/blogentry');
      } else {
        alert('Failed to delete post!');
      }
    }
  };
  
  document
    .querySelector('.new-blogentry-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.delete-entry')
    .addEventListener('click', delButtonHandler);