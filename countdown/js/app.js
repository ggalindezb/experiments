const SECONDS_PER = {
  DAY: 86400,
  HOUR: 3600,
  MINUTE: 60
}

new Vue({
  el: '#app',
  data: {
    elapsed: 172800
  },
  computed: {
    time: function() {
      var current = this.elapsed;

      var days = Math.floor(current / SECONDS_PER.DAY);
      current = current % SECONDS_PER.DAY;

      var hours = Math.floor(current / SECONDS_PER.HOUR);
      current = current % SECONDS_PER.HOUR;

      var minutes = Math.floor(current / SECONDS_PER.MINUTE);
      var seconds = current % SECONDS_PER.MINUTE;

      return {
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
      };
    }
  },
  methods: {
    start: function() {
      var vm = this;
      setInterval(function() {
        vm.elapsed -= 1;
      }, 1000);
    }
  }
});
