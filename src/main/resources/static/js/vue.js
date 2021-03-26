let notesAPI = Vue.resource('/notes{/id}');

/*в компонентах принято через функцию data: function{}*/
//вывод элементов в div (метод get)
Vue.component('message-row',{
    props: ['message'],
    template: '<a class="col-lg-3 col-md-4 col-sm-6 col-xs-12 card btn btn-dark bg-dark testButton">' +
                '<p>{{message.id}}</p>' +
                '<p>{{message.title}}</p>' +
                '<p>{{message.description}}</p></a>'
})
Vue.component('messages-list', {
    props: ['messages'],
    template: '<div class="row">' +
        '<message-row v-for="message in messages" :key="message.id" :message="message"/></div>'
})

new Vue({
    el: '#notes_list',
    /*:messages - любое название параметра что передаем*/
    template: '<messages-list :messages="messages"/>',
    data: {
        messages: []
    },
    /*выполнение после создания экз Vue*/
    created: function (){
        notesAPI.get().then(result =>
            result.json().then(data =>
                data.forEach(message => this.messages.push(message))
            )
        )
    }
})
//вывод элементов в div (метод get)
let form = new Vue({
    el: '#form',
    data: {
        title: '',
        description: ''
    },
    template: '<div id="target" class="bg-dark card">' +
        '<input v-model="title" class="btn btn-dark note-title" type="text" placeholder="Input a title..."/>' +
        '<textarea v-model="description" class="btn btn-dark" wrap="soft" placeholder="Input a description"></textarea></div>',
    methods: {
        save: function (){
            let message = {title: this.title, description: this.description};
            notesAPI.save({}, message).then(result =>{
                    console.log(result)
                    window.location.reload();
                }
            )
        }
    }
})