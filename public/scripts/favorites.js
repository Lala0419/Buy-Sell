function fetchFavorites() {
  $.ajax({
    method: 'GET',
    url: '/api/favorites'
  })
    .done(response => {
      const $favoritesList = $('#favorites');
      $favoritesList.empty();

      for (const item of response.favoriteItems) {
        const $item = $('<div>').addClass('favorite-item');// <-- may need to update
        $('<h3>').text(item.item_name).appendTo($item);
        $('<p>').text(item.item_price).appendTo($item);
        $('<p>').text(item.item_description).appendTo($item);

        // Heart button to remove favorite item
        const $removeButton = $('<button>') // <-- need to update
          .addClass('remove-favorite')
          .text('Remove')
          .appendTo($item);

        $favoritesList.append($item);
      }
    })
    .fail(err => {
      console.error(err);
    });
}

$(document).ready(() => {
  fetchFavorites();
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
