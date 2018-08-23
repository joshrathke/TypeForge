import { LocalUser } from '@TypeForge/entities/user.entity';
import { TestBed, inject } from '@angular/core/testing';
import { LocalUserService } from './local-user.service';

describe('LocalUserService', () => {

  // Define local user account.
  const LocalUser: LocalUser = {
    userID: 'f368f1ba-7fb1-4a96-bd12-31e7de9ab946',
    username: 'johnsmith',
    password: 'abcdefghijklmnopqrstuvwxyz',
    firstName: 'John',
    lastName: 'Smith',
    resetPassword: false,
    lastLogin: '2016-06-22 20:44:52.134125-07',
    createdAt: '2016-06-22 20:44:52.134125-07',
    updatedAt: '2016-06-22 20:44:52.134125-07',
    version: 5,
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5zbWl0aCJ9.Mnx-0xjz3WuQM14dxoiIjc4oM2ggdTX2UYZI1Pp2kb8',
  };

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [LocalUserService]
    });

    // Mock local storage
    const LocalStorage = {};

    spyOn(localStorage, 'getItem').and.callFake((key: string): String => {
      return LocalStorage[key] || null;
    });

    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string): string => {
      return LocalStorage[key] = <string>value;
    });

    spyOn(localStorage, 'removeItem').and.callFake((key: string): void => {
      delete LocalStorage[key];
    });
  });

  describe('getLocalUserObject()', () => {
    it('should exist',
      inject([LocalUserService], (service: LocalUserService) => {
        expect(service.getLocalUserObject).toBeTruthy();
      })
    );

    it('Should return the local user object when one exists.',
      inject([LocalUserService], (_LocalUserService) => {
        // Set the Local User Object in LocalStorage
        localStorage.setItem('TypeForgeCurrentUser', JSON.stringify(LocalUser));
        // Get the local user out of LocalStorage
        expect(_LocalUserService.getLocalUserObject()).toEqual(LocalUser);
      })
    );

    // Check if the function returns null when no value exists
    it('Should return Null if no local user object exists.',
      inject([LocalUserService], (_LocalUserService) => {
        expect(_LocalUserService.getLocalUserObject()).toBeNull();
      })
    );
  });

  describe('setLocalUserObject()', () => {
    it('should exist',
      inject([LocalUserService], (service: LocalUserService) => {
        expect(service.setLocalUserObject).toBeTruthy();
      })
    );

    it('Should set the Local User object if one is provided.',
      inject([LocalUserService], (_LocalUserService) => {
        // Set the NTCCurrentUser object within local storage
        _LocalUserService.setLocalUserObject(LocalUser);
        // Check if the NTCCurrentUser object has been set
        expect(JSON.parse(localStorage.getItem('TypeForgeCurrentUser'))).toEqual(LocalUser);
      }));
  });

  describe('destroyLocalUserObject()', () => {
    it('should exist',
      inject([LocalUserService], (service: LocalUserService) => {
        expect(service.destroyLocalUserObject).toBeTruthy();
      })
    );

    it('Should destroy the LocalUserObject when called.',
      inject([LocalUserService], (_LocalUserService) => {
        // Destroy the NTCCurrentUser object within localStorage
        _LocalUserService.destroyLocalUserObject();
        // Verify that the NTCCurrentUser has been destroyed
        expect(_LocalUserService.getLocalUserObject()).toBeNull();
      }));
  });
});
