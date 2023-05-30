import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RegisterService, User } from './register.service';
import { UserService } from 'src/app/user.service';

describe('RegisterService', () => {
  let service: RegisterService;
  let httpMock: HttpTestingController;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RegisterService, UserService]
    });

    service = TestBed.inject(RegisterService);
    httpMock = TestBed.inject(HttpTestingController);
    userService = TestBed.inject(UserService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('register() should POST and return data', () => {
    const mockUser: User = {
      id: 1,
      name: 'test1',
      email: 'test1@gmail.com',
      username: '1test',
      password: '1test'
    };

    service.register(mockUser.name, mockUser.email, mockUser.username, mockUser.password).subscribe(response => {
      expect(response).toEqual(mockUser);
    });

    const req = httpMock.expectOne('http://16.171.43.32:7000/userRegister/');
    expect(req.request.method).toBe('POST');
    req.flush(mockUser);
  });

  it('checkUsername() should GET and return data', () => {
    const mockUsername = 'testuser';

    service.checkUsername(mockUsername).subscribe(response => {
      expect(response).toBeTrue();
    });

    const req = httpMock.expectOne(`http://16.171.43.32:7000/checkUsername/${mockUsername}/`);
    expect(req.request.method).toBe('GET');
    req.flush(true);
  });

  it('loginUser() should POST and return data', () => {
    const mockUser: User = {
      id: 1,
      name: 'test1',
      email: 'test1@gmail.com',
      username: '1test',
      password: '1test'
    };

    service.loginUser(mockUser.username, mockUser.password).subscribe(response => {
      expect(response).toEqual(mockUser);
    });

    const req = httpMock.expectOne('http://16.171.43.32:7000/userRegister/login/');
    expect(req.request.method).toBe('POST');
    req.flush(mockUser);
  });

  it('getUser() should GET and return data', () => {
    const mockUser: User = {
      id: 1,
      name: 'test1',
      email: 'test1@gmail.com',
      username: '1test',
      password: '1test'
    };

    service.getUser(String(mockUser.id)).subscribe(response => {
      expect(response).toEqual(mockUser);
    });

    const req = httpMock.expectOne(`http://16.171.43.32:7000/userRegister/${mockUser.id}/`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('getUserData() should GET and return data', () => {
    const mockUser: User = {
      id: 1,
      name: 'test1',
      email: 'test1@gmail.com',
      username: '1test',
      password: '1test'
    };

    service.getUserData(String(mockUser.id)).subscribe(response => {
      expect(response).toEqual(mockUser);
    });

    const req = httpMock.expectOne(`http://16.171.43.32:7000/userRegister/${mockUser.id}/`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });
});
