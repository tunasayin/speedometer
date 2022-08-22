let lastGear = null;

window.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("message", async (e) => {
    if (e.data.action == "show") {
      $(".container").removeClass("hidden");

      let speed = e.data.isMetric
        ? e.data.speed * 3.6
        : e.data.speed * 2.236936;
      let measurementType = e.data.isMetric ? "kph" : "mph";
      let rpm = e.data.rpm * 100;

      $(".speed").text(speed.toFixed(0));
      $(".measurementType").text(measurementType);
      $(".rpm").css("width", `${rpm}%`);

      if (rpm >= 50 && rpm <= 80) {
        $(".rpm").css("background-color", "#f77a2d");
      } else if (rpm > 80) {
        $(".rpm").css("background-color", "#e04141");
      } else $(".rpm").css("background-color", "");
    } else if (e.data.action == "hide") {
      $(".container").addClass("hidden");
    }

    if (e.data.gear !== lastGear && !isNaN(e.data.gear)) {
      $(".gear").remove();

      $(".container").append(`<div class="gear">${e.data.gear}</div>`);

      lastGear = e.data.gear;
    }
  });
});
