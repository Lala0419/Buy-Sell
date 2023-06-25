// $(() => {
// 	$("#messagesForm").on("submit", (event) => {
// 		event.preventDefault();
// 		$.ajax({
// 			method: "GET",
// 			url: "/messages",
// 		}).done((response) => {
// 			console.log("response:", response.data);
// 			const $messagesList = $("#messages");
// 			$messagesList.empty();

// 			for (const message in response.messages) {
// 				$(`<li class="user">`).text(user.name).appendTo($messagesList);
// 			}
// 		});
// 	});
// });
