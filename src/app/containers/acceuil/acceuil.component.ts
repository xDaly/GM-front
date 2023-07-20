import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralService } from 'src/app/services/general.service';
import { ToastrService } from 'ngx-toastr';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartOptions, ChartType } from 'chart.js';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-acceuil',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.scss'],
})
export class AcceuilComponent {
  counts: any;
  localisationlabels: any[] = [];
  localisationcounts: any[] = [];

  regionlabels: any[] = [];
  regioncounts: any[] = [];
  showCharts= false;
  constructor(private _general: GeneralService, private toastr: ToastrService) {
    this.getCounts();
  }

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLegend = true;
  public pieChartLabels = this.localisationlabels;
  public pieChartDatasets = [{data: this.localisationcounts}];

  public regionpieChartLabels = this.regionlabels;
  public regionpieChartDatasets = [{data: this.regioncounts}];

  //bars for regions 
  
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0
      }
    },
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      } 
    } as any
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    DataLabelsPlugin
  ];

  public barChartData: ChartData<'bar'> = {
    labels: this.regionlabels,
    datasets: [
      { data: this.regioncounts, label: 'Series A' },
    ]
  };
  //end of bars for region  



  getCounts() {
    this._general.getCounts().subscribe({
      next: (response: any) => {
        this.counts = response.data;
        response.data.localisationUsersData.map((e: any) => {
          this.localisationlabels.push(e.localisation);
          this.localisationcounts.push(e.count);
        });
        response.data.regionData.map((e:any)=>{
          this.regionlabels.push(e.region)
          this.regioncounts.push(e.count)
        })
      },
      error: (err) => {
        this.toastr.error(err, 'erreur');
      },
      complete: () => {
          
          this.showCharts = true;
    
      },
    });
  }
}
