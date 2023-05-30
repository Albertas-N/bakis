import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Category } from './data.service';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });

    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getItemDetails() should return item details', () => {
    const mockItem: Category = {
      id: 2,
      title: "Bitininkystės muziejus",
      image_src: "https://www.pamatyklietuvoje.lt/api/Photo/83fb8252-6544-4c74-b005-572d8b630076/0/960/460/crop",
      date: null,
      address: "Pabalių g. 3, Stripeikiai, Ignalinos r.",
      content: "Muziejus duris atvėrė 1984 m. Nuo to laiko jis tapo žinomas ne tik visoje Lietuvoje. Smalsuoliai čia gali sužinoti apie Lietuvos bitininkavimo istoriją ir bitučių gyvenimo ypatumus, o smaližių čia laukia saldžios pramogos. Bitininkystės muziejuje galite užsisakyti unikalias su bitininkystę susijusias edukacines programas, stebėti bičių pasaulį pro stiklinį avilio langą.",
      email: "danute.indrasiene@aparkai.lt",
      phone_number: "+37068612105",
      working_hours: "II - VII 10.00 - 18.00 \nPirmadieniais nedirba.\n\nEkskursijos užsakomos iš anksto.",
      category: "1",
      rating: null
    };

    service.getItemDetails(1).subscribe((item) => {
      expect(item).toEqual(mockItem);
    });

    const req = httpMock.expectOne('http://16.171.43.32:7000/vilniusEvents/2/');
    expect(req.request.method).toBe('GET');
    req.flush(mockItem);
  });

});
