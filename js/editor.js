$(function() {
  $editor_input = $("#editor_input");
  $editor_yield = $("#editor_yield");
  $editor_input.keyup(function() {
    $editor_yield.html($editor_input.val());
  });
});
