import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DelegateService } from '../../services/delegate.service';
import { EncryptionService } from '../../../../shared/services/encryption.service';
import { SharedService } from '../../../../shared/services/shared.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-verify-ticket',
  templateUrl: './verify-ticket.component.html',
  styleUrls: ['./verify-ticket.component.css']
})
export class VerifyTicketComponent {
  ticketId: any ="";
  ticketUrl: any = "";
  type: any = "";
  verifyTicketData: any;

  constructor(private router: Router,
              private route: ActivatedRoute ,
              private encryptionService:EncryptionService ,
              private delegateService:DelegateService,
              private sharedService : SharedService,
              private ngxService : NgxUiLoaderService) { }

  ngOnInit() {

    this.route.queryParams.subscribe((params: any) => {

      if (params != undefined && Object.keys(params).length > 0) {

        let ticketData = params['data'].replace(/ /g, '+');

        let decryptedData = this.encryptionService.decrypt(ticketData);

        // Parse the decrypted string into key-value pairs
        const urlParams = new URLSearchParams(decryptedData);

        // Extract values
        this.ticketId = urlParams.get('ticket_id');
        this.ticketUrl = urlParams.get('ticket_url');
        this.type = urlParams.get('type');
      }
    });

    this.verifyTicket();
  }

  verifyTicket(){

    let body = {
      "p_type": this.type,
      "p_ticket_no": this.ticketId
  }

    this.ngxService.start();
    this.delegateService.getVerifyTicketApi(body).subscribe({
      next : (res)=>{
        if(res.success) {

          this.ngxService.stop();
          this.verifyTicketData = res.data[0];

          if (this.verifyTicketData.ticket_url) {
            window.open(this.verifyTicketData.ticket_url);
          } else {
            this.sharedService.ToastPopup('Ticket URL not found', '', 'warning');
          }
        }
      },error :(err)=>{
        console.log("error",err.error);
        this.ngxService.stop();
        this.sharedService.ToastPopup(err.error['message'],'','error');
      }
    })
  }
}
