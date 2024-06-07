document.addEventListener("DOMContentLoaded", function() {
    const uploadForm = document.getElementById('upload-form');
    const photoInput = document.getElementById('photo-input');
    const photoDescription = document.getElementById('photo-description');
    const gallery = document.getElementById('gallery');
    const searchInput = document.getElementById('search-input');

    uploadForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const formData = new FormData();
        formData.append('photo', photoInput.files[0]);
        formData.append('description', photoDescription.value);

        fetch('http://localhost:3000/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            addPhotoToGallery(data.filename, data.description);
            photoInput.value = '';
            photoDescription.value = '';
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    searchInput.addEventListener('input', function() {
        const query = searchInput.value.toLowerCase();
        const photos = document.querySelectorAll('.photo-item');

        photos.forEach(photo => {
            const description = photo.querySelector('p').textContent.toLowerCase();
            if (description.includes(query)) {
                photo.style.display = '';
            } else {
                photo.style.display = 'none';
            }
        });
    });

    function addPhotoToGallery(filename, description) {
        const photoItem = document.createElement('div');
        photoItem.className = 'photo-item';

        const img = document.createElement('img');
        img.src = `http://localhost:3000/${filename}`;
        photoItem.appendChild(img);

        const desc = document.createElement('p');
        desc.textContent = description;
        photoItem.appendChild(desc);

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
            photoItem.style.animation = 'fadeOut 0.5s ease-in-out';
            photoItem.addEventListener('animationend', function() {
                gallery.removeChild(photoItem);
            });
        });
        photoItem.appendChild(deleteButton);

        gallery.appendChild(photoItem);
    }
});
