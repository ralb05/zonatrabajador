import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BreadcrumbService} from '../shared/breadcrumb.service';
import {TirillasService} from '../_services/tirillaservice';
import {Lists} from '../_models/lists';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tirilla',
  templateUrl: 'listar.component.html',
  styleUrls: ['listar.component.css']
})
export class CesantiasComponent implements OnInit {

  data: Array<Lists>;

  constructor(private tirillasService: TirillasService,
              private breadcrumbService: BreadcrumbService,
              private router: Router) {
    this.breadcrumbService.setItems([{ label: 'Cesantias' }]);
  }

  ngOnInit() {
    this.tirillasService.getListCesantias()
    .subscribe(data => {
        this.data = data
    });
  }

  showDetail(id: number): void {
    this.router.navigate([`/cesantias/detalle/${id}`]);
  }
}
