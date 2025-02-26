import { Injectable } from '@angular/core';
import { ApiEndpointsService } from 'src/app/core/services/api-endpoints.service';
import { ApiHttpService } from 'src/app/core/services/api-http.service';
import { Observable, of, Subject } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WebService {

  private SPEAKERS_CACHE_KEY = 'speakers_cache_v1';
  private CACHE_EXPIRATION = 24 * 60 * 60 * 1000; // 24 hours
  private SPEAKERS_URL = 'assets/speakers.json';

  constructor(
    private _apiHttpService: ApiHttpService,
    private _apiEndpointsService: ApiEndpointsService,private http: HttpClient
  ) {}

  getSpeakers(): Observable<any[]> {
    const cachedData = localStorage.getItem(this.SPEAKERS_CACHE_KEY);

    if (cachedData) {
      const { timestamp, data } = JSON.parse(cachedData);

      // 1. Check if cache is still valid
      if (Date.now() - timestamp < this.CACHE_EXPIRATION) {
        console.log('Serving from cache');
        return of(data); // Return cached data
      }
    }

    // 2. Fetch from server if cache is expired or doesn't exist
    return this.http.get<any[]>(this.SPEAKERS_URL).pipe(
      tap(newData => {
        // 3. Compare with cached data before updating cache
        if (!cachedData || this.hasListChanged(JSON.parse(cachedData).data, newData)) {
          console.log('Cache updated');
          localStorage.setItem(this.SPEAKERS_CACHE_KEY, JSON.stringify({
            timestamp: Date.now(),
            data: newData
          }));
        } else {
          console.log('No changes detected, cache remains the same');
        }
      })
    );
  }

  private hasListChanged(oldList: any[], newList: any[]): boolean {
    return JSON.stringify(oldList) !== JSON.stringify(newList);
  }


  confirmedSpeakersList: any[] = [
    // list 1
    {
      // "S_No": 1,
      View: '',
      Profile_Photo: 'speaker16.png',
      Name: 'Abdesattar Ben Moussa',
      Country: 'TUNISIA',
      Credentials: 'Lawyer, Human Rights Activist : Nobel Peace Laureate 2015',
    },


    // list 2
    {
      // "S_No": 1,
      View: '',
      Profile_Photo: 'speaker50.png',
      Name: 'Alpha Sesay, Esquire, Honorable',
      Country: 'SIERRA LEONE',
      Credentials: 'Attorney General & Minister of Justice, Sierra Leone',
    },
    {
      // "S_No": 1,
      View: '',
      Profile_Photo: 'speaker18.png',
      Name: 'Antonia Zu Schaumburg-Lippe, Dr, Her Highness Princess',
      Country: 'DENMARK',
      Credentials: 'Royalty, Lawyer, Philanthropist',
    },
    {
      // "S_No": 1,
      View: '',
      Profile_Photo: 'speaker19.png',
      Name: 'Arjuna Ranatunga, Deshamanya',
      Country: 'SRI LANKA',
      Credentials: 'Cricketer & Politician',
    },
    {
      // "S_No": 1,
      View: '',
      Profile_Photo: 'speaker51.png',
      Name: 'Asle Toje',
      Country: 'NORWAY',
      Credentials: 'Deputy Leader, Norwegian Nobel Committee',
    },
    {
      // "S_No": 1,
      View: '',
      Profile_Photo: 'speaker20.png',
      Name: 'Baba Ramdev',
      Country: 'INDIA',
      Credentials: 'World Yoga Guru',
    },
    // list 3
    {
      // "S_No": 2,
      View: '',
      Profile_Photo: 'speaker21.png',
      Name: 'Banagala Upatissa Thero, Most Venerable ',
      Country: 'SRI LANKA',
      Credentials:
        'President of Mahabodhi Society, Sri Lanka : Buddhist Religious Leader',
    },
    {
      // "S_No": 3,
      View: 'binod',
      Profile_Photo: 'speaker14.png',
      Name: 'Binod Kumar Chaudhary  ',
      Country: 'NEPAL',
      Credentials:
        'President, Chaudhary Group : Industrialist, Member of House of Representatives of Nepal',
    },
    {
      // "S_No": 4,
      View: '',
      Profile_Photo: 'speaker22.png',
      Name: 'Chandra Kumar Bose ',
      Country: 'INDIA',
      Credentials:
        'Socio-Political Activist & Convenor, The Open Platform for Netaji : ( grand nephew of Subhash Chandra Bose ) ',
    },
    // list 4
    {
      // "S_No": 5,
      View: '',
      Profile_Photo: 'speaker56.png',
      Name: 'Dalip Singh Rana, The Great Khali',
      Country: 'USA, INDIA',
      Credentials: 'Wrestler : 1st Indian born World Heavyweight Champion, WWE',
    },
    {
      // "S_No": 5,
      View: '',
      Profile_Photo: 'speaker52.png',
      Name: 'Deepa Malik, Dr.',
      Country: 'INDIA',
      Credentials:
        'Sports Champion : Silver Medallist at 2016 Rio Paralympics ',
    },
    {
      // "S_No": 6,
      View: '',
      Profile_Photo: 'speaker53.png',
      Name: 'Dia Mirza',
      Country: 'INDIA',
      Credentials: 'Beauty Queen, Actress',
    },
    // list 5
    {
      // "S_No": 6,
      View: '',
      Profile_Photo: 'speaker54.png',
      Name: 'Ekaterina Zagladina',
      Country: 'RUSSIA ',
      Credentials:
        'President of the Permanent Secretariat of the World Summit of Nobel Peace Laureates',
    },
    {
      // "S_No": 7,
      View: '',
      Profile_Photo: 'speaker23.png',
      Name: 'Esha Deol',
      Country: 'INDIA ',
      Credentials: 'Actress',
    },
    {
      // "S_No": 8,
      View: '',
      Profile_Photo: 'speaker55.png',
      Name: 'Feizi Masrour Milani, Dr.',
      Country: 'BRAZIL',
      Credentials:
        'Elected Representative, National Spiritual Assembly of the Bahais of Brazil',
    },
    // list 6
    {
      // "S_No": 10,
      View: 'habil',
      Profile_Photo: 'speaker7.png',
      Name: 'Habil Khorakiwala, Dr.',
      Country: 'INDIA',
      Credentials: 'Industrialist : Chairman, Wockhardt Group',
    },
    {
      // "S_No": 11,
      View: '',
      Profile_Photo: 'speaker24.png',
      Name: 'Hassan Babacar Jallow, Lord Chief Justice',
      Country: 'GAMBIA ',
      Credentials: 'Chief Justice of the Supreme Court of Gambia',
    },
    {
      // "S_No": 12,
      View: '',
      Profile_Photo: 'speaker25.png',
      Name: 'Hezena Lemaletian, Senator, Ambassador',
      Country: 'KENYA',
      Credentials:
        'Politician ( Member of Parliament ), Royalty ( Queen of the North Kenya ), Beauty Queen ( Miss Commonwealth Kenya, 2018 )',
    },
    // list 7
    {
      // "S_No": 12,
      View: '',
      Profile_Photo: 'speaker57.png',
      Name: 'Hlubi Mboya-Arnold',
      Country: 'SOUTH AFRICA',
      Credentials: 'Actress, Humanitarian',
    },
    {
      // "S_No": 12,
      View: '',
      Profile_Photo: 'speaker58.png',
      Name: 'Hoda Galal Yassa, Dr.',
      Country: 'EGYPT',
      Credentials: 'Industrialist : President, Arab Women Investors Union',
    },
    {
      // "S_No": 12,
      View: '',
      Profile_Photo: 'speaker26.png',
      Name: 'Houcine Abbasi',
      Country: 'TUNISIA',
      Credentials: 'Educationist : Nobel Peace Laureate 2015',
    },
    {
      // "S_No": 12,
      View: '',
      Profile_Photo: 'speaker59.png',
      Name: 'Jacqueline Fernandez',
      Country: 'SRI LANKA, INDIA',
      Credentials: 'Beauty Queen, Actress',
    },
    {
      // "S_No": 13,
      View: '',
      Profile_Photo: 'speaker27.png',
      Name: 'Juan Carlos Sainz-Borgo, Dr.',
      Country: 'COSTA RICA',
      Credentials: 'Vice Rector, University of Peace ',
    },
    // list 8
    {
      // "S_No": 13,
      View: '',
      Profile_Photo: 'speaker1.png',
      Name: 'Kailash Satyarthi',
      Country: 'INDIA',
      Credentials: 'Social Activist, Nobel Peace Laureate 2014',
    },
    {
      // "S_No": 14,
      View: '',
      Profile_Photo: 'speaker62.png',
      Name: 'Kili Paul',
      Country: 'TANZANIAN',
      Credentials: 'Content Creator and Social Media Influencer Honoured by the High Commission of India in Tanzania',
    },
    {
      // "S_No": 14,
      View: '',
      Profile_Photo: 'speaker63.png',
      Name: 'Kriti Kharbanda',
      Country: 'INDIA',
      Credentials: 'Actress ( Hindi, South Indian )',
    },
    {
      // "S_No": 14,
      View: '',
      Profile_Photo: 'speaker28.png',
      Name: 'Latifa Ibn Ziaten',
      Country: 'MOROCCO, FRANCE ',
      Credentials:
        'Social Activist : Founder & President, Imad Ibn Ziaten Youth Association for Peace : Zayed Award for Human Fraternity 2021, National Order of the Legion of Honour 2015',
    },
    // list 9
    {
      // "S_No": 14,
      View: '',
      Profile_Photo: 'speaker29.png',
      Name: 'Lech Walesa, Ex-President',
      Country: 'POLAND',
      Credentials:
        'Politician, Trade Union Activist : Nobel Peace Laureate 1983',
    },
    {
      // "S_No": 15,
      View: '',
      Profile_Photo: 'speaker3.png',
      Name: 'Leymah Gbowee',
      Country: 'LIBERIA',
      Credentials: 'Nobel Peace Laureate 2011',
    },
    {
      // "S_No": 16,
      View: '',
      Profile_Photo: 'speaker10.png',
      Name: 'Lokesh Ji Muni Acharya, Dr, His Holiness',
      Country: 'INDIA',
      Credentials:
        'Founder, Ahimsa Vishwa Bharti & World Peace Centre Global Peace Ambassador, Jain Religion Spiritual Leader',
    },
    // list 10
    {
      // "S_No": 17,
      View: '',
      Profile_Photo: 'speaker30.png',
      Name: 'Mahawa Simou Diouf, Judge President of the Court of Justice of WAEMU (West African Monetary & Economic Union)',
      Country: 'BURKINA FASO',
      Credentials:
        'Head of Association of Judges of 8 countries in West Africa',
    },
    {
      // "S_No": 17,
      View: '',
      Profile_Photo: 'speaker31.png',
      Name: 'Mahesh Bhupathi',
      Country: 'INDIA',
      Credentials:
        'Tennis : Former World Number 1 Doubles Tennis Player, 12 times Grand Slam Doubles Winner ',
    },
    {
      // "S_No": 18,
      View: '',
      Profile_Photo: 'speaker64.png',
      Name: 'Maqsoud Cruz',
      Country: 'UAE',
      Credentials: 'Chairman, National Human Rights Commission, UAE',
    },
    {
      // "S_No": 18,
      View: '',
      Profile_Photo: 'speaker11.png',
      Name: 'Mario-Max Schaumburg-Lippe, His Highness, Dr. Prince',
      Country: 'DENMARK',
      Credentials: 'Royalty, TV Host, Philanthropist',
    },
    // list 11
    {
      // "S_No": 19,
      View: '',
      Profile_Photo: 'speaker46.png',
      Name: 'Mary Kom',
      Country: 'INDIA',
      Credentials: 'Boxer, 6 times World Champion',
    },
    {
      // "S_No": 20,
      View: 'salam',
      Profile_Photo: 'speaker12.png',
      Name: 'Mohammed Abd-Salam, His Excellency, Judge',
      Country: 'EGYPT',
      Credentials:
        'Secretary General of the Muslim Council of Elders & Co-President of Religions for Peace',
    },
    {
      // "S_No": 21,
      View: '',
      Profile_Photo: 'speaker65.png',
      Name: 'Mohamed Fadhel Mahfoudh',
      Country: 'TUNISIA',
      Credentials:
        'Nobel Peace Laureate 2015 : President, Tunisian Order of Lawyers',
    },
    // list 12
    {
      // "S_No": 21,
      View: 'asif',
      Profile_Photo: 'speaker8.png',
      Name: 'Mohammed Asif Ali, Nawabzada',
      Country: 'INDIA',
      Credentials: 'Royalty Heir Apparent to the Prince of Arcot',
    },
    {
      // "S_No": 17,
      View: '',
      Profile_Photo: 'speaker44.png',
      Name: 'Mohammad Tawhidi, Imam',
      Country: 'AUSTRALIA',
      Credentials:
        'Islamic Religious Leader : Vice President, Global Imams Council & Chairman, Senior Imams Committee',
    },
    {
      // "S_No": 22,
      View: '',
      Profile_Photo: 'speaker32.png',
      Name: 'Mohan Munasinghe, Prof, Deshmanya',
      Country: 'SRI LANKA',
      Credentials: 'Nobel Peace Laureate 2007',
    },
    // list 13
    {
      // "S_No": 23,
      View: '',
      Profile_Photo: 'speaker33.png',
      Name: 'Mustapha Njie',
      Country: 'GAMBIA',
      Credentials: 'Industrialist : Chairman, TAF Global',
    },
    {
      // "S_No": 17,
      View: '',
      Profile_Photo: 'speaker73.png',
      Name: 'Nadia Murad',
      Country: 'IRAQ',
      Credentials: 'Social Activist: Nobel Peace Laureate 2018',
    },
    {
      // "S_No": 25,
      View: 'nadir',
      Profile_Photo: 'speaker2.png',
      Name: 'Nadir Godrej',
      Country: 'INDIA',
      Credentials: 'Industrialist: Chairman, Godrej Industries',
    },
    {
      // "S_No": 17,
      View: '',
      Profile_Photo: 'speaker66.png',
      Name: 'Naresh Kumar Bhawnani',
      Country: 'UAE',
      Credentials: 'Industrialist : Founder & Chairman, West Zone Group',
    },
    // list 14
    {
      // "S_No": 17,
      View: '',
      Profile_Photo: 'speaker34.png',
      Name: 'Nii Tackie Tackie Tsuru II, King, His Royal Majesty ',
      Country: 'GHANA',
      Credentials: 'Royalty',
    },
    {
      // "S_No": 26,
      View: '',
      Profile_Photo: 'speaker13.png',
      Name: 'Oheneba Nana Kwame Obeng II, His Royal Highness',
      Country: 'GHANA',
      Credentials: 'Royalty, The Royal House of Sefwi Obeng-Mim',
    },
    {
      // "S_No": 27,
      View: '',
      Profile_Photo: 'speaker68.png',
      Name: 'Ouided Bouchamaoui',
      Country: 'TUNISIA',
      Credentials: 'Nobel Peace Laureate 2015',
    },
    // list 15
    {
      // "S_No": 27,
      View: '',
      Profile_Photo: 'speaker67.png',
      Name: 'Oscar Arias Sanchez, His Excellency ',
      Country: 'COSTA RICA',
      Credentials: 'Nobel Peace Laureate 1987, Ex-President of Costa Rica',
    },
    // {
    //   View: '',
    //   Profile_Photo: 'speaker35.png',
    //   Name: 'Paco Soleil',
    //   Country: 'SPAIN',
    //   Credentials: 'Artist, Peace Painter (live performance)',
    // },
    // {

    //   View: '',
    //   Profile_Photo: null,
    //   Name: 'P V Sindhu',
    //   Country: 'INDIA',
    //   Credentials:
    //     'Badminton World Champion (2019) (final confirmation based on tournament schedule)',
    // },
    {
      // "S_No": 30,
      View: '',
      Profile_Photo: 'speaker74.webp',
      Name: 'Rahul V Karad, Dr',
      Country: 'INDIA',
      Credentials: 'Executive President, MIT World Peace University',
    },
    {
      // "S_No": 30,
      View: 'rina',
      Profile_Photo: 'speaker6.png',
      Name: 'Rina Telesphore, Dr, His Royal Highness, The Prince',
      Country: 'MADAGASCAR',
      Credentials: 'Royalty, Pastor, Philanthropist',
    },
    // list 16
    {
      // "S_No": 31,
      View: '',
      Profile_Photo: 'speaker69.png',
      Name: 'Roby Kannamchirayil, Father, Dr.',
      Country: 'INDIA',
      Credentials:
        'Catholic Priest, Promotor of Peace & Inter-Religious Dialogue',
    },
    {
      // "S_No": 31,
      View: 'romona',
      Profile_Photo: 'speaker9.png',
      Name: 'Romona Murad Dr., Her Royal Highness Princess Dato Seri',
      Country: 'MALAYSIA',
      Credentials: 'Royalty, Philanthropist, Peace Activist',
    },
    {
      // "S_No": 32,
      View: '',
      Profile_Photo: 'speaker4.png',
      Name: 'Rui Duarte de Barros, His Excellency',
      Country: 'GUINEA BISSAU',
      Credentials: 'Prime Minister',
    },
    // list 17
    
    {
      // "S_No": 33,
      View: '',
      Profile_Photo: 'speaker36.png',
      Name: 'Sanjay Khan',
      Country: 'INDIA',
      Credentials: 'Producer, Director, & Actor',
    },
    {
      // "S_No": 34,
      View: '',
      Profile_Photo: 'speaker70.png',
      Name: 'Sanjeev Kapoor',
      Country: 'INDIA',
      Credentials: 'World Renowned Chef',
    },
    {
      // "S_No": 33,
      View: '',
      Profile_Photo: 'speaker37.png',
      Name: 'Sara Al Madani',
      Country: 'UAE',
      Credentials: 'TV personality, entrepreneur',
    },
    {
      // "S_No": 33,
      View: 'satpal',
      Profile_Photo: 'speaker15.png',
      Name: 'Satpal Singh Khalsa, Bhai Saheb',
      Country: 'USA',
      Credentials: 'Ambassador of Sikh Dharma',
    },
    // list 18
    {
      // "S_No": 34,
      View: '',
      Profile_Photo: 'speaker48.png',
      Name: 'Shirin Ebadi, Dr. ',
      Country: 'IRAN',
      Credentials: 'Social Activist, Judge, Lawyer : Nobel Peace Laureate 2003',
    },
    {
      // "S_No": 34,
      View: '',
      Profile_Photo: 'speaker71.png',
      Name: 'Sie-A-Nyene Gyapay Yuoh, Her Honour',
      Country: 'LIBERIA',
      Credentials: 'Chief Justice of Liberia',
    },
    {
      // "S_No": 34,
      View: '',
      Profile_Photo: 'speaker72.png',
      Name: 'Soha Ali Khan',
      Country: 'INDIA',
      Credentials: 'Producer & Actress, Royalty',
    },
    {
      // "S_No": 1,
      View: '',
      Profile_Photo: 'speaker17.png',
      Name: 'Sultan Ali Rashed Lootah',
      Country: 'UAE',
      Credentials:
        'Industrialist : Chairman & Managing Partner, Vault Investments + Chairman & MD, Relam Investments + Founder & MD, Sultan Lootah  Petroleum Company',
    },
    {
      // "S_No": 35,
      View: '',
      Profile_Photo: 'speaker38.png',
      Name: 'Surender Singh Kandhari',
      Country: 'UAE',
      Credentials: 'Industrialist : Chairman, Al Dobowi Group',
    },
    // list 19
    {
      // "S_No": 35,
      View: '',
      Profile_Photo: 'speaker39.png',
      Name: 'Tehemton Burjor Mirza, Dastur',
      Country: 'INDIA',
      Credentials:
        'High Priest, Shreeji Pak Iranshah Atash Behram, Udvada : Zoroastrian Religion Leader',
    },
    {
      // "S_No": 36,
      View: '',
      Profile_Photo: 'speaker40.png',
      Name: 'Thich Nhat Tu, Most Venerable, Dr.',
      Country: 'VIETNAM',
      Credentials:
        'Vice-President, Vietnam Buddhist Sangha & Permanent Vice-Chancellor, Vietnam Buddhist Society : Buddhist Religion Leader',
    },
    {
      // "S_No": 37,
      View: '',
      Profile_Photo: 'speaker47.png',
      Name: 'Urvashi Rautela',
      Country: 'INDIA',
      Credentials: 'Actor & Model',
    },
    // list 20
    {
      // "S_No": 37,
      View: '',
      Profile_Photo: 'speaker45.png',
      Name: 'Venkatramani R, Honorable',
      Country: 'INDIA',
      Credentials: 'Attorney General of India',
    },
    {
      // "S_No": 37,
      View: '',
      Profile_Photo: 'speaker41.png',
      Name: 'Yankuba Dibba, Ambassador, His Excellency',
      Country: 'GAMBIA',
      Credentials: 'CEO, OIC (Organisation of Islamic Countries)',
    },
    {
      // "S_No": 38,
      View: '',
      Profile_Photo: 'speaker42.png',
      Name: 'Yasmin Karachiwala',
      Country: 'INDIA',
      Credentials: 'Celebrity Fitness Trainer',
    },
    // list 21
    {
      // "S_No": 39,
      View: '',
      Profile_Photo: 'speaker43.png',
      Name: 'Zayed Khan',
      Country: 'INDIA',
      Credentials: 'Producer & Actor',
    },
  ];

  speakersList: any[] = [
    // list 1
    {
      // "S_No": 1,
      View: '',
      Profile_Photo: 'speaker16.png',
      Name: 'Abdesattar Ben Moussa',
      Country: 'TUNISIA',
      Credentials: 'Lawyer, Human Rights Activist : Nobel Peace Laureate 2015',
    },
    // list 2
    {
      // "S_No": 1,
      View: '',
      Profile_Photo: 'speaker50.png',
      Name: 'Alpha Sesay, Esquire, Honorable',
      Country: 'SIERRA LEONE',
      Credentials: 'Attorney General & Minister of Justice, Sierra Leone',
    },
    {
      // "S_No": 1,
      View: '',
      Profile_Photo: 'speaker18.png',
      Name: 'Antonia Zu Schaumburg-Lippe, Dr, Her Highness Princess',
      Country: 'DENMARK',
      Credentials: 'Royalty, Lawyer, Philanthropist',
    },
    {
      // "S_No": 1,
      View: '',
      Profile_Photo: 'speaker19.png',
      Name: 'Arjuna Ranatunga, Deshamanya',
      Country: 'SRI LANKA',
      Credentials: 'Cricketer & Politician',
    },
    {
      // "S_No": 1,
      View: '',
      Profile_Photo: 'speaker51.png',
      Name: 'Asle Toje',
      Country: 'NORWAY',
      Credentials: 'Deputy Leader, Norwegian Nobel Committee',
    },
    {
      // "S_No": 1,
      View: '',
      Profile_Photo: 'speaker20.png',
      Name: 'Baba Ramdev',
      Country: 'INDIA',
      Credentials: 'World Yoga Guru',
    },
    // list 3
    {
      // "S_No": 2,
      View: '',
      Profile_Photo: 'speaker21.png',
      Name: 'Banagala Upatissa Thero, Most Venerable ',
      Country: 'SRI LANKA',
      Credentials:
        'President of Mahabodhi Society, Sri Lanka : Buddhist Religious Leader',
    },
    {
      // "S_No": 3,
      View: 'binod',
      Profile_Photo: 'speaker14.png',
      Name: 'Binod Kumar Chaudhary  ',
      Country: 'NEPAL',
      Credentials:
        'President, Chaudhary Group : Industrialist, Member of House of Representatives of Nepal',
    },
    {
      // "S_No": 4,
      View: '',
      Profile_Photo: 'speaker22.png',
      Name: 'Chandra Kumar Bose ',
      Country: 'INDIA',
      Credentials:
        'Socio-Political Activist & Convenor, The Open Platform for Netaji : ( grand nephew of Subhash Chandra Bose ) ',
    },
    // list 4
    {
      // "S_No": 5,
      View: '',
      Profile_Photo: 'speaker56.png',
      Name: 'Dalip Singh Rana, The Great Khali',
      Country: 'USA, INDIA',
      Credentials: 'Wrestler : 1st Indian born World Heavyweight Champion, WWE',
    },
    {
      // "S_No": 5,
      View: '',
      Profile_Photo: 'speaker52.png',
      Name: 'Deepa Malik, Dr.',
      Country: 'INDIA',
      Credentials:
        'Sports Champion : Silver Medallist at 2016 Rio Paralympics ',
    },
    {
      // "S_No": 6,
      View: '',
      Profile_Photo: 'speaker53.png',
      Name: 'Dia Mirza',
      Country: 'INDIA',
      Credentials: 'Beauty Queen, Actress',
    },
    // list 5
    {
      // "S_No": 6,
      View: '',
      Profile_Photo: 'speaker54.png',
      Name: 'Ekaterina Zagladina',
      Country: 'RUSSIA ',
      Credentials:
        'President of the Permanent Secretariat of the World Summit of Nobel Peace Laureates',
    },
    {
      // "S_No": 7,
      View: '',
      Profile_Photo: 'speaker23.png',
      Name: 'Esha Deol',
      Country: 'INDIA ',
      Credentials: 'Actress',
    },
    {
      // "S_No": 8,
      View: '',
      Profile_Photo: 'speaker55.png',
      Name: 'Feizi Masrour Milani, Dr.',
      Country: 'BRAZIL',
      Credentials:
        'Elected Representative, National Spiritual Assembly of the Bahais of Brazil',
    },
    // list 6
    {
      // "S_No": 10,
      View: 'habil',
      Profile_Photo: 'speaker7.png',
      Name: 'Habil Khorakiwala, Dr.',
      Country: 'INDIA',
      Credentials: 'Industrialist : Chairman, Wockhardt Group',
    },
    {
      // "S_No": 11,
      View: '',
      Profile_Photo: 'speaker24.png',
      Name: 'Hassan Babacar Jallow, Lord Chief Justice',
      Country: 'GAMBIA ',
      Credentials: 'Chief Justice of the Supreme Court of Gambia',
    },
    {
      // "S_No": 12,
      View: '',
      Profile_Photo: 'speaker25.png',
      Name: 'Hezena Lemaletian, Senator, Ambassador',
      Country: 'KENYA',
      Credentials:
        'Politician ( Member of Parliament ), Royalty ( Queen of the North Kenya ), Beauty Queen ( Miss Commonwealth Kenya, 2018 )',
    },
    // list 7
    {
      // "S_No": 12,
      View: '',
      Profile_Photo: 'speaker57.png',
      Name: 'Hlubi Mboya-Arnold',
      Country: 'SOUTH AFRICA',
      Credentials: 'Actress, Humanitarian',
    },
    {
      // "S_No": 12,
      View: '',
      Profile_Photo: 'speaker58.png',
      Name: 'Hoda Galal Yassa, Dr.',
      Country: 'EGYPT',
      Credentials: 'Industrialist : President, Arab Women Investors Union',
    },
    {
      // "S_No": 12,
      View: '',
      Profile_Photo: 'speaker26.png',
      Name: 'Houcine Abbasi',
      Country: 'TUNISIA',
      Credentials: 'Educationist : Nobel Peace Laureate 2015',
    },
    {
      // "S_No": 12,
      View: '',
      Profile_Photo: 'speaker59.png',
      Name: 'Jacqueline Fernandez',
      Country: 'SRI LANKA, INDIA',
      Credentials: 'Beauty Queen, Actress',
    },
    {
      // "S_No": 13,
      View: '',
      Profile_Photo: 'speaker27.png',
      Name: 'Juan Carlos Sainz-Borgo, Dr.',
      Country: 'COSTA RICA',
      Credentials: 'Vice Rector, University of Peace ',
    },
    // list 8
    {
      // "S_No": 13,
      View: '',
      Profile_Photo: 'speaker1.png',
      Name: 'Kailash Satyarthi',
      Country: 'INDIA',
      Credentials: 'Social Activist, Nobel Peace Laureate 2014',
    },
    {
      // "S_No": 14,
      View: '',
      Profile_Photo: 'speaker62.png',
      Name: 'Kili Paul',
      Country: 'TANZANIAN',
      Credentials: 'Content Creator and Social Media Influencer Honoured by the High Commission of India in Tanzania',
    },
    {
      // "S_No": 14,
      View: '',
      Profile_Photo: 'speaker63.png',
      Name: 'Kriti Kharbanda',
      Country: 'INDIA',
      Credentials: 'Actress ( Hindi, South Indian )',
    },
    {
      // "S_No": 14,
      View: '',
      Profile_Photo: 'speaker28.png',
      Name: 'Latifa Ibn Ziaten',
      Country: 'MOROCCO, FRANCE ',
      Credentials:
        'Social Activist : Founder & President, Imad Ibn Ziaten Youth Association for Peace : Zayed Award for Human Fraternity 2021, National Order of the Legion of Honour 2015',
    },
    // list 9
    {
      // "S_No": 14,
      View: '',
      Profile_Photo: 'speaker29.png',
      Name: 'Lech Walesa, Ex-President',
      Country: 'POLAND',
      Credentials:
        'Politician, Trade Union Activist : Nobel Peace Laureate 1983',
    },
    {
      // "S_No": 15,
      View: '',
      Profile_Photo: 'speaker3.png',
      Name: 'Leymah Gbowee',
      Country: 'LIBERIA',
      Credentials: 'Nobel Peace Laureate 2011',
    },
    {
      // "S_No": 16,
      View: '',
      Profile_Photo: 'speaker10.png',
      Name: 'Lokesh Ji Muni Acharya, Dr, His Holiness',
      Country: 'INDIA',
      Credentials:
        'Founder, Ahimsa Vishwa Bharti & World Peace Centre Global Peace Ambassador, Jain Religion Spiritual Leader',
    },
    // list 10
    {
      // "S_No": 17,
      View: '',
      Profile_Photo: 'speaker30.png',
      Name: 'Mahawa Simou Diouf, Judge President of the Court of Justice of WAEMU (West African Monetary & Economic Union)',
      Country: 'BURKINA FASO',
      Credentials:
        'Head of Association of Judges of 8 countries in West Africa',
    },
    {
      // "S_No": 17,
      View: '',
      Profile_Photo: 'speaker31.png',
      Name: 'Mahesh Bhupathi',
      Country: 'INDIA',
      Credentials:
        'Tennis : Former World Number 1 Doubles Tennis Player, 12 times Grand Slam Doubles Winner ',
    },
    {
      // "S_No": 18,
      View: '',
      Profile_Photo: 'speaker64.png',
      Name: 'Maqsoud Cruz',
      Country: 'UAE',
      Credentials: 'Chairman, National Human Rights Commission, UAE',
    },
    {
      // "S_No": 18,
      View: '',
      Profile_Photo: 'speaker11.png',
      Name: 'Mario-Max Schaumburg-Lippe, His Highness, Dr. Prince',
      Country: 'DENMARK',
      Credentials: 'Royalty, TV Host, Philanthropist',
    },
    // list 11
    {
      // "S_No": 19,
      View: '',
      Profile_Photo: 'speaker46.png',
      Name: 'Mary Kom',
      Country: 'INDIA',
      Credentials: 'Boxer, 6 times World Champion',
    },
    {
      // "S_No": 20,
      View: 'salam',
      Profile_Photo: 'speaker12.png',
      Name: 'Mohammed Abd-Salam, His Excellency, Judge',
      Country: 'EGYPT',
      Credentials:
        'Secretary General of the Muslim Council of Elders & Co-President of Religions for Peace',
    },
    {
      // "S_No": 21,
      View: '',
      Profile_Photo: 'speaker65.png',
      Name: 'Mohamed Fadhel Mahfoudh',
      Country: 'TUNISIA',
      Credentials:
        'Nobel Peace Laureate 2015 : President, Tunisian Order of Lawyers',
    },
    // list 12
    {
      // "S_No": 21,
      View: 'asif',
      Profile_Photo: 'speaker8.png',
      Name: 'Mohammed Asif Ali, Nawabzada',
      Country: 'INDIA',
      Credentials: 'Royalty Heir Apparent to the Prince of Arcot',
    },
    {
      // "S_No": 17,
      View: '',
      Profile_Photo: 'speaker44.png',
      Name: 'Mohammad Tawhidi, Imam',
      Country: 'AUSTRALIA',
      Credentials:
        'Islamic Religious Leader : Vice President, Global Imams Council & Chairman, Senior Imams Committee',
    },
    {
      // "S_No": 22,
      View: '',
      Profile_Photo: 'speaker32.png',
      Name: 'Mohan Munasinghe, Prof, Deshmanya',
      Country: 'SRI LANKA',
      Credentials: 'Nobel Peace Laureate 2007',
    },
    // list 13

    {
      // "S_No": 23,
      View: '',
      Profile_Photo: 'speaker33.png',
      Name: 'Mustapha Njie',
      Country: 'GAMBIA',
      Credentials: 'Industrialist : Chairman, TAF Global',
    },
    {
      // "S_No": 17,
      View: '',
      Profile_Photo: 'speaker73.png',
      Name: 'Nadia Murad',
      Country: 'IRAQ',
      Credentials: 'Social Activist: Nobel Peace Laureate 2018',
    },
    {
      // "S_No": 25,
      View: 'nadir',
      Profile_Photo: 'speaker2.png',
      Name: 'Nadir Godrej',
      Country: 'INDIA',
      Credentials: 'Industrialist: Chairman, Godrej Industries',
    },
    {
      // "S_No": 17,
      View: '',
      Profile_Photo: 'speaker66.png',
      Name: 'Naresh Kumar Bhawnani',
      Country: 'UAE',
      Credentials: 'Industrialist : Founder & Chairman, West Zone Group',
    },
    // list 14
    {
      // "S_No": 17,
      View: '',
      Profile_Photo: 'speaker34.png',
      Name: 'Nii Tackie Tackie Tsuru II, King, His Royal Majesty ',
      Country: 'GHANA',
      Credentials: 'Royalty',
    },
    {
      // "S_No": 26,
      View: '',
      Profile_Photo: 'speaker13.png',
      Name: 'Oheneba Nana Kwame Obeng II, His Royal Highness',
      Country: 'GHANA',
      Credentials: 'Royalty, The Royal House of Sefwi Obeng-Mim',
    },
    {
      // "S_No": 27,
      View: '',
      Profile_Photo: 'speaker68.png',
      Name: 'Ouided Bouchamaoui',
      Country: 'TUNISIA',
      Credentials: 'Nobel Peace Laureate 2015',
    },
    // list 15
    {
      // "S_No": 27,
      View: '',
      Profile_Photo: 'speaker67.png',
      Name: 'Oscar Arias Sanchez, His Excellency ',
      Country: 'COSTA RICA',
      Credentials: 'Nobel Peace Laureate 1987, Ex-President of Costa Rica',
    },
    // {
    //   View: '',
    //   Profile_Photo: 'speaker35.png',
    //   Name: 'Paco Soleil',
    //   Country: 'SPAIN',
    //   Credentials: 'Artist, Peace Painter (live performance)',
    // },
    // {

    //   View: '',
    //   Profile_Photo: null,
    //   Name: 'P V Sindhu',
    //   Country: 'INDIA',
    //   Credentials:
    //     'Badminton World Champion (2019) (final confirmation based on tournament schedule)',
    // },
    {
      // "S_No": 30,
      View: '',
      Profile_Photo: 'speaker74.webp',
      Name: 'Rahul V Karad, Dr',
      Country: 'INDIA',
      Credentials: 'Executive President, MIT World Peace University',
    },
    {
      // "S_No": 30,
      View: 'rina',
      Profile_Photo: 'speaker6.png',
      Name: 'Rina Telesphore, Dr, His Royal Highness, The Prince',
      Country: 'MADAGASCAR',
      Credentials: 'Royalty, Pastor, Philanthropist',
    },
    // list 16
    {
      // "S_No": 31,
      View: '',
      Profile_Photo: 'speaker69.png',
      Name: 'Roby Kannamchirayil, Father, Dr.',
      Country: 'INDIA',
      Credentials:
        'Catholic Priest, Promotor of Peace & Inter-Religious Dialogue',
    },
    {
      // "S_No": 31,
      View: 'romona',
      Profile_Photo: 'speaker9.png',
      Name: 'Romona Murad Dr., Her Royal Highness Princess Dato Seri',
      Country: 'MALAYSIA',
      Credentials: 'Royalty, Philanthropist, Peace Activist',
    },
    {
      // "S_No": 32,
      View: '',
      Profile_Photo: 'speaker4.png',
      Name: 'Rui Duarte de Barros, His Excellency',
      Country: 'GUINEA BISSAU',
      Credentials: 'Prime Minister',
    },
    // list 17
    
    {
      // "S_No": 33,
      View: '',
      Profile_Photo: 'speaker36.png',
      Name: 'Sanjay Khan',
      Country: 'INDIA',
      Credentials: 'Producer, Director, & Actor',
    },
    {
      // "S_No": 34,
      View: '',
      Profile_Photo: 'speaker70.png',
      Name: 'Sanjeev Kapoor',
      Country: 'INDIA',
      Credentials: 'World Renowned Chef',
    },
    {
      // "S_No": 33,
      View: '',
      Profile_Photo: 'speaker37.png',
      Name: 'Sara Al Madani',
      Country: 'UAE',
      Credentials: 'TV personality, entrepreneur',
    },
    {
      // "S_No": 33,
      View: 'satpal',
      Profile_Photo: 'speaker15.png',
      Name: 'Satpal Singh Khalsa, Bhai Saheb',
      Country: 'USA',
      Credentials: 'Ambassador of Sikh Dharma',
    },
    // list 18
    {
      // "S_No": 34,
      View: '',
      Profile_Photo: 'speaker48.png',
      Name: 'Shirin Ebadi, Dr. ',
      Country: 'IRAN',
      Credentials: 'Social Activist, Judge, Lawyer : Nobel Peace Laureate 2003',
    },
    {
      // "S_No": 34,
      View: '',
      Profile_Photo: 'speaker71.png',
      Name: 'Sie-A-Nyene Gyapay Yuoh, Her Honour',
      Country: 'LIBERIA',
      Credentials: 'Chief Justice of Liberia',
    },
    {
      // "S_No": 34,
      View: '',
      Profile_Photo: 'speaker72.png',
      Name: 'Soha Ali Khan',
      Country: 'INDIA',
      Credentials: 'Producer & Actress, Royalty',
    },
    {
      // "S_No": 1,
      View: '',
      Profile_Photo: 'speaker17.png',
      Name: 'Sultan Ali Rashed Lootah',
      Country: 'UAE',
      Credentials:
        'Industrialist : Chairman & Managing Partner, Vault Investments + Chairman & MD, Relam Investments + Founder & MD, Sultan Lootah  Petroleum Company',
    },
    {
      // "S_No": 35,
      View: '',
      Profile_Photo: 'speaker38.png',
      Name: 'Surender Singh Kandhari',
      Country: 'UAE',
      Credentials: 'Industrialist : Chairman, Al Dobowi Group',
    },
    // list 19
    {
      // "S_No": 35,
      View: '',
      Profile_Photo: 'speaker39.png',
      Name: 'Tehemton Burjor Mirza, Dastur',
      Country: 'INDIA',
      Credentials:
        'High Priest, Shreeji Pak Iranshah Atash Behram, Udvada : Zoroastrian Religion Leader',
    },
    {
      // "S_No": 36,
      View: '',
      Profile_Photo: 'speaker40.png',
      Name: 'Thich Nhat Tu, Most Venerable, Dr.',
      Country: 'VIETNAM',
      Credentials:
        'Vice-President, Vietnam Buddhist Sangha & Permanent Vice-Chancellor, Vietnam Buddhist Society : Buddhist Religion Leader',
    },
    {
      // "S_No": 37,
      View: '',
      Profile_Photo: 'speaker47.png',
      Name: 'Urvashi Rautela',
      Country: 'INDIA',
      Credentials: 'Actor & Model',
    },
    // list 20
    {
      // "S_No": 37,
      View: '',
      Profile_Photo: 'speaker45.png',
      Name: 'Venkatramani R, Honorable',
      Country: 'INDIA',
      Credentials: 'Attorney General of India',
    },
    {
      // "S_No": 37,
      View: '',
      Profile_Photo: 'speaker41.png',
      Name: 'Yankuba Dibba, Ambassador, His Excellency',
      Country: 'GAMBIA',
      Credentials: 'CEO, OIC (Organisation of Islamic Countries)',
    },
    {
      // "S_No": 38,
      View: '',
      Profile_Photo: 'speaker42.png',
      Name: 'Yasmin Karachiwala',
      Country: 'INDIA',
      Credentials: 'Celebrity Fitness Trainer',
    },
    // list 21
    {
      // "S_No": 39,
      View: '',
      Profile_Photo: 'speaker43.png',
      Name: 'Zayed Khan',
      Country: 'INDIA',
      Credentials: 'Producer & Actor',
    },
    {
      // "S_No": 39,
      View: '',
      Profile_Photo: 'speaker60.png',
      Name: 'Jose Manuel Ramos Horta, His Excellency',
      Country: 'EAST TIMOR',
      Credentials:
        'President, East Timor & Nobel Peace Laureate, 1996 (ONLINE)',
    },
    {
      View: '',
      Profile_Photo: 'speaker61.png',
      Name: 'Joseph Boakai, His Excellency',
      Country: 'LIBERIA',
      Credentials: 'President of Liberia (ONLINE)',
    },
    // list 22
    {
      View: '',
      Profile_Photo: 'speaker49.png',
      Name: 'Sri Sri Ravishankar, Gurudev',
      Country: 'INDIA',
      Credentials: 'World Spiritual Guru : Founder, Art of Living (ONLINE)',
    },
  ];

  getSpeakersListData() {
    return [
      {
        speakers: [
          // list 1
    {
      // "S_No": 1,
      View: '',
      Profile_Photo: 'speaker16.png',
      Name: 'Abdesattar Ben Moussa',
      Country: 'TUNISIA',
      Credentials: 'Lawyer, Human Rights Activist : Nobel Peace Laureate 2015',
    },


    {
      // "S_No": 1,
      View: '',
      Profile_Photo: 'speaker50.png',
      Name: 'Alpha Sesay, Esquire, Honorable',
      Country: 'SIERRA LEONE',
      Credentials: 'Attorney General & Minister of Justice, Sierra Leone',
    },
    {
      // "S_No": 1,
      View: '',
      Profile_Photo: 'speaker18.png',
      Name: 'Antonia Zu Schaumburg-Lippe, Dr, Her Highness Princess',
      Country: 'DENMARK',
      Credentials: 'Royalty, Lawyer, Philanthropist',
    },
        ],
      },

      {
        speakers: [
          // list 2


    {
      // "S_No": 1,
      View: '',
      Profile_Photo: 'speaker19.png',
      Name: 'Arjuna Ranatunga, Deshamanya',
      Country: 'SRI LANKA',
      Credentials: 'Cricketer & Politician',
    },
    {
      // "S_No": 1,
      View: '',
      Profile_Photo: 'speaker51.png',
      Name: 'Asle Toje',
      Country: 'NORWAY',
      Credentials: 'Deputy Leader, Norwegian Nobel Committee',
    },
    {
      // "S_No": 1,
      View: '',
      Profile_Photo: 'speaker20.png',
      Name: 'Baba Ramdev',
      Country: 'INDIA',
      Credentials: 'World Yoga Guru',
    },
        ],
      },

      {
        speakers: [
          // list 3

          {
            // "S_No": 2,
            View: '',
            Profile_Photo: 'speaker21.png',
            Name: 'Banagala Upatissa Thero, Most Venerable ',
            Country: 'SRI LANKA',
            Credentials:
              'President of Mahabodhi Society, Sri Lanka : Buddhist Religious Leader',
          },
          {
            // "S_No": 3,
            View: 'binod',
            Profile_Photo: 'speaker14.png',
            Name: 'Binod Kumar Chaudhary  ',
            Country: 'NEPAL',
            Credentials:
              'President, Chaudhary Group : Industrialist, Member of House of Representatives of Nepal',
          },
          {
            // "S_No": 4,
            View: '',
            Profile_Photo: 'speaker22.png',
            Name: 'Chandra Kumar Bose ',
            Country: 'INDIA',
            Credentials:
              'Socio-Political Activist & Convenor, The Open Platform for Netaji : ( grand nephew of Subhash Chandra Bose ) ',
          },

        ],
      },

      {
        speakers: [
          // list 4

          {
            // "S_No": 5,
            View: '',
            Profile_Photo: 'speaker56.png',
            Name: 'Dalip Singh Rana, The Great Khali',
            Country: 'USA, INDIA',
            Credentials: 'Wrestler : 1st Indian born World Heavyweight Champion, WWE',
          },
          {
            // "S_No": 5,
            View: '',
            Profile_Photo: 'speaker52.png',
            Name: 'Deepa Malik, Dr.',
            Country: 'INDIA',
            Credentials:
              'Sports Champion : Silver Medallist at 2016 Rio Paralympics ',
          },
          {
            // "S_No": 6,
            View: '',
            Profile_Photo: 'speaker53.png',
            Name: 'Dia Mirza',
            Country: 'INDIA',
            Credentials: 'Beauty Queen, Actress',
          },
        ],
      },

      {
        speakers: [
          // list 5

          {
            // "S_No": 6,
            View: '',
            Profile_Photo: 'speaker54.png',
            Name: 'Ekaterina Zagladina',
            Country: 'RUSSIA ',
            Credentials:
              'President of the Permanent Secretariat of the World Summit of Nobel Peace Laureates',
          },
          {
            // "S_No": 7,
            View: '',
            Profile_Photo: 'speaker23.png',
            Name: 'Esha Deol',
            Country: 'INDIA ',
            Credentials: 'Actress',
          },
          {
            // "S_No": 8,
            View: '',
            Profile_Photo: 'speaker55.png',
            Name: 'Feizi Masrour Milani, Dr.',
            Country: 'BRAZIL',
            Credentials:
              'Elected Representative, National Spiritual Assembly of the Bahais of Brazil',
          },
        ],
      },
      {
        speakers: [
          // list 6

          {
            // "S_No": 10,
            View: 'habil',
            Profile_Photo: 'speaker7.png',
            Name: 'Habil Khorakiwala, Dr.',
            Country: 'INDIA',
            Credentials: 'Industrialist : Chairman, Wockhardt Group',
          },
          {
            // "S_No": 11,
            View: '',
            Profile_Photo: 'speaker24.png',
            Name: 'Hassan Babacar Jallow, Lord Chief Justice',
            Country: 'GAMBIA ',
            Credentials: 'Chief Justice of the Supreme Court of Gambia',
          },
          {
            // "S_No": 12,
            View: '',
            Profile_Photo: 'speaker25.png',
            Name: 'Hezena Lemaletian, Senator, Ambassador',
            Country: 'KENYA',
            Credentials:
              'Politician ( Member of Parliament ), Royalty ( Queen of the North Kenya ), Beauty Queen ( Miss Commonwealth Kenya, 2018 )',
          },
        ],
      },
      {
        speakers: [
          // list 7

          {
            // "S_No": 12,
            View: '',
            Profile_Photo: 'speaker57.png',
            Name: 'Hlubi Mboya-Arnold',
            Country: 'SOUTH AFRICA',
            Credentials: 'Actress, Humanitarian',
          },
          {
            // "S_No": 12,
            View: '',
            Profile_Photo: 'speaker58.png',
            Name: 'Hoda Galal Yassa, Dr.',
            Country: 'EGYPT',
            Credentials: 'Industrialist : President, Arab Women Investors Union',
          },

          {
            // "S_No": 12,
            View: '',
            Profile_Photo: 'speaker26.png',
            Name: 'Houcine Abbasi',
            Country: 'TUNISIA',
            Credentials: 'Educationist : Nobel Peace Laureate 2015',
          },
        ],
      },
      {
        speakers: [
          // list 8

          {
            // "S_No": 12,
            View: '',
            Profile_Photo: 'speaker59.png',
            Name: 'Jacqueline Fernandez',
            Country: 'SRI LANKA, INDIA',
            Credentials: 'Beauty Queen, Actress',
          },

          {
            // "S_No": 13,
            View: '',
            Profile_Photo: 'speaker27.png',
            Name: 'Juan Carlos Sainz-Borgo, Dr.',
            Country: 'COSTA RICA',
            Credentials: 'Vice Rector, University of Peace ',
          },
          {
            // "S_No": 13,
            View: '',
            Profile_Photo: 'speaker1.png',
            Name: 'Kailash Satyarthi',
            Country: 'INDIA',
            Credentials: 'Social Activist, Nobel Peace Laureate 2014',
          },

        ],
      },
      {
        speakers: [
          // list 9

          {
            // "S_No": 14,
            View: '',
            Profile_Photo: 'speaker62.png',
            Name: 'Kili Paul',
            Country: 'TANZANIAN',
            Credentials: 'Content Creator and Social Media Influencer Honoured by the High Commission of India in Tanzania',
          },
          {
            // "S_No": 14,
            View: '',
            Profile_Photo: 'speaker63.png',
            Name: 'Kriti Kharbanda',
            Country: 'INDIA',
            Credentials: 'Actress ( Hindi, South Indian )',
          },
          {
            // "S_No": 14,
            View: '',
            Profile_Photo: 'speaker28.png',
            Name: 'Latifa Ibn Ziaten',
            Country: 'MOROCCO, FRANCE ',
            Credentials:
              'Social Activist : Founder & President, Imad Ibn Ziaten Youth Association for Peace : Zayed Award for Human Fraternity 2021, National Order of the Legion of Honour 2015',
          },


        ],
      },

      {
        speakers: [
          // list 10

          {
            // "S_No": 14,
            View: '',
            Profile_Photo: 'speaker29.png',
            Name: 'Lech Walesa, Ex-President',
            Country: 'POLAND',
            Credentials:
              'Politician, Trade Union Activist : Nobel Peace Laureate 1983',
          },
          {
            // "S_No": 15,
            View: '',
            Profile_Photo: 'speaker3.png',
            Name: 'Leymah Gbowee',
            Country: 'LIBERIA',
            Credentials: 'Nobel Peace Laureate 2011',
          },

          {
            // "S_No": 16,
            View: '',
            Profile_Photo: 'speaker10.png',
            Name: 'Lokesh Ji Muni Acharya, Dr, His Holiness',
            Country: 'INDIA',
            Credentials:
              'Founder, Ahimsa Vishwa Bharti & World Peace Centre Global Peace Ambassador, Jain Religion Spiritual Leader',
          },

        ],
      },

      {
        speakers: [
          // list 11

          {
            // "S_No": 17,
            View: '',
            Profile_Photo: 'speaker30.png',
            Name: 'Mahawa Simou Diouf, Judge President of the Court of Justice of WAEMU (West African Monetary & Economic Union)',
            Country: 'BURKINA FASO',
            Credentials:
              'Head of Association of Judges of 8 countries in West Africa',
          },
          {
            // "S_No": 17,
            View: '',
            Profile_Photo: 'speaker31.png',
            Name: 'Mahesh Bhupathi',
            Country: 'INDIA',
            Credentials:
              'Tennis : Former World Number 1 Doubles Tennis Player, 12 times Grand Slam Doubles Winner ',
          },
          {
            // "S_No": 18,
            View: '',
            Profile_Photo: 'speaker64.png',
            Name: 'Maqsoud Cruz',
            Country: 'UAE',
            Credentials: 'Chairman, National Human Rights Commission, UAE',
          },


        ],
      },

      {
        speakers: [
          // list 12

          {
            // "S_No": 18,
            View: '',
            Profile_Photo: 'speaker11.png',
            Name: 'Mario-Max Schaumburg-Lippe, His Highness, Dr. Prince',
            Country: 'DENMARK',
            Credentials: 'Royalty, TV Host, Philanthropist',
          },
          {
            // "S_No": 19,
            View: '',
            Profile_Photo: 'speaker46.png',
            Name: 'Mary Kom',
            Country: 'INDIA',
            Credentials: 'Boxer, 6 times World Champion',
          },
          {
            // "S_No": 20,
            View: 'salam',
            Profile_Photo: 'speaker12.png',
            Name: 'Mohammed Abd-Salam, His Excellency, Judge',
            Country: 'EGYPT',
            Credentials:
              'Secretary General of the Muslim Council of Elders & Co-President of Religions for Peace',
          },



        ],
      },
      {
        speakers: [
          // list 13

          {
            // "S_No": 21,
            View: '',
            Profile_Photo: 'speaker65.png',
            Name: 'Mohamed Fadhel Mahfoudh',
            Country: 'TUNISIA',
            Credentials:
              'Nobel Peace Laureate 2015 : President, Tunisian Order of Lawyers',
          },
          {
            // "S_No": 21,
            View: 'asif',
            Profile_Photo: 'speaker8.png',
            Name: 'Mohammed Asif Ali, Nawabzada',
            Country: 'INDIA',
            Credentials: 'Royalty Heir Apparent to the Prince of Arcot',
          },

          {
            // "S_No": 17,
            View: '',
            Profile_Photo: 'speaker44.png',
            Name: 'Mohammad Tawhidi, Imam',
            Country: 'AUSTRALIA',
            Credentials:
              'Islamic Religious Leader : Vice President, Global Imams Council & Chairman, Senior Imams Committee',
          },



        ],
      },
      {
        speakers: [
          // list 14

          {
            // "S_No": 22,
            View: '',
            Profile_Photo: 'speaker32.png',
            Name: 'Mohan Munasinghe, Prof, Deshmanya',
            Country: 'SRI LANKA',
            Credentials: 'Nobel Peace Laureate 2007',
          },
          {
            // "S_No": 23,
            View: '',
            Profile_Photo: 'speaker33.png',
            Name: 'Mustapha Njie',
            Country: 'GAMBIA',
            Credentials: 'Industrialist : Chairman, TAF Global',
          },

          {
            // "S_No": 17,
            View: '',
            Profile_Photo: 'speaker73.png',
            Name: 'Nadia Murad',
            Country: 'IRAQ',
            Credentials: 'Social Activist: Nobel Peace Laureate 2018',
          },



        ],
      },
      {
        speakers: [
          // list 15

          {
            // "S_No": 25,
            View: 'nadir',
            Profile_Photo: 'speaker2.png',
            Name: 'Nadir Godrej',
            Country: 'INDIA',
            Credentials: 'Industrialist: Chairman, Godrej Industries',
          },
          {
            // "S_No": 17,
            View: '',
            Profile_Photo: 'speaker66.png',
            Name: 'Naresh Kumar Bhawnani',
            Country: 'UAE',
            Credentials: 'Industrialist : Founder & Chairman, West Zone Group',
          },
          {
            // "S_No": 17,
            View: '',
            Profile_Photo: 'speaker34.png',
            Name: 'Nii Tackie Tackie Tsuru II, King, His Royal Majesty ',
            Country: 'GHANA',
            Credentials: 'Royalty',
          },


        ],
      },
      {
        speakers: [
          // list 16

          {
            // "S_No": 26,
            View: '',
            Profile_Photo: 'speaker13.png',
            Name: 'Oheneba Nana Kwame Obeng II, His Royal Highness',
            Country: 'GHANA',
            Credentials: 'Royalty, The Royal House of Sefwi Obeng-Mim',
          },

          {
            // "S_No": 27,
            View: '',
            Profile_Photo: 'speaker68.png',
            Name: 'Ouided Bouchamaoui',
            Country: 'TUNISIA',
            Credentials: 'Nobel Peace Laureate 2015',
          },

          {
            // "S_No": 27,
            View: '',
            Profile_Photo: 'speaker67.png',
            Name: 'Oscar Arias Sanchez, His Excellency ',
            Country: 'COSTA RICA',
            Credentials: 'Nobel Peace Laureate 1987, Ex-President of Costa Rica',
          },



        ],
      },
      {
        speakers: [
          // list 17

          // {
          //   View: '',
          //   Profile_Photo: 'speaker35.png',
          //   Name: 'Paco Soleil',
          //   Country: 'SPAIN',
          //   Credentials: 'Artist, Peace Painter (live performance)',
          // },
          {
            // "S_No": 30,
            View: '',
            Profile_Photo: 'speaker74.webp',
            Name: 'Rahul V Karad, Dr',
            Country: 'INDIA',
            Credentials: 'Executive President, MIT World Peace University',
          },
          {
            // "S_No": 30,
            View: 'rina',
            Profile_Photo: 'speaker6.png',
            Name: 'Rina Telesphore, Dr, His Royal Highness, The Prince',
            Country: 'MADAGASCAR',
            Credentials: 'Royalty, Pastor, Philanthropist',
          },


          {
            // "S_No": 31,
            View: '',
            Profile_Photo: 'speaker69.png',
            Name: 'Roby Kannamchirayil, Father, Dr.',
            Country: 'INDIA',
            Credentials:
              'Catholic Priest, Promotor of Peace & Inter-Religious Dialogue',
          },


        ],
      },
      {
        speakers: [
          // list 18

          {
            // "S_No": 31,
            View: 'romona',
            Profile_Photo: 'speaker9.png',
            Name: 'Romona Murad Dr., Her Royal Highness Princess Dato Seri',
            Country: 'MALAYSIA',
            Credentials: 'Royalty, Philanthropist, Peace Activist',
          },
          {
            // "S_No": 32,
            View: '',
            Profile_Photo: 'speaker4.png',
            Name: 'Rui Duarte de Barros, His Excellency',
            Country: 'GUINEA BISSAU',
            Credentials: 'Prime Minister',
          },

          {
            // "S_No": 33,
            View: '',
            Profile_Photo: 'speaker36.png',
            Name: 'Sanjay Khan',
            Country: 'INDIA',
            Credentials: 'Producer, Director, & Actor',
          },


        ],
      },
      {
        speakers: [
          // list 19

          
          {
            // "S_No": 34,
            View: '',
            Profile_Photo: 'speaker70.png',
            Name: 'Sanjeev Kapoor',
            Country: 'INDIA',
            Credentials: 'World Renowned Chef',
          },

          {
            // "S_No": 33,
            View: '',
            Profile_Photo: 'speaker37.png',
            Name: 'Sara Al Madani',
            Country: 'UAE',
            Credentials: 'TV personality, entrepreneur',
          },

          {
            // "S_No": 33,
            View: 'satpal',
            Profile_Photo: 'speaker15.png',
            Name: 'Satpal Singh Khalsa, Bhai Saheb',
            Country: 'USA',
            Credentials: 'Ambassador of Sikh Dharma',
          },


        ],
      },
      {
        speakers: [
          // list 20

          {
            // "S_No": 34,
            View: '',
            Profile_Photo: 'speaker48.png',
            Name: 'Shirin Ebadi, Dr. ',
            Country: 'IRAN',
            Credentials: 'Social Activist, Judge, Lawyer : Nobel Peace Laureate 2003',
          },
          {
            // "S_No": 34,
            View: '',
            Profile_Photo: 'speaker71.png',
            Name: 'Sie-A-Nyene Gyapay Yuoh, Her Honour',
            Country: 'LIBERIA',
            Credentials: 'Chief Justice of Liberia',
          },


          {
            // "S_No": 34,
            View: '',
            Profile_Photo: 'speaker72.png',
            Name: 'Soha Ali Khan',
            Country: 'INDIA',
            Credentials: 'Producer & Actress, Royalty',
          },




        ],
      },
      {
        speakers: [
          // list 21

          {
            // "S_No": 1,
            View: '',
            Profile_Photo: 'speaker17.png',
            Name: 'Sultan Ali Rashed Lootah',
            Country: 'UAE',
            Credentials:
              'Industrialist : Chairman & Managing Partner, Vault Investments + Chairman & MD, Relam Investments + Founder & MD, Sultan Lootah  Petroleum Company',
          },
          {
            // "S_No": 35,
            View: '',
            Profile_Photo: 'speaker38.png',
            Name: 'Surender Singh Kandhari',
            Country: 'UAE',
            Credentials: 'Industrialist : Chairman, Al Dobowi Group',
          },
          {
            // "S_No": 35,
            View: '',
            Profile_Photo: 'speaker39.png',
            Name: 'Tehemton Burjor Mirza, Dastur',
            Country: 'INDIA',
            Credentials:
              'High Priest, Shreeji Pak Iranshah Atash Behram, Udvada : Zoroastrian Religion Leader',
          },






        ],
      },
      {
        speakers: [
          // list 22
          {
            // "S_No": 36,
            View: '',
            Profile_Photo: 'speaker40.png',
            Name: 'Thich Nhat Tu, Most Venerable, Dr.',
            Country: 'VIETNAM',
            Credentials:
              'Vice-President, Vietnam Buddhist Sangha & Permanent Vice-Chancellor, Vietnam Buddhist Society : Buddhist Religion Leader',
          },

          {
            // "S_No": 37,
            View: '',
            Profile_Photo: 'speaker47.png',
            Name: 'Urvashi Rautela',
            Country: 'INDIA',
            Credentials: 'Actor & Model',
          },
          {
            // "S_No": 37,
            View: '',
            Profile_Photo: 'speaker45.png',
            Name: 'Venkatramani R, Honorable',
            Country: 'INDIA',
            Credentials: 'Attorney General of India',
          },





        ],
      },
      {
        speakers: [
          // list 22
          {
            // "S_No": 37,
            View: '',
            Profile_Photo: 'speaker41.png',
            Name: 'Yankuba Dibba, Ambassador, His Excellency',
            Country: 'GAMBIA',
            Credentials: 'CEO, OIC (Organisation of Islamic Countries)',
          },
          {
            // "S_No": 38,
            View: '',
            Profile_Photo: 'speaker42.png',
            Name: 'Yasmin Karachiwala',
            Country: 'INDIA',
            Credentials: 'Celebrity Fitness Trainer',
          },
          {
            // "S_No": 39,
            View: '',
            Profile_Photo: 'speaker43.png',
            Name: 'Zayed Khan',
            Country: 'INDIA',
            Credentials: 'Producer & Actor',
          },

        ],
      },
      {
        speakers: [
          {
            // "S_No": 39,
            View: '',
            Profile_Photo: 'speaker60.png',
            Name: 'Jose Manuel Ramos Horta, His Excellency',
            Country: 'EAST TIMOR',
            Credentials:
              'President, East Timor & Nobel Peace Laureate, 1996 (ONLINE)',
          },

          {
            View: '',
            Profile_Photo: 'speaker61.png',
            Name: 'Joseph Boakai, His Excellency',
            Country: 'LIBERIA',
            Credentials: 'President of Liberia (ONLINE)',
          },

          {
            View: '',
            Profile_Photo: 'speaker49.png',
            Name: 'Sri Sri Ravishankar, Gurudev',
            Country: 'INDIA',
            Credentials: 'World Spiritual Guru : Founder, Art of Living (ONLINE)',
          },
        ],
      },
    ];
  }
}
