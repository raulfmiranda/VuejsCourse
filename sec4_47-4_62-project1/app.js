new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameStarted: false,
        turns: []
    },
    computed: {
        healthBarStyle: function () {
            return {
                backgroundColor: 'green',
                margin: 0,
                color: 'white'
            };
        }
    },
    methods: {
        attack: function (event) {

            let maxPlayerHit = 10;
            let minPlayerHit = 3;
            if (event.target.id.includes('special')) {
                maxPlayerHit = 20;
                minPlayerHit = 11;
            }

            const playerHit = this.calculateDamage(minPlayerHit, maxPlayerHit); 
            const monsterHit = this.calculateDamage(5, 12);

            if(this.checkWin(playerHit, monsterHit)) {
                return;
            }

            if (this.playerHealth > 0) {
                this.playerHealth -= monsterHit;
            }

            if (this.monsterHealth > 0) {
                this.monsterHealth -= playerHit;
            }

            this.turns.unshift({ text: "PLAYER HITS MONSTER FOR " + playerHit, isPlayer: true });
            this.turns.unshift({ text: "MONSTER HITS PLAYER FOR " + monsterHit, isPlayer: false });
        },
        heal: function () {

            const playerHeal = 10;
            const maxMonsterHit = 12;
            const minMonsterHit = 5;
            const monsterHit = this.calculateDamage(minMonsterHit, maxMonsterHit); 
            const gap = monsterHit - playerHeal;

            if (this.playerHealth < gap) {
                this.playerHealth = 0;
                this.setInitialState();
            } else if (this.playerHealth - monsterHit + playerHeal > 100) {
                this.playerHealth = 100;
            } else {
                this.playerHealth -= gap;
            }
            this.turns.unshift({ text: "PLAYER HEALS HIMSELF FOR " + playerHit, isPlayer: true });
            this.turns.unshift({ text: "MONSTER HITS PLAYER FOR " + monsterHit, isPlayer: false });
        },
        setInitialState: function () {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.gameStarted = true;
            this.turns = [];
        },
        calculateDamage: function (min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        },
        checkWin: function (playerHit, monsterHit) {
            if (this.monsterHealth < playerHit) {
                this.monsterHealth = 0;
                const ok = confirm('You win! New Game?');
                if (ok) {
                    this.setInitialState();
                }
                this.gameStarted = false;
                return true;
            } else if (this.playerHealth < monsterHit) {
                this.playerHealth = 0;
                const ok = confirm('You lost! New Game?');
                if (ok) {
                    this.setInitialState();
                }
                this.gameStarted = false;
                return true;
            } else {
                return false;
            }
        }
    }
});