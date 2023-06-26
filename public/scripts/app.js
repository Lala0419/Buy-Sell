// Client facing scripts here


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
