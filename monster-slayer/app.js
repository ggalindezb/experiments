new Vue({
  el: '#app',
  data: {
    player: {
      title: 'Player',
      hp: 0
    },
    monster: {
      title: 'Monster',
      hp: 0
    },
    events: []
  },
  computed: {
    ongoing: function() {
      return this.player.hp > 0 && this.monster.hp > 0;
    },
    playerHealthBar: function() {
      return {
        backgroundColor: 'green',
        margin: 0,
        color: 'white',
        width: this.player.hp + '%'
      };
    },
    monsterHealthBar: function() {
      return {
        backgroundColor: 'green',
        margin: 0,
        color: 'white',
        width: this.monster.hp + '%'
      };
    }
  },
  methods: {
    newGame: function() {
      this.player.hp = 100;
      this.monster.hp = 100;
      this.events = [];
    },
    turn: function(method) {
      if(this.ongoing) {
        this.playerTurn(method);
        this.monsterTurn();
      }
    },
    playerTurn: function(method) {
      switch (method) {
        case 'attack':
          this.attack(this.monster);
          break;
        case 'specialAttack':
          this.specialAttack(this.monster);
          break;
        case 'heal':
          this.heal(this.player);
          break;
        case 'giveUp':
          this.giveUp();
          break;
      }
    },
    monsterTurn: function() {
      var random = Math.random();

      if(random <= 0.65) {
        this.attack(this.player);
      } else if(random > 0.65 && random <= 0.8) {
        this.specialAttack(this.player);
      } else {
        this.heal(this.monster);
      }
    },
    attack: function(target) {
      var critical = this.critical();
      var points = this.points();
      points = critical ? Math.ceil(points) + 2 : Math.floor(points);

      if(target.hp - points < 0) {
        target.hp = 0;
      } else {
        target.hp -= points;
      }

      this.events.push({
        target: target.title,
        action: 'attack',
        points: points,
        chance: critical
      });
    },
    specialAttack: function(target) {
      var luck = this.luck();
      var points = luck ? this.points() * 2 : this.points() / 2;
      points = Math.ceil(points);

      if(target.hp - points < 0) {
        target.hp = 0;
      } else {
        target.hp -= points;
      }

      this.events.push({
        target: target.title,
        action: 'specialAttack',
        points: points,
        chance: luck
      });
    },
    heal: function(target) {
      var points = Math.ceil(this.points());

      if(target.hp + points > 100) {
        target.hp = 100;
      } else {
        target.hp += points;
      }

      this.events.push({
        target: target.title,
        action: 'heal',
        points: points,
        chance: null
      });
    },
    giveUp: function () {
      this.player.hp = 0;
      console.log('Player gives up');
      this.events.push({
        target: this.player.title,
        action: 'giveUp',
        points: null,
        luck: null
      });
    },
    luck: function() {
      return Math.random() > 0.5;
    },
    critical: function() {
      return Math.random() > 0.7;
    },
    points: function() {
      return Math.random() * 10;
    }
  }
});
