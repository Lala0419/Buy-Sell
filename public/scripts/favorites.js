$(document).ready(() => {

  $(".contact-button").on('click', (event) => {
    const itemId = $(event.target).data("item");
    window.location.replace(`http://localhost:8080/messages/${itemId}`);
});

});

$(document).on('click', '.remove-favorite', function () {
  const $item = $(this).closest('.favorite-item');
  const itemId = $item.data('id');

  $.ajax({
    method: 'DELETE',
    url: `/api/favorites/${itemId}`
  })
    .done(() => {
      $item.remove();
    })
    .fail(err => {
      console.error(err);
    });

});
