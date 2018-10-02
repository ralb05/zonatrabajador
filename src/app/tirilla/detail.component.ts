import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from '../shared/breadcrumb.service';
import {TirillasService} from '../_services/tirillaservice';
import {Lists} from '../_models/lists';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
})
export class DetailComponent implements OnInit {

  data: Lists;
  id: string;
  datosBasicos: any;
  deducciones: any;
  ingresos: any;
  constructor(private tirillasService: TirillasService,
              private breadcrumbService: BreadcrumbService,
              private route: ActivatedRoute) {
    this.breadcrumbService.setItems([
      { label: 'Tirillas', routerLink: ['/tirillas'] },
      { label: 'Detalle' }]);
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = (params['id']) ? params['id'] : undefined;
      if (this.id) {
        this.tirillasService.getById(this.id)
        .subscribe(data => {
          this.data = data[0];
          this.datosBasicos = this.data['DATOS BASICOS'];
          this.deducciones = this.data['DEDUCCIONES'];
          this.ingresos = this.data['INGRESOS'];
          console.info(this.datosBasicos);
          console.info(this.datosBasicos['NIT']);
          console.info(this.datosBasicos.NIT);
        });
      }
    });
  }
}
