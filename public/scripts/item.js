$(() => {
  $(".container").find(".fa-heart").on('click', () => {
    $(".fa-heart").toggleClass('red-color');

    if ($(".fa-heart").hasClass('red-color')) {
      $.ajax({
        type: 'POST',
        url: '/items',
        data: { item } // is this right?
      })
      .done((item) => {
        console.log(response);
        // I need to send the item data to the server as part of the favourites data.
        // how do I send the data where to?
      })
    }
  })
})



