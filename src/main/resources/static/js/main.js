let notesAPI = Vue.resource('/notes{/id}');

Vue.component('message-row',{
    props: ['message'],
    template: '<p class="col-lg-3 col-md-4 col-sm-6 col-xs-12 card btn btn-dark bg-dark testButton">{{ message.id }} {{message.title}}<br/>{{ message.description }}</p>'
})
Vue.component('messages-list', {
    props: ['messages'],
    template: '<div><message-row v-for="message in messages" :key="message.id" :message="message"/></div>',
    created: function (){
        notesAPI.get().then(result =>
            result.json().then(data =>
                data.forEach(message => this.messages.push(message))
            )
        )
    }
})

var app = new Vue({
    el: '#app',
    template: '<messages-list :messages="messages"/>',
    data: {
        messages: []
    }
})