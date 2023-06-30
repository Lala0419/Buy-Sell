$(document).ready(() => {
  $('#create-item-form').on('submit', function (event) {
    event.preventDefault();

    const form = this;
    const formData = new FormData(form);

    $.ajax({
      method: 'POST',
      url: '/api/items',
      data: formData,
      processData: false,
      contentType: false
    })
      .done(() => {
        // do i need to show a success message?
      })
      .fail(err => {
        console.error(err);
        // do i need to show an error message?
      });
  });
});
