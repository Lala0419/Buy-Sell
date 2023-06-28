$(() => {

  $(".container").find(".fa-heart").on('click', (event) => {
    console.log("heart clicked", event.target);
    $(event.target).toggleClass('red-color');

    const itemId = $(event.target).data("item")

    if ($(event.target).hasClass('red-color')) {
      $.ajax({
        type: 'POST',
        url: `/favorites/${itemId}`
      })
      .done((response) => {
        console.log(response);
      })
    } else {
       console.log("heart has no red")
      $.ajax({
        type: 'POST',
        url: `/favorites/${itemId}/delete`
      })
      .done((response) => {
        console.log(response);
    })
  }
  })

  $(() => {
    $(".item").find(".fa-circle").on('click', (event) => {
      console.log("status changed", event.target);
      $(event.target).toggleClass('green-color');

      const itemId = $(event.target).data("item-id")
      const itemStatus = $(event.target).data("item-status")
      const itemStatusMessage = $("#itemStatusMessage")

      console.log(
        "jQuery console.log", itemId,
        typeof itemStatus,
        "itemStatusMessage", itemStatusMessage);

      if ($(event.target).hasClass('green-color')) {
        itemStatusMessage.text("Available")
        $.ajax({
          type: 'POST',
          url: `/items/${itemId}/status`,
          data: { itemId, itemStatus }
        })
        // .done((response) => {
        //   console.log("item available", response);
        // })

      } else {
        itemStatusMessage.text("Unavailable")
        $.ajax({
          type: 'POST',
          url: `/items/${itemId}/status`,
          data: { itemId, itemStatus }
        })
        // .done((response) => {
        //   console.log("item unavailable", response);
        // })
    }


    })
  })

})



