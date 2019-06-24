var data = {
    title: 'The VueJS Instance',
    showParagraph: false
};

// Vue component replaces all tags <hello>
// Vue default instance would replace only the first one <hello>
Vue.component('hello', {
    template: '<h1>Hello Component!</h1>'
});

// vm - Vue Model
var vm1 = new Vue({
    data: data,
    methods: {
        show: function () {
            this.showParagraph = true;
            this.updateTitle('The VueJS Instance (Updated)');
            console.log(this.$refs);
            this.$refs.myButton.innerText = 'Test';          
        },
        updateTitle: function (title) {
            this.title = title;
        },
        destroy: function() {
            this.$destroy();
        }
    },
    beforeCreate: function() {
        console.log('beforeCreate()');
    },
    created: function() {
        console.log('created()');
    },
    mounted: function() {
        console.log('mounted()');
    },
    beforeUpdate: function() {
        console.log('beforeUpdate()');
    },
    updated: function() {
        console.log('updated()');
    },
    beforeDestroy: function() {
        console.log('beforeDestroy()');
    },
    destroyed: function() {
        console.log('destroyed()');
    },
    computed: {
        lowercaseTitle: function () {
            return this.title.toLowerCase();
        }
    },
    watch: {
        title: function (value) {
            // alert('Title changed, new value: ' + value);
            console.log('Title changed, new value: ' + value);
        }
    }
});

vm1.$mount('#app1');

// ###########################################################

setTimeout(function() {
    vm1.title = 'Changed by Timer';
}, 3000);

vm1.newProp = "New Prop - Not a real property. There is no GET and SET.";
console.log(vm1.$data.title);

// ###########################################################

var vm2 = new Vue({
    el: '#app2',
    data: {
        title: 'The Second Instance'
    },
    methods: {
        onChange: function() {
            vm1.title = 'Changed!';
        }
    }
});

var vm3 = new Vue({
    template: '<h1>Hello!</h1>'
});

// vm3.$mount('#app3'); OR
vm3.$mount();
document.getElementById('app3').appendChild(vm3.$el);
