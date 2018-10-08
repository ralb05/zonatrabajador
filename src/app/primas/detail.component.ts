import {Component, ElementRef, Renderer2, ViewChild, OnInit} from '@angular/core';
import {BreadcrumbService} from '../shared/breadcrumb.service';
import {TirillasService} from '../_services/tirillaservice';
import {Lists} from '../_models/lists';
import {ActivatedRoute, Params} from '@angular/router';
import {AppSettings} from '../../proyect.conf';
import * as jsPDF from 'jspdf'
import * as html2canvas from 'html2canvas';
@Component({
             selector: 'app-primasdetail',
             templateUrl: './detail.component.html',
             styleUrls: ['./detail.component.css']
           })
export class PrimasdetailComponent implements OnInit {

  data: Lists;
  id: string;
  datosBasicos: any;
  deducciones: any;
  ingresos: any;
  private serviceUrl = AppSettings.serviceUrl;
  pdf = new jsPDF('p', 'mm', [200, 211]);
  layoutContainer: HTMLDivElement;
  showImage = true;

  @ViewChild('tirillaContainer') layourContainerViewChild: ElementRef;

  constructor(public renderer2: Renderer2,
              private tirillasService: TirillasService,
              private breadcrumbService: BreadcrumbService,
              private route: ActivatedRoute) {
    this.breadcrumbService.setItems([
      { label: 'Primas', routerLink: ['/primas'] },
      { label: 'Detalle' }]);
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = (params['id']) ? params['id'] : undefined;
      if (this.id) {
        this.tirillasService.getByIdPrimas(this.id)
        .subscribe(data => {
          this.data = data[0];
          this.datosBasicos = this.data['DATOS BASICOS'];
          this.deducciones = this.data['DEDUCCIONES'];
          this.ingresos = this.data['INGRESOS'];
        });
      }
    });
  }

  makePdf(): void {
    this.showImage = false;
    this.layoutContainer = <HTMLDivElement> this.layourContainerViewChild.nativeElement;
    html2canvas(this.layoutContainer, { allowTaint: true, useCORS: true }).then(canvas => {
      this.pdf.addImage(canvas.toDataURL('../../assets/demo/png'), 'PNG', 0, 0, 211, 200);
      const filename = 'Desprendible periodo'+this.datosBasicos['PERIODO']+'.pdf';
      this.pdf.save(filename);
      this.showImage = true;
    });
  }



}
