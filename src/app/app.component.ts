import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable, fromEvent, mapTo, merge, of } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';
declare var AOS:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'justice-love-peace';

  
  ngOnInit(): void {
    AOS.init({
      duration: 1200,
  })

  this.router.events.pipe(
        filter((event: any) => event instanceof NavigationEnd),
        map(() => {
          let child = this.activatedRoute.firstChild;
          while (child?.firstChild) {
            child = child.firstChild; // Get the deepest child route
          }
          return child?.snapshot.data || {};
        })
      )
      .subscribe((metaData: { [key: string]: string }) => {
        // Set the title
        if (metaData['title']) {
          this.meta_title.setTitle(metaData['title']);
        }
 
        // Set the meta tags
        Object.keys(metaData).forEach((key) => {
          if (key !== 'title') {
                      this.meta.updateTag({ name: key, content: metaData[key] });
                    }
        });
      });
  }

  online$: Observable<boolean> = of(false);

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private meta: Meta,
    private meta_title: Title) {
   
  }
}
