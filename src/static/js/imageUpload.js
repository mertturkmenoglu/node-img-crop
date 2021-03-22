window.onload = () => {
  const imageInput = document.getElementById('imageInput');
  const imagePreview = document.getElementById('imagePreview');
  const uploadBtn = document.getElementById('uploadBtn');

  let cropper;

  // Do not change to arrow function (ES6 function)
  imageInput.addEventListener('change', function (event) {
    if (this.files && this.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        if (cropper !== undefined) {
          cropper.destroy();
        }

        imagePreview.src = e.target.result;
        cropper = new Cropper(imagePreview, {
          aspectRatio: 1 / 1,
          background: false,
        });
      }
      reader.readAsDataURL(this.files[0]);
    }
  });

  uploadBtn.onclick = (event) => {
    event.preventDefault();
    if (cropper === undefined) return;

    const canvas = cropper.getCroppedCanvas();

    if (!canvas) {
      return;
    }

    canvas.toBlob((blob) => {
      const formData = new FormData();
      formData.append("image", blob);

      $.ajax({
        url: "/image-upload",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: () => location.reload()
      });
    });
  }
}