// Client facing scripts here

$(() => {

  const getNewItemRow = (item) => {
    const $newItem = `
    <article class="new_item">
      <span>
        <img class="new_item_photo" alt="new-item-photo" src=${item.photo}/>
      </span>
      <span class="name_price">
        <h4 class="new_item_name">${item.name}</h4>
        <h4 class="new_item_price">${item.price}</h4>
        <p class="new_item_description">${item.description}</p>
      </span>
    </article>
    `
    return $newItem;
  }

  const getNewMirrors = () => {
    $.ajax({
      type: 'GET',
      url: 'items/new_items'
    })
    .done((response) => {
      console.log('response', response);
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
        console.log(response);
        const $itemsList = $('.items_container');
        $itemsList.empty();

        for(const item of response) {
         $itemsList.append(getItemRow(item))
        }
      });
    }

    console.log(min_price, max_price)
  })

  const getItemRow = (item) => {
    const $item = `
      <article class="item">
      <span>
        <img class="item_photo" alt="item-photo" src=${item.photo}/>
      </span>
      <span class="name_price">
        <h3 class="item_name">${item.name}</h3>
        <p class="item_price">${item.price} CAD</p>
      </span>

      </article>
      `
      return $item;
  }

  const getAllMirrors = () => {
    $.ajax({
      type: 'GET',
      url: '/items'
    }) // need an event handler or a callback once done calling the function
    .done((response) => {
      console.log(response);
      const $itemsList = $('.items_container');
      $itemsList.empty();

      // // I want to use query to fetch the items not a loop. is it possible?
      for(const item of response) {
       $itemsList.append(getItemRow(item))
      }
    });
  }
  getAllMirrors();
})

// Where does my ajax' get request go? or the html?

//.load(".items_container")
/*
$(() => {
  // min & max boxes should be empty?
  $('#filter').on('click', () => {
    $.ajax({
      method: 'GET',
      url: '/api/items' // why is there api/?? where is this coming from?
    })
    .done((response) => {
      const $itemsList = $('.items_container');
      // $itemsList.empty();

      // I want to use query to fetch the items not a loop. is it possible?
      for(const item of response.items) {
        $(`<li class="user">`).text(user.name).appendTo($usersList);
      }
    });
  });
});



// How to connect it to the query data? I dont want to loop.
const $item = `
<article class="item">
<span>
  <img class="item_photo" alt="item-photo" src=${item.photo}/>
</span>
<span class="name_price">
  <header class="item_name">${item.name}</header>
  <h3 class="item_price">${item.price}</h3>
</span>

</article>
`

const $newItem = `
<article class="new_item">
  <span>
    <img class="new_item_photo" alt="new-item-photo" src=${item.photo}/>
  </span>
  <span class="name_price">
    <h4 class="new_item_name">${item.name}</h4>
    <h4 class="new_item_price">${item.price}</h4>
    <p class="new_item_description">${item.description}</p>
  </span>
</article>
`
*/
