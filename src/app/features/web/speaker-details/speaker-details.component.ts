import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebService } from '../webz-services/web.service';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Router } from '@angular/router';
import { EncryptionService } from '../../../shared/services/encryption.service';

interface Speaker {
  speaker_name: string;
  speaker_country: string;
  speaker_credentials: string;
  profile_photo?: string;
}

@Component({
  selector: 'app-speaker-details',
  templateUrl: './speaker-details.component.html',
  styleUrls: ['./speaker-details.component.css']
})
export class SpeakerDetailsComponent implements OnInit, OnDestroy {
  speakersList: any[] = [];
  originalSpeakersList: any[] = [];
  searchText: string = '';
  countries: string[] = [];
  selectedCountry: string = '';
  isLoading = true;
  private searchSubject = new Subject<string>();
  private countrySubject = new Subject<string>();
  private searchSubscription?: Subscription;
  private countrySubscription?: Subscription;
  private excludedCountries = ['Morocco', 'France']; // Countries to exclude

  constructor(
    private webService: WebService,
    private router: Router,
    private encryptionService: EncryptionService,
  ) {}

  ngOnInit() {
    this.setupSearchDebounce();
    this.setupCountryDebounce();
    this.loadSpeakers();
  }

  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
    if (this.countrySubscription) {
      this.countrySubscription.unsubscribe();
    }
    this.searchSubject.complete();
    this.countrySubject.complete();
  }

  private setupSearchDebounce() {
    this.searchSubscription = this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.loadSpeakers();
      });
  }

  private setupCountryDebounce() {
    this.countrySubscription = this.countrySubject
      .pipe(
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.loadSpeakers();
      });
  }

  onSearchChange(value: string) {
    this.searchText = value;
    this.searchSubject.next(value);
  }

  onCountryChange(value: string) {
    this.selectedCountry = value;
    this.countrySubject.next(value);
  }

  loadSpeakers() {
    this.isLoading = true;

    // Prepare the search text - if country is selected, include it in the search
    let searchQuery = this.searchText || '';
    if (this.selectedCountry) {
      searchQuery = searchQuery ? `${searchQuery} ${this.selectedCountry}` : this.selectedCountry;
    }

    this.webService.getSpeakersList(searchQuery, '73', 'All')
    .subscribe({
      next: (response: any) => {
        if (response?.encryptedData) {
          // Decrypt the response data
          let encryptedData = response.encryptedData;
          let decryptData = this.encryptionService.decrypt(encryptedData);
          let data = JSON.parse(decryptData);
            // Map the API response data and filter out excluded countries
            const mappedData = data.data
              .filter((item: any) => !this.excludedCountries.includes(item.speaker_country))
              .map((item: any) => ({
                speaker_id: item.speaker_id || '',
                speaker_name: item.speaker_name || '',
                speaker_country: item.speaker_country || '',
                speaker_credentials: item.speaker_credentials || '',
                profile_photo: item.photo_1 || ''
              }));

            // Transform the mapped data into groups
            this.speakersList = this.transformSpeakerData(mappedData);
            this.originalSpeakersList = [...this.speakersList];

            // Load countries from the initial data
            if (!this.countries.length) {
              this.loadCountries();
            }

            console.log(this.speakersList , 'list of speakers');

          } else {
            this.speakersList = [];
            this.originalSpeakersList = [];
          }
          this.isLoading = false;
        },
        error: (error) => {
          let decryptErr = this.encryptionService.decrypt(error.error.encryptedData);
          console.log(JSON.parse(decryptErr), 'decrypted data');
          decryptErr = JSON.parse(decryptErr);
          console.error('Error fetching speakers:', decryptErr);
          this.isLoading = false;
          this.speakersList = [];
          this.originalSpeakersList = [];
        }
      });
  }

  private transformSpeakerData(data: Speaker[]): any[] {
    // Group speakers into chunks of 4 speakers per group
    const groupSize = 4;
    const groups = [];

    for (let i = 0; i < data.length; i += groupSize) {
      groups.push({
        speakers: data.slice(i, i + groupSize)
      });
    }

    return groups;
  }

  loadCountries() {
    // Extract countries from nested speakers array
    const allCountries = this.speakersList.flatMap(group =>
      group.speakers.map((speaker: Speaker) => speaker.speaker_country)
    );

    // Get unique countries and sort them, excluding the specified countries
    this.countries = [...new Set(allCountries)]
      .filter(country => country && !this.excludedCountries.includes(country))
      .sort();
  }

  formatCountry(countries: string | string[]): string {
    if (!countries) return ''; // Handle undefined/null cases

    if (typeof countries === 'string') {
      try {
        const parsed = JSON.parse(countries);
        if (Array.isArray(parsed)) {
          return parsed.join(", ");
        }
      } catch (e) {
        return countries; // If parsing fails, return as-is
      }
    }

    if (Array.isArray(countries)) {
      return countries.join(", ");
    }

    return '';
  }

  goToChildNomination(speakerId: any, speakerName: any) {
    const params = {
      speakerId: speakerId,
      speakerName: speakerName
    }
    const encryptedParams = this.encryptionService.encryptData(params);
    this.router.navigate(['/speaker-profile'], {
      queryParams: {  data: encryptedParams }
    });
  }
}
