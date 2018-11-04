$(function () {
  $(".change-devoured").on("click", function (event) {
    event.preventDefault();

    const id = $(this).data("id");
    const newDevoured = $(this).data("devoured");
    const newDevouredState = {
      devoured: newDevoured
    };

    $.ajax(`/api/burgers/ ${id}`, {
      type: "PUT",
      data: newDevouredState
    }).then(
      function () {
        console.log("Changed 'Devoured' state:", newDevoured);
        location.reload();
      }
    );
  });

  $(".delete-burger").on("click", function (event) {
    event.preventDefault();

    const id = $(this).data("id");

    $.ajax(`/api/burgers/${id}`, {
      type: "DELETE"
    }).then(
      function () {
        console.log("Deleted Burger: ", id);
        location.reload();
      }
    );
  });

  $(".create-form").on("submit", function (event) {
    event.preventDefault();

    var newCat = {
      name: $("#ca").val().trim(),
      sleepy: $("[name=sleepy]:checked").val().trim()
    };

    $.ajax("/api/cats", {
      type: "POST",
      data: newCat
    }).then(
      function () {
        console.log("created new cat");
        location.reload();
      }
    );
  });
});
