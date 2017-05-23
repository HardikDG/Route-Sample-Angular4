import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService, private route:ActivatedRoute) { }

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    console.log("Current retrived id: " + id);
    this.server = this.serversService.getServer(2);
    this.route.params.subscribe( (param: Params) => {
      this.server = this.serversService.getServer(+param['id']);
     });
  }

}
