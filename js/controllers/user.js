import {register as apiRegister, getItemsByOwner } from '../data.js';
import {login as apiLogin} from '../data.js';
import {logout as apiLogout} from '../data.js';
import { showError, showInfo } from '../notification.js';

export async function register() {
    this.partials = {
        header: await this.load('../../templates/header.hbs'),
        footer: await this.load('../../templates/footer.hbs')
    }

    this.partial('../../templates/SignUp.hbs', this.app.userData);

} 

export async function registerPost(){

    try{
        if(this.params.username.length < 3){
            throw new Error('Username must be at least 3 characters long');
        }
        if(this.params.password.length < 6){
            throw new Error('Password must be at least 3 characters long');
        }
    
        if(this.params.password !== this.params.rePassword){
            throw new Error('Password don\'t match');
        }
        
        const result = await apiRegister(this.params.username, this.params.password);
        if(result.hasOwnProperty('errorData')){
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

   

        this.app.userData.username = result.username;
        this.app.userData.userId = result.objectId;
        
        sessionStorage.setItem('username', result.username);
        sessionStorage.setItem('userId', result.objectId);

        showInfo('Successfully registered');


        
    
        const result2 = await apiLogin(this.params.username, this.params.password);
        if(result2.hasOwnProperty('errorData')){
            const error = new Error();
            Object.assign(error, result2);
            throw error;
        }
        
        sessionStorage.setItem('userToken', result2['user-token']);
        this.redirect('#/home');
        
        
        
    }catch(err){
        console.log(err);
        showError(err.message);
    }






}

export async function login() {
    this.partials = {
        header: await this.load('../../templates/header.hbs'),
        footer: await this.load('../../templates/footer.hbs')
    }

    this.partial('../../templates/signIn.hbs', this.app.userData);


}

export async function loginPost(){
    
    try{
        const result = await apiLogin(this.params.username, this.params.password);
        if(result.hasOwnProperty('errorData')){
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }
        
        this.app.userData.username = result.username;
        this.app.userData.userId = result.objectId;
        
        this.redirect('#/home');
        showInfo(`Logged in as ${result.username}`)
        
        
    }catch(err){
        console.log(err);
        showError(err.message);
    }
}

export async function logout(){
    
    try{
        const result = await apiLogout();
        if(result.hasOwnProperty('errorData')){
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        
        this.redirect('#/home');
        showInfo('Logged out successful');

        this.app.userData.username = '';
        this.app.userData.userId = '';

    }catch(err){
        console.log(err);
        showError(err.message);
    }
}

export async function profile() {
    this.partials = {
        header: await this.load('../../templates/header.hbs'),
        footer: await this.load('../../templates/footer.hbs'),
        para: await this.load('../../templates/para.hbs')
    }

    let ownEvents = await getItemsByOwner();
    let context = Object.assign({ ownEvents}, this.app.userData)
    context.number = ownEvents.length;


    this.partial('../../templates/profile.hbs', context);

} 