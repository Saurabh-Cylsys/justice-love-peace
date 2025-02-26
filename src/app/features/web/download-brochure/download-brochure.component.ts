import { Component } from '@angular/core';

@Component({
  selector: 'app-download-brochure',
  templateUrl: './download-brochure.component.html',
  styleUrls: ['./download-brochure.component.css']
})
export class DownloadBrochureComponent {

  // downloadPDF() {
  //   debugger;
  //   const fileUrl = 'assets/UIComponents/files/GJLPS-Brochure-english.pdf'; // Path to your PDF file in the assets folder
  //   const a = document.createElement('a');
  //   a.href = fileUrl;
  //   a.download = 'GJLPS-Brochure-english.pdf'; // Name of the downloaded file
  //   document.body.appendChild(a);
  //   a.click();
  //   document.body.removeChild(a);
  // }

  downloadPDF(language: 'English' | 'Mandarin' | 'Hindi' | 'Spain' | 'French' | 'Arabic' | 'Bengali' | 'Portuguese' | 'Russian' | 'Urdu' | 'Indonesian' | 'German') {
    const fileUrls: { [key in 'English' | 'Mandarin' | 'Hindi' | 'Spain'  | 'French' | 'Arabic' | 'Bengali' | 'Portuguese' | 'Russian' | 'Urdu' | 'Indonesian' | 'German']: string } = {
      English: 'assets/UIComponents/files/GJLPS-Brochure-01-ENGLISH-241227.pdf',
      Mandarin: 'assets/UIComponents/files/GJLPS-Brochure-02-MANDARIN.pdf',
      Hindi: 'assets/UIComponents/files/GJLPS-Brochure-03-HINDI-241120.pdf',
      Spain: 'assets/UIComponents/files/GJLPS-Brochure-04-SPANISH.pdf',
      French: 'assets/UIComponents/files/GJLPS-Brochure-05-FRENCH-241212.pdf',
      Arabic: 'assets/UIComponents/files/GJLPS-Brochure-06-ARABIC-241211.pdf',
      Bengali: 'assets/UIComponents/files/GJLPS-Brochure-07-BENGALI-241211.pdf',
      Portuguese: 'assets/UIComponents/files/GJLPS-Brochure-08-PORTUGUESE.pdf',
      Russian: 'assets/UIComponents/files/GJLPS-Brochure-09-RUSSIAN-241205.pdf',
      Urdu: 'assets/UIComponents/files/GJLPS-Brochure-10-URDU-241211.pdf',
      Indonesian: 'assets/UIComponents/files/GJLPS-Brochure-11-INDONESIAN-241213.pdf',
      German: 'assets/UIComponents/files/GJLPS-Brochure-12-GERMAN-241211.pdf',
    };
  
    const fileUrl = fileUrls[language];
    const a = document.createElement('a');
    a.href = fileUrl;
    a.download = `GJLPS-Brochure-${language.toLowerCase()}.pdf`; // Name of the downloaded file
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  
  
}
