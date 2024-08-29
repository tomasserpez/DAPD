import { Component } from '@angular/core';
import { AlertController} from "@ionic/angular";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor( private alertController: AlertController ) {}


  async MostrarConsola(){
    let alerta = await this.alertController.create({
      header: "Ingresar texto",
      inputs: [
        {
          type: "text",
          name: "titulo",
          placeholder: "Ingresar texto deseado"
        }
      ]
    })

    await alerta.present();
    console.log("Hola Mundo!")
  }

}
