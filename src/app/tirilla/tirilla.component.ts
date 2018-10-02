import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BreadcrumbService} from '../shared/breadcrumb.service';
import {TirillasService} from '../_services/tirillaservice';
import {Lists} from '../_models/lists';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tirilla',
  templateUrl: './tirilla.component.html',
  styleUrls: ['./tirilla.component.css']
})
export class TirillaComponent implements OnInit {

  data: Array<Lists>;

  constructor(private tirillasService: TirillasService,
              private breadcrumbService: BreadcrumbService,
              private router: Router) {
    this.breadcrumbService.setItems([{ label: 'Tirillas' }]);
  }

  ngOnInit() {
    this.tirillasService.getList()
    .subscribe(data => {
        this.data = data
    });
  }

  showDetail(id: number): void {
    this.router.navigate([`/tirillas/detalle/${id}`]);
  }
}
