import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from '../shared/breadcrumb.service';
import {TirillasService} from '../_services/tirillaservice';
import {Lists} from '../_models/lists';
import {Router} from '@angular/router';

@Component({
  selector: 'app-primas-listar',
  templateUrl: 'listar.component.html',
  styleUrls: ['listar.component.css']
})
export class PrimasComponent implements OnInit {

  data: Array<Lists>;

  constructor(private tirillasService: TirillasService,
              private breadcrumbService: BreadcrumbService,
              private router: Router) {
    this.breadcrumbService.setItems([{ label: 'Primas' }]);
  }

  ngOnInit() {
    this.tirillasService.getListPrimas()
    .subscribe(data => {
        this.data = data
    });
  }

  showDetail(id: number): void {
    this.router.navigate([`/primas/detalle/${id}`]);
  }
}
