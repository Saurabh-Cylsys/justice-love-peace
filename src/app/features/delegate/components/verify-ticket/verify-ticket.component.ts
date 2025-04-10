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
  ticketImageUrl: any;
  showTicketModal: boolean = false;

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

        try {

          let decryptedData = this.encryptionService.decryptParameter(ticketData);
          const urlParams = new URLSearchParams(decryptedData);
          this.ticketId = urlParams.get('ticket_id');
          this.ticketUrl = urlParams.get('ticket_url');
          this.type = urlParams.get('type');

          if(this.ticketId && this.type){
              this.verifyTicket();
          }

        } catch (error:any) {
          console.log("errr",error);
          this.sharedService.ToastPopup(error,'','error');
        }
      }
    });
  }

  verifyTicket(){

    let body = {
      "p_type": this.type,
      "p_ticket_no": this.ticketId
  }
  const EncryptData = this.encryptionService.encrypt(body);
  let reqBody = {
    encryptedData: EncryptData
  }
    this.ngxService.start();
    this.delegateService.getVerifyTicketApi(reqBody).subscribe({
      next : (res)=>{
        let decryptData:any = this.encryptionService.decrypt(res.encryptedData);
         let decryptedData = JSON.parse(decryptData);


          if (typeof decryptedData === "string") {
            decryptedData = JSON.parse(decryptedData); // First parse to remove extra string quotes
          }

        if(decryptedData.success) {
          this.ngxService.stop();
          this.verifyTicketData = decryptedData.data[0];

          // if (this.verifyTicketData.ticket_url) {
          //   window.open(this.verifyTicketData.ticket_url);

          // } else {
          //   this.sharedService.ToastPopup('Ticket URL not found', '', 'warning');
          // }

          if (this.verifyTicketData?.ticket_url) {
            this.ticketImageUrl = this.verifyTicketData.ticket_url;  // assign image URL
            this.showTicketModal = true;  // show modal
          } else {
            this.sharedService.ToastPopup('Ticket URL not found', '', 'warning');
          }
        }
      },error :(err)=>{
        let decryptErr:any = this.encryptionService.decrypt(err.error.encryptedData);
        decryptErr = JSON.parse(decryptErr);
        console.error('Error :', decryptErr);
        this.ngxService.stop();
        this.sharedService.ToastPopup(decryptErr['message'],'','error');
      }
    })
  }

  closeModal(){
    this.showTicketModal = false;
    this.router.navigate(['/home']);
  }
}
