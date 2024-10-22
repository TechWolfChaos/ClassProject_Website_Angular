import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-map',
  standalone: true,
  imports: [],
  templateUrl: './home-map.component.html',
  styleUrl: './home-map.component.css'
})

export class HomeMapComponent implements OnInit {
  http = inject(HttpClient);

  //Setting up empty variables needed for URLs
  countrySearch: string = "";
  populationYear: string = "";

  //Setting up empty variables needed for Country data
  countryName: string = "";
  countryCap: string = "";
  countryReg: string = "";
  countryIn: string = "";
  countryLong: string = "";
  countryLat: string = "";

  //Setting up empty variables needed for the population data
  populationDate: string = "";
  populationSize: string = "";


  //Clearing the data from the table
  ngOnInit(): void {
    this.countryName = "~";
    this.countryCap = "~";
    this.countryReg = "~";
    this.countryIn = "~";
    this.countryLong = "~";
    this.countryLat = "~";
    this.populationDate = "~";
    this.populationSize = "~";
  }

  /*Fetching the county data to display the information on site when clicked with mouse and
    identifying each of the six properties with two of my own, GEO location and population by year*/
  fetchCountryData(event: MouseEvent){
    const cData = event.target as SVGAElement;

    //Setting the two letter country code for the API variables, both for the country data and population data
    this.countrySearch = String(cData.id);
    
    //Setting the URL variable for the API location to fetch Country data
    let countryURL = 'https://api.worldbank.org/V2/country/'+this.countrySearch+'?format=json';

    //fetching the data from the URL and setting the values for the table on the HTML
    this.http.get(countryURL).subscribe((res: any) => {
      console.log(res);
      this.countryName = res[1][0].name;
      this.countryCap = res[1][0].capitalCity;
      this.countryReg = res[1][0].region.value;
      this.countryIn = res[1][0].incomeLevel.value;
      this.countryLong = res[1][0].longitude;
      this.countryLat = res[1][0].latitude;
      }
    );

    //Keeping the population data empty if user hasn't selected a year, if user has selected a year then pushes to the ELSE
    if(this.populationYear == ""){
      this.populationDate = "~";
      this.populationSize = "~";
    }else{

      //Setting the URL variable for the API location to fetch County population data
      let populationURL = 'https://api.worldbank.org/v2/country/'+this.countrySearch+'/indicator/SP.POP.TOTL?date='+this.populationYear+'&format=json';

      //fetching the data from the URL and setting the values for the table on the HTML
      this.http.get(populationURL).subscribe((popResp: any) => {
        console.log(popResp);
        this.populationDate = popResp[1][0].date;
        this.populationSize = Number(popResp[1][0].value).toLocaleString('en-US') + ' People';
        }
      )
    }
  }

  //Setting the variable for the Country population date from the selection options on the HTML
  getPopYear(event: Event){
    this.populationYear = (event.target as HTMLSelectElement).value;
  }

}


