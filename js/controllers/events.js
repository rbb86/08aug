import { showError, showInfo } from '../notification.js';
import {createItem, getItemById, updateItem, deleteItem as deleteApi, getItems} from '../data.js'



export async function catalog() {
    this.partials = {
        header: await this.load('../../templates/header.hbs'),
        footer: await this.load('../../templates/footer.hbs')
    };

    let items = await getItems();
    let context = Object.assign({}, this.app.userData);
    context.items = items;

    this.partial('../templates/catalog.hbs', context);

}




export async function create() {
    this.partials = {
        header: await this.load('../../templates/header.hbs'),
        footer: await this.load('../../templates/footer.hbs')
    };

    this.partial('../../templates/create.hbs', this.app.userData)

}


export async function createPost() {

    try{
        if(this.params.name.length < 6){
            throw new Error('Name must be at least 6 characters long');
        }

        if(this.params.dateTime.length == 0){
            throw new Error('Enter a date');
        }

        if(this.params.description.length < 10){
            throw new Error('Description must be at least 6 characters long');
        }

        if(this.params.imageURL.indexOf('http://') !=0 && this.params.imageURL.indexOf('https://') !=0){
            throw new Error('The image url should start with http:// or https://');
        }


        
        const event = {
            data: this.params.dateTime,
            description: this.params.description,
            image: this.params.imageURL,
            name: this.params.name,
            interested: 0,
            organizer: this.app.userData.username
        };

        const result = await createItem(event);
        if(result.hasOwnProperty('errorData')){
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }
        showInfo('Event created');
        this.redirect('/');

    }catch(err){
        console.log(err);
        showError(err.message);
    }
}


export async function details() {
    this.partials = {
        header: await this.load('../../templates/header.hbs'),
        footer: await this.load('../../templates/footer.hbs')
    };

    let items = await getItemById(this.params.id)
    items.isOwner = items.organizer === this.app.userData.username ? true : false;
    Object.assign(event, this.app.userData)


    this.partial('../../templates/details.hbs', event)

}

export async function editItem() {
    this.partials = {
        header: await this.load('../../templates/header.hbs'),
        footer: await this.load('../../templates/footer.hbs')
    };
    let currentItem = await getItemById(this.params.id)
    Object.assign(currentItem, this.app.userData);

    this.partial('../../templates/editEvent.hbs', currentItem)   
}


export async function editPost() {
    let updated = {data:this.params.data, description:this.params.description, image:this.params.image, name:this.params.name};
    let result = await updateItem(this.params.id, updated);

    this.redirect('#/home');
}

export async function deleteItem() {

    const itemId = this.params.id;

    try{
        const result = await deleteApi(itemId);

        if(result.hasOwnProperty('errorData')){
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }
        showInfo('Event deleted');
        this.redirect('#/home');

    }catch(err){
        console.log(err);
        showError(err.message);
    }



  
}