import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from '../shared/breadcrumb.service';
import {TirillasService} from '../_services/tirillaservice';
import {SelectItem} from '../_models/selectItem';
import {Message} from 'primeng/components/common/message';
import {MessageService} from 'primeng/components/common/messageservice';

@Component({
             templateUrl: './profile.component.html',
             providers: [MessageService]
           })
export class ProfileComponent implements OnInit {

  basicos: Array<any>;
  contacto: Array<any>;
  departamentos: Array<SelectItem>;
  ciudades: Array<SelectItem>;
  tipossangre: Array<SelectItem>;
  genero: Array<SelectItem>;
  msgs: Message[] = [];

  constructor(private tirillasService: TirillasService,
              private breadcrumbService: BreadcrumbService,
              private messageService: MessageService) {
    this.breadcrumbService.setItems([
                                      { label: 'Mi Perfil' }
                                    ]);

    this.genero = [
      {label:'Select City', value:null},
      {label:'Masculino', value:1},
      {label:'Femenino', value:2}
    ];
  }

  ngOnInit() {
    this.tirillasService.getDepartamentos()
    .subscribe(data => {
      this.departamentos = data;
      this.departamentos.map(s => {
        s['value'] = s['id'];
      });
      console.info(this.departamentos);
    });
    this.tirillasService.getTipodesangre()
    .subscribe(data => {
      this.tipossangre = data;
      this.tipossangre.map(s => {
        s['value'] = s['id'];
      });
    });
    this.tirillasService.getDatosbasicos()
    .subscribe(data => {
      this.basicos = data;
      const departamento = this.basicos.find(r => r.id === 'asodepartamentodomicilio').value;
      this.tirillasService.getCiudades(departamento)
      .subscribe(data => {
        this.ciudades = data;
        this.ciudades.map(s => {
          s['value'] = s['id'];
        });
        console.info(this.ciudades);
      });
    });
    this.tirillasService.getDatoscontacto()
    .subscribe(data => {
      this.contacto = data

    });
  }

  save() {
    let datos = {};
    this.basicos.map(d => {
      datos[d.id] = d.value;
    });
    this.contacto.map(d => {
      datos[d.id] = d.value;
    });
    this.tirillasService.save(datos)
    .subscribe( data => {
      if(data.response){
        this.addMessage('success')
      }else {
        this.addMessage('warn')
      }
    }, error =>{
      this.addMessage('error')
    });
  }

  addMessage(type: string) {
    if(type === 'success'){
      this.messageService.add({severity:'success', summary:'Exito!!', detail:'Registro actualizado con exito'});
    }
    if(type === 'warn'){
      this.messageService.add({severity:'warn', summary:'Información!!', detail:'No se realizaron cambios'});
    }
    if(type === 'error'){
      this.messageService.add({severity:'error', summary:'Error', detail:'Error al guardar'});
    }

  }
}

