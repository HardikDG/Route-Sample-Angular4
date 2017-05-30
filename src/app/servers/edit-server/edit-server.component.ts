import { Observable } from 'rxjs/Observable';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, CanDeactivate } from '@angular/router';

import { ServersService } from '../servers.service';
import { canComponentDeactivate } from './can-deactivate-guard.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit,canComponentDeactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;

  constructor(private serversService: ServersService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit() {
    console.log("Query params: " + JSON.stringify(this.route.snapshot.queryParams));
    console.log("Fragment:  " + this.route.snapshot.fragment);

    this.route.queryParams.subscribe( ( query:Params ) => {
        console.log( "Update in query params: " + query['allowEdit']);
        this.allowEdit = query['allowEdit'] === '1' ? true : false;
    }
    );

    const id = +this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(id);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../'], { relativeTo: this.route});
  }

  canDeactivate() : Observable<boolean> | Promise<boolean> | boolean {
    if(!this.allowEdit){
      return true;
    } 
    if ((this.serverName != this.server.name || this.serverStatus != this.server.status) && !this.changesSaved){
      return confirm('Do you want to discard the changes?');
    } else {
      return true;
    }
  }

}
