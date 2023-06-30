// Client facing scripts here

$(() => {

  const getNewItemRow = (item) => {
    const $newItem = `
    <a style="text-decoration: none;" href="/items/${item.id}">
      <article class="new_item">
        <span>
          <img class="new_item_photo" alt="new-item-photo" src=${item.photo}/>
        </span>
        <span class="name_price">
          <h4 class="new_item_name">${item.name}</h4>
          <h4 class="new_item_price">${item.price} CAD</h4>
          <p class="new_item_description">${item.description}</p>
        </span>
      </article>
    </a>
    `
    return $newItem;
  }

  const getNewMirrors = () => {
    $.ajax({
      type: 'GET',
      url: 'items/new_items'
    })
    .done((response) => {
      const $newItemsList = $(".new_items");

      for(const item of response) {
        $newItemsList.append(getNewItemRow(item))
      }
    });
  }

  getNewMirrors();
  $(".filter").click(() => {
    const min_price = parseInt($('#min').val())
    const max_price = parseInt($('#max').val());

    if (min_price || max_price) {
      $.ajax({
        type: 'GET',
        url: '/items',
        data: {
          "min_price": min_price,
          "max_price": max_price
        },
      })
      .done((response) => {
        const $itemsList = $('.items_container');
        $itemsList.empty();

        for(const item of response) {
         $itemsList.append(getItemRow(item))
        }
      });
    }
  })

  const getItemRow = (item) => {
    const $item = `
    <a style="text-decoration: none;" href="/items/${item.id}">
      <article class="item">
        <span id="item_photo_container">
        <img class="item_photo" alt="item-photo" src=${item.photo}/>
        </span>
        <span class="name_price">
          <h3 class="item_name">${item.name}</h3>
          <p class="item_price">${item.price} CAD</p>
        </span>
      </article>
    </a>
      `
      return $item;
  }

  const getAllMirrors = () => {
    $.ajax({
      type: 'GET',
      url: '/items'
    }) // need an event handler or a callback once done calling the function
    .done((response) => {
      const $itemsList = $('.items_container');
      $itemsList.empty();

      // // I want to use query to fetch the items not a loop. is it possible?
      for(const item of response) {
       $itemsList.append(getItemRow(item))
      }
    });
  }
  getAllMirrors();

});
