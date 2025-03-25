import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DelegateService } from '../../services/delegate.service';
import { EncryptionService } from '../../../../shared/services/encryption.service';
import { SharedService } from '../../../../shared/services/shared.service';

@Component({
  selector: 'app-verify-ticket',
  templateUrl: './verify-ticket.component.html',
  styleUrls: ['./verify-ticket.component.css']
})
export class VerifyTicketComponent {
  ticketId: any ="";
  ticketUrl: any = "";
  type: any = "";

  constructor(private router: Router,
              private route: ActivatedRoute ,
              private encryptionService:EncryptionService ,
              private delegateService:DelegateService,
              private sharedService : SharedService) { }

  ngOnInit() {

    this.route.queryParams.subscribe((params: any) => {

      if (params != undefined && Object.keys(params).length > 0) {

        console.log("params",params);
        let ticketData = params['data'].replace(/ /g, '+');

        let decryptedData = this.encryptionService.decrypt(ticketData);

        console.log("decryptedData",decryptedData);

        // Parse the decrypted string into key-value pairs
        const urlParams = new URLSearchParams(decryptedData);

        // Extract values
        this.ticketId = urlParams.get('ticket_id');
        this.ticketUrl = urlParams.get('ticket_url');
        this.type = urlParams.get('type');

        console.log("Ticket ID:", this.ticketId);
        console.log("Ticket URL:", this.ticketUrl);
        console.log("Ticket type:", this.type);
      }
    });

    this.verifyTicket();
  }

  verifyTicket(){
    let body = {
      "p_type": this.type,
      "p_ticket_no": this.ticketId
  }
    this.delegateService.getVerifyTicketApi(body).subscribe({
      next : (res)=>{
        console.log(res);

      },error :(err)=>{
        console.log("error",err.error);
        this.sharedService.ToastPopup(err.error['message'],'','error');
      }
    })
  }
}
