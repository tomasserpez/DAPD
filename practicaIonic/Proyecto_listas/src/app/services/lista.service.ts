import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model'
import {AlertController, ToastController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class ListaService {

  public listas: Lista[] = []; // Almacena las listas de actividades
  constructor(
    public alertController: AlertController,
    public toastController: ToastController,) {
    this.cargarStorage();
  }

  crearLista(nombreLista: string){
    let ObjetoLista = new Lista(nombreLista);

    this.listas.push(ObjetoLista); // Ingresamos en el array de listas el objeto con los datos creados
    this.guardarStorage();
    return ObjetoLista.titulo;
  }

  guardarStorage(){
    let stringListas: string = JSON.stringify(this.listas); // Convertimos el array de listas en texto plano
    localStorage.setItem('listas', stringListas); //Se debe ingresar dos parámetros, el primero el nombre y el segundo el contenido (key, value)
  }

  cargarStorage(){
    const listaStorage = localStorage.getItem('listas'); // Se debe ingresar el parámetro con el nombre del objeto que queremos recuperar

    if(listaStorage === null) {
      return this.listas = []; // Si el storage está vacio devolvemos el objeto listas vacío tambien
    }
    else{
      let objLista = JSON.parse(listaStorage);//Convierte el texto plano a objeto para poder ingresarlo
      return this.listas = objLista;
    }
  }

  eliminarLista(lista: Lista){
    let nuevoListado = this.listas.filter((listaItem) => listaItem.id !== lista.id); //Guardamos todas las listas menos la lista a eliminar
    this.listas = nuevoListado;
    this.guardarStorage();
  }

  editarLista(lista: Lista){
    let listaEditar = this.listas.find((listaItem) => listaItem.id == lista.id); //Guardamos todas las listas a editar
    if(listaEditar){
      listaEditar.titulo = lista.titulo;
    }
    this.guardarStorage();
  }

  /**
   * @function validarInput
   * @description La funcion valida que se haya ingresado un valor dentro de la funcion padre.
   *
   * @param input any datatype
   * @return boolean true para valor valido, false para valor invalido
   */
  validarInput(input: any): boolean {
    if(input&&input.titulo){
      return true;
    }
    this.presentToast("Debe ingresar un valor");
    return false;
  }

  async presentToast(mensaje:string){
    let toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

  obtenerLista(idLista: string|number){
    const id = Number(idLista);
    let lista = this.listas.find((itemLista)=> itemLista.id == id);

    return lista;
  }

}
