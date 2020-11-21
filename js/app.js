import home from '/js/controllers/home.js';
import {register, registerPost, login, loginPost, logout, profile} from '/js/controllers/user.js';
import {create, createPost, details, editItem, editPost, deleteItem, catalog} from '/js/controllers/events.js';


window.addEventListener('load', () =>{
    const app = Sammy('#container', function(){
        this.use('Handlebars', 'hbs');

        this.userData = {
            username : localStorage.getItem('username') || '',
            userId : localStorage.getItem('userId') || ''
        }

        this.get('/', home);
        this.get('/index.html', home);
        this.get('/indexExam.html', home);
        this.get('#/home', home);

        this.get('#/register', register);

        this.get('#/login', login);

        this.get('#/create', create);
        this.get('#/logout', logout);
        this.get('#/profile', profile);

        this.get('#/edit/:id', editItem);
        // this.get('#/join/:id', join);

        this.get('#/catalog', catalog);

 
        
        this.get('#/details/:id', details);
        


        this.post('#/register', ctx => {registerPost.call(ctx);});
        this.post('#/login', ctx => {loginPost.call(ctx);});

        this.post('#/create', ctx => {createPost.call(ctx);});
        this.post('#/edit/:id', ctx => {editPost.call(ctx);});
        
        this.get('#/delete/:id', deleteItem);

    });

    app.run();


})