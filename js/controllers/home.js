import {getItems} from '../data.js';

export default async function home() {
    this.partials = {
        header: await this.load('../../templates/header.hbs'),
        notLogged: await this.load('../../templates/notLogged.hbs'),
        catalog: await this.load('../../templates/catalog.hbs'),
        footer: await this.load('../../templates/footer.hbs'),
        event: await this.load('../../templates/item.hbs')
    }
    
    if(!this.app.userData.username) {
        this.partial('../templates/notLogged.hbs', this.app.userData);
        return;
    }
    
    let items = await getItems();
    
    if(items.length === 0){
        this.partial('../templates/nothing.hbs', this.app.userData);
        return;
    }
    let context = Object.assign({}, this.app.userData);
    context.items = items;

    this.partial('../templates/catalog.hbs', context);
    
    
  
        

    
    
}