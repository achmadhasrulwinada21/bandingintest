import { Component, OnInit } from '@angular/core';
import { DynamicScriptLoaderService } from './shared/service/dynamic-script.service';

@Component({
  selector: 'app-backend',
  templateUrl: './backend.component.html',
  styleUrls: ['./backend.component.css']
})
export class BackendComponent implements OnInit {

  constructor(private dynamicScriptLoader: DynamicScriptLoaderService,) { }

  ngOnInit() {
    this.loadScripts()
  }

  private loadScripts(){
    // You can load multiple scripts by just providing the key as argument into load method of the service
      this.dynamicScriptLoader.load('Popper','Tooltip','Bootstrap','Nicescroll','Stisla','Scripts').then(data => {
      // Script Loaded Successfully
    }).catch(error => console.log(error));     
  }

}
