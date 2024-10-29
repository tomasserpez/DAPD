import { Component, OnInit, Input } from '@angular/core';
import { ListaService} from "../../services/lista.service";
import {Lista} from "../../models/lista.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent  implements OnInit {

  @Input() tipo:string = '';

  constructor(
    public listaService: ListaService,
    private router: Router
  ) { }
  async AgregarLista(){
    let alerta = await this.listaService.alertController.create({
      header: "Agregar lista",
      inputs: [
        {
          type: "text",
          name: "titulo",
          placeholder: "Ingresar nombre de la lista"
        }
      ],
      buttons: [
        {
          text: "Cancelar",
          role: "cancel"
        },
        {
          text: "Crear",
          handler: (data:any)=>{
            let esValido: boolean = this.listaService.validarInput(data);
            if(esValido){
              let creadaOk = this.listaService.crearLista(data.titulo);
              if(creadaOk){
                this.listaService.presentToast("Lista creada correctamente!");
              }
            }
          }
        }
      ]
    })

    await alerta.present();
    console.log("Hola mundo!");
  }
  async editarLista(listaItem: Lista){
    let alerta = await this.listaService.alertController.create({
      header: "Editar lista",
      inputs: [
        {
          type: "text",
          name: "titulo",
          placeholder: "Ingresar nombre de la lista",
          value: listaItem.titulo
        }
      ],
      buttons:[
        {
          text:"Cancelar",
          role: "cancel"
        },
        {
          text: "Editar",
          handler: (data:any)=>{
            let esValido: boolean = this.listaService.validarInput(data);
            if(esValido){
              listaItem.titulo = data.titulo;
              this.listaService.editarLista(listaItem);
              this.listaService.presentToast("Lista editada correctamente!");
            }
          }
        }
      ]
    })

    await alerta.present();
  }

  eliminarLista(listaItem: Lista){
    this.listaService.eliminarLista(listaItem);
    console.log("Eliminar lista:", listaItem);
  }

  listaSeleccionada(listaItem: Lista){
    const URL = '/agregar/' + listaItem.id
    this.router.navigateByUrl(URL);
  }

  ngOnInit() {}

}
