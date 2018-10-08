import {Component, ElementRef, Renderer2, ViewChild, OnInit} from '@angular/core';
import {BreadcrumbService} from '../shared/breadcrumb.service';
import {TirillasService} from '../_services/tirillaservice';
import {Lists} from '../_models/lists';
import {ActivatedRoute, Params} from '@angular/router';
import {AppSettings} from '../../proyect.conf';
import * as jsPDF from 'jspdf'
import * as html2canvas from 'html2canvas';
@Component({
             selector: 'app-detail',
             templateUrl: './detail.component.html',
             styleUrls: ['./detail.component.css']
           })
export class DetailComponent implements OnInit {

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
        });
      }
    });
  }

  makePdf(): void {
    /*let specialElementHandlers = {
      '#editor': function(element, renderer){
        return true;
      },
      '.controls': function(element, renderer){
        return true;
      }
    };
    this.pdf.text(35, 25, "Desprendible de pago");
    const html = this.mainHtml();
    console.info(html);
    this.pdf.fromHTML(html, 15, 15);
    this.pdf.save('Desprendible periodo'+this.datosBasicos['PERIODO']+'.pdf');*/
    this.showImage = false;
    this.layoutContainer = <HTMLDivElement> this.layourContainerViewChild.nativeElement;
    html2canvas(this.layoutContainer, { allowTaint: true, useCORS: true }).then(canvas => {
      this.pdf.addImage(canvas.toDataURL('../../assets/demo/png'), 'PNG', 0, 0, 211, 200);
      const filename = 'Desprendible periodo'+this.datosBasicos['PERIODO']+'.pdf';
      this.pdf.save(filename);
      this.showImage = true;
    });
    /*html2canvas(this.layoutContainer, {
      onrendered: function(canvas) {
        this.pdf.addImage(canvas.toDataURL('../../assets/demo/png'), 'PNG', 0, 0, 211, 298);
        const filename = 'Desprendible periodo'+this.datosBasicos['PERIODO']+'.pdf';
        this.pdf.save(filename);
      }
    })*/
    /*var img = new Image;
    img.src = this.serviceUrl+this.data['LOGO'];
    img.crossOrigin = "Anonymous";
    img.onload = function() {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage( img, 0, 0 );
      localStorage.setItem( "savedImageData", canvas.toDataURL("image/png") );
    }
    console.info(img);*/
    /*
    window.onload = function() {
      var c = document.getElementById("myCanvas");
      var ctx = c.getContext("2d");
      var img = document.getElementById("scream");
      ctx.drawImage(img,10,10);
    };*/
  }

  mainHtml(): string {
    const html = `
    <style type="text/css">
    table.datosGenerales {font-size:10pt; border-left: 2px solid black; border-top: 2px solid black;}
    table.datosGenerales td {border-right: 2px solid black; }
    table.datosPersonales { border:2px solid black;}
    table.datosPersonales td{ border-bottom:1px solid black; }
    table.datosPago { border:2px solid black;}
    </style>
    <table class="datosGenerales" cellpadding="3" width="400" style="width:400px;">
      <tr>
        <td text-align="center" width="100" style="width:100px;">
          
        </td>
        <td width="280" style="width:280px;">
          <b>Comprobante   de pago de N&oacute;mina</b><br>
          <b>CENTRO DE COSTOS: </b>${this.datosBasicos['CENTRO DE TRABAJO']}<br>
          <b>NIT: </b>${this.datosBasicos['NIT']}<br>
          <b>PERIODO: </b>${this.datosBasicos['PERIODO']}
        </td>
      </tr>`;


    /*$html .= "</table>";

    $html .= '

             <table class="datosPersonales" cellpadding="3" width="389px" style="width:389px;" >
                                                                                <tr>
                                                                                  <td width="240px" style="width:295px;">NOMBRE: '.(htmlentities($datos->getSsmasociadoObject()->getAsoapellidos()." ".$datos->getSsmasociadoObject()->getAsonombres(), ENT_QUOTES | ENT_IGNORE, "UTF-8")).'</td>
                                                                                                                                 <td width="140px" style="width:300px;">CC:
    '.number_format($datos->getSsmasociadoObject()->getAsodocumento()).'</td>
    </tr>';

    if($this->_global->ocultar_numero_cuenta_en_tirilla != "1"){
      $html .= '
               <tr>
               <td>'.(strlen($datos->getSsmcuenta()) > 5 ? "BANCO: ".$datos->getSsmbancoObject()->get_Label_model() : " ").'</td>
               <td>';
      $html .= strlen($datos->getSsmcuenta()) > 5 ? 'CUENTA: '.$datos->getSsmcuenta() : '';
      $html .= '</td>
               </tr>';
    }


    $html .= '
             <tr>
             <td>'.(($datos->getSsmeps()) > 0 ? "EPS: ".$datos->getSsmepsObject()->get_Label_model() : " ").'</td>
             <td>';
    $html .= ($datos->getSsmafp()) > 0 ? 'AFP: '.$datos->getSsmafpObject()->get_Label_model() : '';
    $html .= '</td>
             </tr>
             <tr>
               <td>'.(htmlentities(strtoupper(CARGO).': '.$datos->getSsmcargoasociadoObject()->get_Label_model(), ENT_QUOTES | ENT_IGNORE, "UTF-8")).'</td>
                                                        <td>'.(htmlentities(COMPENSACION_BASE, ENT_QUOTES | ENT_IGNORE, "UTF-8")).": ".number_format($sueldo_basico).'</td>
                                                        </tr>
                                                        </table>
                                                        ';

    $html .='<table class="datosPago" cellpadding="3" width="380px" style="width:380px;" ><tr><td >';
    $html .= $this->printingresos($datos);
    $html .='</td></tr><tr><td>';
    $html .= $this->printdeducciones($datos,$tipotirilla);
    $html .="</td></tr>";
    $html .="<tr><td></td></tr>";
    $html .="<tr><td>_____________________________________________</td></tr>";
    $html .="<tr><td>Firma: ".(htmlentities($datos->getSsmasociadoObject()->getAsoapellidos()." ".$datos->getSsmasociadoObject()->getAsonombres(), ENT_QUOTES | ENT_IGNORE, "UTF-8"))."</td></tr>";
    $html .="<tr><td>CC: ".number_format($datos->getSsmasociadoObject()->getAsodocumento())."</td></tr>";
    $html .="<tr><td></td></tr>";
    $html .="</table>";

    if($datos->getSsmcontratoasociadoObject()->getCasotipocontratolaboral() == 8 && PUBLIC_PATH != "/yesosprada"){
      $html .="<table><tr><td>";
      $html .= $this->printdetalle($datos);
      $html .="</td></tr></table>";
    }*/

    return html;

  }


  /*private function printingresos($datos){

  $VerCompleta = false;
  if(PUBLIC_PATH == "/tio"){
    $VerCompleta = true;
  }

  $xhoras = "";
  $xdiastrabajados = $datos->getSsmdiastrabajados();

  if ($datos->getSsmtipocontratolaboral() == 3){
    $xhoras ="Horas ";
    $xdiastrabajados = $datos->getPorhorastotal();
    $salario = COMPENSACION_SALARIAL_MENSUAL_FIJA;
  } else if ($datos->getSsmtipocontratolaboral() == 5) {
    $salario = APOYO_SOSTENIMIENTO;
  } else {
    $salario = COMPENSACION_SALARIAL_MENSUAL_FIJA;
  }

  setlocale(LC_MONETARY, 'en_US');

  $html = '<table width="375px" style="font-size:8pt; width:375px;">
          <tr><td colspan="3" style="text-align:center; background-color:#eee"><h3>INGRESOS</h3></td></tr>
                                    <tr style="text-align:center; background-color:#ccc;">
                                              <td width="224px" style="text-align:cente; width:224px;">Concepto</td>
                                                                      <td width="79x" style="text-align:center; width:79px;">Cantidad '.$xhoras.'</td>
                                                                                                                                      <td width="69px" style="text-align:center; width:69px;">Valor</td>
                                                                                                                                                             </tr>
                                                                                                                                                             <tr>
                                                                                                                                                               <td >'.ucfirst(strtolower(htmlentities($salario, ENT_QUOTES | ENT_IGNORE, "UTF-8"))).'</td>
                                                                                                                                                             <td style="text-align:center;" >'.$xdiastrabajados.'</td>
                                                                                                                                                                       <td style="text-align:right;" >'.number_format(($datos->getSsmcompensacionbasica() - $datos->getSsmdeduccioninasistencia())).'</td>
                                                                                                                                                                                 </tr>';

  if($datos->getPorhorasdomingo() > 0){

    $html.='<tr>
           <td>Descanso</td>
           <td style="text-align:center">'.number_format($datos->getPorhorasdomingo(),2, ',', '').'</td>
                                                                                               <td style="text-align:right"></td>
                                                                                                         </tr>';
  }

  if($datos->getSsmdiasvacaciones() > 0) {
    $html.='<tr>
           <td>'.ucfirst(strtolower(htmlentities(DESCANSO_ANUAL, ENT_QUOTES | ENT_IGNORE, "UTF-8"))).' </td>
           <td style="text-align:center">'.$datos->getSsmdiasvacaciones().'</td>
                     <td style="text-align:right">'.number_format($datos->getSsmpreciovacaciones()).'</td>
                               </tr>';
  }


  if($datos->getSsmprima() > 0) {
    $html.='<tr>
           <td>'. ucfirst(strtolower(htmlentities(COMPENSACION_SEMESTRAL, ENT_QUOTES | ENT_IGNORE, "UTF-8"))).'</td>
           <td style="text-align:center"></td>
                     <td style="text-align:right">'.number_format($datos->getSsmprima()).'</td>
                               </tr>';
  }
  if($datos->getSsmauxliotransporte() > 0) {
    $html.='<tr>
           <td>'.ucfirst(strtolower(AUXILIO_TRANSPORTE)).'</td>
           <td style="text-align:center"></td>
                     <td style="text-align:right">'.number_format($datos->getSsmauxliotransporte()).'</td>
                               </tr>';
  }

  if($datos->getSsmprecioinca66() > 0 || $datos->getSsmprecioinca100() > 0) {
    $html .='<tr>
            <td>'.ucfirst(strtolower(INCAPACIDADES)).'</td>
            <td style="text-align:center">'.($datos->getSsmdiasinca66() + $datos->getSsmdiasinca100()) .'</td>
                      <td style="text-align:right">'.number_format($datos->getSsmprecioinca66()+ $datos->getSsmprecioinca100()) .'</td>
                                </tr>';
  }

  if($datos->getSsmdiasmaternidad() > 0) {
    $html .='<tr>
            <td>'. ucfirst(strtolower('LIC MATERNIDAD')).'</td>
                                                     <td style="text-align:center">'. $datos->getSsmdiasmaternidad() .'</td>
                                                               <td style="text-align:right">'.number_format($datos->getSsmpreciomaternidad()).'</td>
                                                                         </tr>';
  }
  if($datos->getSsmdiaspaternidad() > 0) {
    $html .='<tr>
            <td>'. ucfirst(strtolower('LIC PATERNIDAD')).'</td>
                                                     <td style="text-align:center">'.$datos->getSsmdiaspaternidad() .'</td>
                                                               <td style="text-align:right">'.number_format($datos->getSsmpreciopaternidad()) .'</td>
                                                                         </tr>';
  }
  if($datos->getSsmdiasluto() > 0) {
    $html .='<tr>
            <td>'. ucfirst(strtolower('LIC LUTO')).'</td>
                                               <td style="text-align:center">'.$datos->getSsmdiasluto() .'</td>
                                                         <td style="text-align:right">'. number_format($datos->getSsmprecioluto()).'</td>
                                                                   </tr>';
  }

  if($datos->getSsmdiascalamidad() > 0) {
    $html .='<tr>
            <td>'. ucfirst(strtolower('CALAMIDAD DOMESTICA')).'</td>
                                                          <td style="text-align:center">'. $datos->getSsmdiascalamidad() .'</td>
                                                                    <td style="text-align:right">'.number_format($datos->getSsmpreciocalamidad()) .'</td>
                                                                              </tr>';
  }
  if($datos->getSsmdiaspermisoremunerado() > 0) {
    $html .='<tr>
            <td>'. ucfirst(strtolower('PERMISO REMUNERADO')).'</td>
                                                         <td style="text-align:center">'. $datos->getSsmdiaspermisoremunerado() .'</td>
                                                                   <td style="text-align:right">'.number_format($datos->getSsmpreciopermisoremunerado()) .'</td>
                                                                             </tr>';
  }
  if($datos->getSsmpreciohorarecargoordinaria() > 0) {
    $html .='<tr>
            <td>'.ucfirst(strtolower(REC_DIURNO)).'</td>
            <td style="text-align:center">'.round($datos->getSsmtotalhorarecargoordinaria(),1).'</td>
                      <td style="text-align:right">'.number_format($datos->getSsmpreciohorarecargoordinaria()).'</td>
                                </tr>';
  }
  if($datos->getSsmpreciohorarecargonocturno() > 0 || $VerCompleta == true) {
    $html .='<tr>
            <td>'.ucfirst(strtolower(REC_NOCTURNO)).'</td>
            <td style="text-align:center">'.round($datos->getSsmtotalhorarecargonocturno(),1).'</td>
                      <td style="text-align:right">'.number_format($datos->getSsmpreciohorarecargonocturno()).'</td>
                                </tr>';
  }
  if($datos->getSsmpreciohorarecargonocturnofestivo() > 0 || $VerCompleta == true) {
    $html .='<tr>
            <td>'.ucfirst(strtolower(REC_NOCTURNO_FESTIVO)).' </td>
            <td style="text-align:center">'.round($datos->getSsmtotalhorarecargonocturnofestivo(),1) .'</td>
                      <td style="text-align:right">'.number_format($datos->getSsmpreciohorarecargonocturnofestivo()).'</td>
                                </tr>';
  }


  if($datos->getSsmpreciohorarecargodiurnafestivo() > 0 || $VerCompleta == true ) {
    $html .='<tr>
            <td>'.ucfirst(strtolower(REC_DIURNO_FESTIVO)).' </td>
            <td style="text-align:center">'.round($datos->getSsmtotalhorarecargodiurnafestivo(),1).'</td>
                      <td style="text-align:right">'.number_format($datos->getSsmpreciohorarecargodiurnafestivo()).'</td>
                                </tr>';
  }
  if(	($datos->getSsmpreciohoraextradiurna() > 0
                || $datos->getSsmpreciohoraextranocturna() > 0
                           || $datos->getSsmpreciohoraextradiurnafestiva() > 0
                                      || $datos->getSsmpreciohoraextranocturnafestiva() > 0
) && PUBLIC_PATH == "/fet"
) {
    $html .='<tr><td colspan="3" class="center" style="text-align:center; "><b>'.strtoupper(ACTIVIDADES_SUPLEMENTARIAS).'</b></td></tr>';
  }
  if($datos->getSsmpreciohoraextradiurna() > 0) {
    $html .='<tr>
            <td>'.ucfirst(strtolower(HR_EXTRA_DIURNA)).'</td>
            <td style="text-align:center">'.round($datos->getSsmtotalhoraextradiurna(),1).'</td>
                      <td style="text-align:right">'. number_format($datos->getSsmpreciohoraextradiurna()) .'</td>
                                </tr>';
  }
  if($datos->getSsmpreciohoraextranocturna() > 0) {
    $html .='<tr>
            <td>'.ucfirst(strtolower(HR_EXTRA_NOCTURNA)).' </td>
            <td style="text-align:center">'.round($datos->getSsmtotalhoraextranocturna(),1).'</td>
                      <td style="text-align:right">'.number_format($datos->getSsmpreciohoraextranocturna()).'</td>
                                </tr>';
  }
  if($datos->getSsmpreciohoraextradiurnafestiva() > 0) {
    $html .='<tr>
            <td>'. ucfirst(strtolower('HORAS EXTRA DIURNA FESTIVA')).'</td>
                                                                 <td style="text-align:center">'.round($datos->getSsmtotalhoraextradiurnafestiva(),1).'</td>
                                                                           <td style="text-align:right">'.number_format($datos->getSsmpreciohoraextradiurnafestiva()).'</td>
                                                                                     </tr>';
  }
  if($datos->getSsmpreciohoraextranocturnafestiva() > 0) {
    $html .='<tr>
            <td>'. ucfirst(strtolower('HORAS EXTRA NOCTURNA FESTIVA')).'</td>
                                                                   <td style="text-align:center">'.round($datos->getSsmtotalhoraextranocturnafestiva(),1).'</td>
                                                                             <td style="text-align:right">'.number_format($datos->getSsmpreciohoraextranocturnafestiva()).'</td>
                                                                                       </tr>';
  }

  $anticipadas = $datos->getAnticipadaprima() +  $datos->getAnticipadavacaciones()
                                                         + $datos->getAnticipadacesantias() + $datos->getAnticipadainteresescesantias();
  if($anticipadas > 0)
    $html .='<tr>
            <td colspan="3">COMPENSACIONES ANTICIPADAS</td>
                                           </tr>';

  if($datos->getAnticipadaprima() > 0) {
    $html .='<tr>
            <td>'. ucfirst(strtolower(htmlentities(COMPENSACION_SEMESTRAL, ENT_QUOTES | ENT_IGNORE, "UTF-8"))).'</td>
            <td style="text-align:center"></td>
                      <td style="text-align:right">'.number_format($datos->getAnticipadaprima()).'</td>
                                </tr>';
  }
  if($datos->getAnticipadavacaciones() > 0) {
    $html .='<tr>
            <td>'. ucfirst(strtolower(htmlentities(DESCANSO_ANUAL, ENT_QUOTES | ENT_IGNORE, "UTF-8"))).'</td>
            <td style="text-align:center"></td>
                      <td style="text-align:right">'.number_format($datos->getAnticipadavacaciones()).'</td>
                                </tr>';
  }
  if($datos->getAnticipadacesantias() > 0) {
    $html .='<tr>
            <td>'. ucfirst(strtolower(htmlentities(COMPENSACION_ANUAL_DIFERIDA, ENT_QUOTES | ENT_IGNORE, "UTF-8"))).'</td>
            <td style="text-align:center"></td>
                      <td style="text-align:right">'.number_format($datos->getAnticipadacesantias()).'</td>
                                </tr>';
  }
  if($datos->getAnticipadainteresescesantias() > 0) {
    $html .='<tr>
            <td>'. ucfirst(strtolower(htmlentities(RENTABILIDAD_COMPENSACION_ANUAL_DIFERIDA, ENT_QUOTES | ENT_IGNORE, "UTF-8"))).'</td>
            <td style="text-align:center"></td>
                      <td style="text-align:right">'.number_format($datos->getAnticipadainteresescesantias()).'</td>
                                </tr>';
  }
  $OtrosingesosDB = Nomina_Model_OtrosingresosMapper::getInstance();
  $datosIngresos = $OtrosingesosDB->getByFiltroVarios(array("oisubmes"=>$datos->getSsmsubmes(),"asociado_id"=>$datos->getSsmasociado()));

  $extranomina = 0;
  $NoSalarial = 0;
  foreach ($datosIngresos as $key => $Ingreso) {
    if($Ingreso->getOitipoingresoObject()->getTiextranomina() == 1){
      $extranomina += $Ingreso->getOivalor();
    }else{
      if(($Ingreso->getOitipoingresoObject()->getTisalarial() == 1 || $Ingreso->getOitipoingresoObject()->getTisalarial() == 4)||($Ingreso->getOitipoingresoObject()->getTisalarial() == 5)){
        $html .='<tr><td>'.(ucfirst(strtolower(htmlentities($Ingreso->getOitipoingresoObject()->getTinombre(), ENT_QUOTES | ENT_IGNORE, "UTF-8")))).'  </td> ';
        if(PUBLIC_PATH == "/yesosprada")
          $html .='	<td>'.$Ingreso->getOidescripcion().'</td>';
      else
        $html .='	<td style="text-align:center;">'.number_format($Ingreso->getOiparametro(), 2, '.', '').'</td>';

        $html .='	<td  style="text-align:right">'.number_format($Ingreso->getOivalor()).'</td></tr>';
      }else
      {
        $NoSalarial++;
      }
    }
  }
  if($NoSalarial > 0)
  {
    if(strlen(AUXILIOS_SINDICALES_NO_CONSTITUTIVOS_DE_COMPENSACION)>0)
      $html .= '<tr><td colspan="3">'.htmlentities(AUXILIOS_SINDICALES_NO_CONSTITUTIVOS_DE_COMPENSACION, ENT_QUOTES | ENT_IGNORE, "UTF-8").'</td></tr>';
    foreach ($datosIngresos as $key => $Ingreso) {
    if($Ingreso->getOitipoingresoObject()->getTiextranomina() == 1){

    }else{
      if($Ingreso->getOitipoingresoObject()->getTisalarial() == 0){
        $html .='<tr><td>'.(ucfirst(strtolower(htmlentities($Ingreso->getOitipoingresoObject()->getTinombre(), ENT_QUOTES | ENT_IGNORE, "UTF-8")))).'</td>';
        if(PUBLIC_PATH == "/yesosprada")
          $html .='	<td>'.$Ingreso->getOidescripcion().'</td>';
      else
        $html .='	<td style="text-align:center;">'.number_format($Ingreso->getOiparametro(), 2, '.', '').'</td>';
        $html .='	<td style="text-align:right">'.number_format($Ingreso->getOivalor()).'</td></tr>';
      }
    }
  }
  }
  if($datos->getSsmgastonodeducible() > 0) {
    $html .='<tr>
            <td>GASTO NO DEDUCIBLE</td>
                         <td style="text-align:center"></td>
                                   <td style="text-align:right">'.number_format($datos->getSsmgastonodeducible()).'</td>
                                             </tr>';
  }
  $html .='<tr style="background-color:#ccc; " class="borderline">
          <td colspan="2">
                      <h4>TOTAL INGRESOS</h4>
                                </td>
                                <td style="text-align:right"><strong>'.number_format($datos->getSsmtotalingresos() - $datos->getSsmdeduccioninasistencia()).'</strong></td>
                                          </tr>';
  $VacacionesDB = Nomina_Model_VacacionesMapper::getInstance();
  $params=array(  "asociado"=>    $datos->getSsmasociado(),
    "fechadesde" => $datos->getSsmsubmesObject()->getSubfechainicial(),
    "fechahasta" => $datos->getSsmsubmesObject()->getSubfechafinal());
  $vacaciones = $VacacionesDB->getVacacacionesByAsociadoFechaContabilizar($params);

  if(count($vacaciones) > 0 && PUBLIC_PATH != "/csj") {
    $html .='<tr style="background-color:#ccc; " class="borderline">
            <td>TIPO VACACIONES</td>
                     <td>DIAS</td>
                     <td>VALOR</td>
                     </tr>';

    foreach ($vacaciones as $key => $vac) {
      $html .='<tr style="background-color:#fff; " class="borderline">
              <td>VACACIONES</td>
              <td>'.$vac["vacdiastotales"].'</td>
              <td>'.number_format($vac["vactotalingresos"] - $vac["vactotalextralegal"]).'</td>
              </tr>';
      if($vac["vactotalextralegal"] > 0){
        $html .='<tr style="background-color:#fff; " class="borderline">
                <td>PRIMA DE VACACIONES</td>
                             <td>'.$vac["vacdiasvacaciones"].'</td>
                             <td>'.number_format($vac["vactotalextralegal"]).'</td>
                             </tr>';
      }
    }
  }

  $html .="</table>";



  return $html;
} //Fin printingresos
  private function printdeducciones($datos,$tipotirilla){

  $html ='<table width="375px" style="font-size:8pt; width:375px;">
         <tr ><td colspan="2" style="text-align:center; background-color:#eee"><h3>DEDUCCIONES</h3></td></tr>
                                    <tr style="text-align:center; background-color:#ccc;">
                                              <td width="305px" style="text-align:center">Concepto</td>
                                                                      <td width="70px" style="text-align:center">Valor</td>
                                                                                             </tr>';

  $html .='<tr>
          <td>'. ucfirst(strtolower(htmlentities('APORTE SALUD', ENT_QUOTES | ENT_IGNORE, "UTF-8") )) .'</td>
                                                              <td style="text-align:right">'.number_format($datos->getSsmsaludempleado()).'</td>
                                                                        </tr>';
  $html .='<tr>
          <td>'. ucfirst(strtolower(htmlentities('APORTE PENSION', ENT_QUOTES | ENT_IGNORE, "UTF-8") )).'</td>
                                                                <td style="text-align:right">'.number_format($datos->getSsmpensionempleado()).'</td>
                                                                          </tr>';
  if($datos->getSsmfsp() > 0) {
    $html .='<tr>
            <td>FSP</td>
            <td style="text-align:right">'.number_format($datos->getSsmfsp()).'</td>
                      </tr>';
  }
  if($datos->getSabretefuente() > 0) {
    $html .='<tr>
            <td>'. ucfirst(strtolower(htmlentities('RETENCIÓN EN LA FUENTE POR SALARIOS', ENT_QUOTES | ENT_IGNORE, "UTF-8") )).'</td>
                                                                                       <td style="text-align:right">'.number_format($datos->getSabretefuente()).'</td>
                                                                                                 </tr>';
  }
  if($datos->getRetencionotrosingresos() > 0) {
    $html .='<tr>
            <td>'. ucfirst(strtolower(htmlentities('RETENCIÓN EN LA FUENTE OTROSINGRESOS', ENT_QUOTES | ENT_IGNORE, "UTF-8") )).'</td>
                                                                                        <td style="text-align:right">'.number_format($datos->getRetencionotrosingresos()).'</td>
                                                                                                  </tr>';
  }
  if($datos->getSsmtotalupcadicional() > 0) {
    $html .='<tr>
            <td>'. ucfirst(strtolower('TOTAL UPC ADICIONAL')).'</td>
                                                          <td style="text-align:right">'.number_format($datos->getSsmtotalupcadicional()).'</td>
                                                                    </tr>';
  }
  if($datos->getSsmdiasinasistencia() > 0) {
    $html .='<tr>
            <td>'. ucfirst(strtolower('INASISTENCIAS')).'</td>
                                                    <td >
                                                      <p class="text-right">'.$datos->getSsmdiasinasistencia().'</p>
                                                               </td>
                                                               </tr>';
  }
  if($datos->getSsmdiassuspension() > 0) {
    $html .='<tr>
            <td>'. ucfirst(strtolower(htmlentities('Suspension', ENT_QUOTES | ENT_IGNORE, "UTF-8") )).'</td>
                                                              <td >
                                                                <p class="text-right">'.$datos->getSsmdiassuspension().'</p>
                                                                         </td>
                                                                         </tr>';
  }
  if($datos->getSsmaportevoluntariopension()> 0) {
    $html .= '<tr>
             <td>Aporte voluntario de pensión</td>
                                      <td style="text-align:right">
                                                '.number_format($datos->getSsmaportevoluntariopension()).'
                                                </td>
                                                </tr>';
  }
  if($datos->getSsmaportevoluntarioafc()> 0) {
    $html .= '<tr>
             <td>Aporte fomento de la contrucción</td>
                                      <td style="text-align:right">
                                                '.number_format($datos->getSsmaportevoluntarioafc()).'
                                                </td>
                                                </tr>';
  }

  $OtrosegresosDB = Nomina_Model_OtrosegresosMapper::getInstance();

  $paramsoe = array();
  $paramsoe["oesubmes"] = $datos->getSsmsubmes();
  $paramsoe["asociado_id"] = $datos->getSsmasociado();

  if($tipotirilla == "individual"){
    $paramsoe["oecontratoasociado"] = $datos->getSsmcontratoasociado();
  }


  $datosEgregos = $OtrosegresosDB->getByFiltroVarios($paramsoe);
  foreach ($datosEgregos as $key => $Egreso) {
    if (($datos->getId() == 9715 OR $datos->getId() == 10261) && PUBLIC_PATH == "/jlt") {
      //generación de tirilla sin descuento por anticipo a petición de alexander
    } else {
      $html .='<tr>
              <td>'. ucfirst(strtolower(htmlentities($Egreso->getOetipoegresoObject()->get_Label_model().':', ENT_QUOTES | ENT_IGNORE, "UTF-8") )) .'  </td>
                                                                                                           <td  style="text-align:right">'.number_format($Egreso->getOevalor()).'</td>
                                                                                                                      </tr>';
    }
  }

  $html .='<tr class="danger" style="background-color:#ccc;">
          <td>
          <h4>TOTAL DEDUCCIONES</h4>
                    </td>
                    <td style="text-align:right;"><h4>'.number_format($datos->getSsmtotaldeducciones()- $datos->getSsmdeduccioninasistencia()).'</h4></td>
                              </tr>';
  $html .='<tr><td colspan="2"></td></tr>
          <tr style="background-color:#ccc;">
                    <td>
                      <h4>NETO PAGADO</h4>
                               </td>
                               <td style="text-align:right;"><h3>'.number_format($datos->getSsmtotalneto()).'</h3></td>
                                         </tr>';

  if (PUBLIC_PATH == "/fet" && $datos->getSsmsubmes() == 1374) {

    $html .='<tr class="warning">
            <td colspan="3">
                        <h4>Pago parcial 21/10/2016 - 50%</h4>
                                         </td>
                                         </tr>
                                         ';
  }

  $html .="</table>";
  return $html;

} //Fin printdeducciones
  private function printdetalle($datos){

  $html = '<br><br>';
  $html .='<table style="font-size:7.5pt;" class="first"  border="0.2">

          <tr >
          <td colspan="7" width="550px" style="text-align:center; background-color:#eee"><h3>DETALLES PRODUCCION</h3></td>
                                                                                                      </tr>

                                                                                                      <tr style="text-align:center; background-color:#ccc;">
                                                                                                                <td width="50px" style="text-align:center">Fecha</td>
                                                                                                                                       <td width="100px" style="text-align:center">Asistio</td>
                                                                                                                                                               <td width="170px" style="text-align:center">Tarea</td>
                                                                                                                                                                                       <td width="50px" style="text-align:center">Produccion</td>
                                                                                                                                                                                                              <td width="50px" style="text-align:center">Parametro</td>
                                                                                                                                                                                                                                     <td width="60px" style="text-align:center">Cumplimiento</td>
                                                                                                                                                                                                                                                            <td width="70px" style="text-align:center">Remuneracion</td>
                                                                                                                                                                                                                                                                                   </tr>';

  $fechaini= $datos->getSsmsubmesObject()->getSubfechainicial();
  $fechafin= $datos->getSsmsubmesObject()->getSubfechafinal();
  $cedula = $datos->getSsmasociadoObject()->getAsodocumento();
  $idasociado = $datos->getSsmasociadoObject()->getId(); //id asociado

  $ActividadproduccionDB = Produccion_Model_ActividadproduccionMapper::getInstance();
  $DiasdeproduccionDB = Produccion_Model_DiasdeproduccionMapper::getInstance();
  $ProducciondiariaDB =Produccion_Model_ProducciondiariaMapper::getInstance();

  $iddiainicial = $DiasdeproduccionDB->getByPropiedad("dpdia",$fechaini);
  $iddiainicial = $iddiainicial->getId(); //id fecha inicial
  $iddiafinal= $DiasdeproduccionDB->getByPropiedad("dpdia",$fechafin);
  $iddiafinal = $iddiafinal->getId(); //id fecha final

  //RESULTADO DE LA BD
  $resultado = $ProducciondiariaDB->obtenerDetallexFechaCorregida($idasociado,$fechaini,$fechafin);

  //PARA CADA VUELTA
  //$i = 0;

  foreach ($resultado as $obj)
  {
    $idfecha = $obj['pddia'];
    $fecha = $DiasdeproduccionDB->getById($idfecha);
    $fecha = $fecha->getDpdia(); //campo 1 = FECHA (Fecha)

    // PROCESO ASIGNAR PRODUCCION ()

    $contratoasociadoDB = Clientes_Model_ContratoasociadoMapper::getInstance();
    $consulta= $contratoasociadoDB->getMaxContratoByAsociado($idasociado);
    //$contratoid = $consulta[0]['contrato_id']; // id del contrato activo para el trabajador
    $contratoid = $consulta->getId(); // id del contrato activo para el trabajador

    $NovedadesDB = Clientes_Model_NovedadesMapper::getInstance();
    if ($contratoid != NULL) {
      $arraynovedad= $NovedadesDB->getNovedad_by_Contrato_andby_fecha($fecha,$contratoid); // novedad especifica

      $tipo= "";
      $verifica= "";

      if(!empty($arraynovedad))
      {
        $tipo = " - ".$arraynovedad[0]['tipo'];
        if ($arraynovedad[0]['verificado']==1) $verifica= "(Verificada)"; else $verifica= "(Sin Verificar)";
      }
    }

    $asistencia =  $obj['pdasistio']; //asistencia
    if($obj['pdasistio'] ==1){
      $asistencia = "Si";
    }else { $asistencia = "No ".$tipo." ".$verifica." "; } //si no asistio

    $idactividad= $obj['pdactividad'];
    $arraycantidad=$ActividadproduccionDB->getById($idactividad);
    $nombreactividad=substr(htmlentities($arraycantidad->getApnombre(), ENT_QUOTES, "UTF-8"),0,80) ; //campo 2 = NOMBRE ACTIVIDAD (Tarea)

    $cantidad = $obj['pdcantidad']; //campo 3 = CANTIDAD HECHA (Produccion)

    $cantidadminima= $arraycantidad->getNpcantidadminima(); //campo 4 = CANTIDAD MINIMA (Parametro)

    $porcentaje = $obj['pdproductividad']; //campo 5 = PORCENTAJE LOGRADO (Cumplimiento)

    $pago = $obj['pdingreso']; //campo 6 = PAGO TOTAL X DIA (Remuneracion)

    $fechaDia = new DateTime($fecha);
    $fechaFLimite = new DateTime("2014-02-15");
    if($fechaDia <= $fechaFLimite){
      $pago = $pago - 20534;
    }

    $html .='<tr>
            <td width="50px" style="text-align:center">'.$fecha.'</td>
                                   <td width="100px" style="text-align:center">'.$asistencia.'</td>
                                                           <td width="170px" style="text-align:center">'.$nombreactividad.'</td>
                                                                                   <td width="50px" style="text-align:center">'.$cantidad.'</td>
                                                                                                          <td width="50px" style="text-align:center">'.$cantidadminima.'</td>
                                                                                                                                 <td width="60px" style="text-align:center">'.$porcentaje.' %</td>
                                                                                                                                                        <td width="70px" style="text-align:center">'.number_format($pago).'</td>
                                                                                                                                                                               </tr>';
  }

  $html .="</table>";


  return $html;


} //Fin printdetalle*/

}
