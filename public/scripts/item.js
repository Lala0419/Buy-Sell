$(() => {

  $.ajax({
      url: `/favorites/${window.location.pathname.split("/")[2]}`,
      success: (response) => {
        if (response.favoriteItems && response.favoriteItems.length > 0) {
          $(".name_heart").find(".fa-heart").toggleClass('red-color');
          console.log("random");
        }
      console.log("ajax get request: favourite", response);
      }
  })


  $(".name_heart").find(".fa-heart").on('click', (event) => {
    $(event.target).toggleClass('red-color');
    console.log("heart clicked", event.target);

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


    // userid = seller_id (if userId = 1)
    // To change the availability status of the item as a seller
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



  // userid = seller_id
  // To remove the item from the listing as a seller
  $("#remove").on('click', (event) => {
    const itemId = $(event.target).data("item-id");
    $.ajax({
      type: 'POST',
      url: `/items/${itemId}/delete`,
      data: { itemId },
      success: ()=> {
        window.location.href = "http://localhost:8080/"
        console.log("response for ajax request");
      }
    })

  })


})



