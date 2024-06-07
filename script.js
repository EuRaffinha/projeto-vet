document.addEventListener("DOMContentLoaded", function() {
    const uploadForm = document.getElementById('upload-form');
    const photoInput = document.getElementById('photo-input');
    const photoDescription = document.getElementById('photo-description');
    const gallery = document.getElementById('gallery');
    const searchInput = document.getElementById('search-input');

    uploadForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const file = photoInput.files[0];
        const description = photoDescription.value;

        if (file && description) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const photoUrl = e.target.result;
                addPhotoToGallery(photoUrl, description);
                photoInput.value = '';
                photoDescription.value = '';
            }
            reader.readAsDataURL(file);
        }
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

    function addPhotoToGallery(photoUrl, description) {
        const photoItem = document.createElement('div');
        photoItem.className = 'photo-item';

        const img = document.createElement('img');
        img.src = photoUrl;
        photoItem.appendChild(img);

        const desc = document.createElement('p');
        desc.textContent = description;
        photoItem.appendChild(desc);

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
            gallery.removeChild(photoItem);
        });
        photoItem.appendChild(deleteButton);

        gallery.appendChild(photoItem);
    }
});
