import { TestBed, async, inject } from '@angular/core/testing';
import { LocalUserService, LocalUserObject } from './local-user.service';

describe('LocalUserService', () => {

	// Define local user account.
	let LocalUser: LocalUserObject = {
		token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5zbWl0aCJ9.Mnx-0xjz3WuQM14dxoiIjc4oM2ggdTX2UYZI1Pp2kb8',
		userID: 'f368f1ba-7fb1-4a96-bd12-31e7de9ab946',
		username: 'johnsmith'
	}

	beforeEach(() => {

		TestBed.configureTestingModule({
			providers: [LocalUserService]
		})

		// Mock local storage
		let LocalStorage = {};

		spyOn(localStorage, 'getItem').and.callFake((key: string): String => {
			return LocalStorage[key] || null;
		})

		spyOn(localStorage, 'setItem').and.callFake((key: string, value: string): string => {
			return LocalStorage[key] = <string>value;
		})

		spyOn(localStorage, 'removeItem').and.callFake((key: string): void => {
			delete LocalStorage[key];
		})

	})

	describe('getLocalUserObject()', () => {

		// Check if the function returns a value when one exists
		it('Should return the local user object when one exists.',
			inject([LocalUserService], (_LocalUserService) => {
				// Set the Local User Object in LocalStorage
				localStorage.setItem('NTCCurrentUser', JSON.stringify(LocalUser));
				// Get the local user out of LocalStorage
				expect(_LocalUserService.getLocalUserObject()).toEqual(LocalUser);
			}))

		// Check if the function returns null when no value exists
		it('Should return Null if no local user object exists.',
			inject([LocalUserService], (_LocalUserService) => {
				expect(_LocalUserService.getLocalUserObject()).toBeNull();
			}))
	})

	describe('setLocalUserObject()', () => {

		it('Should set the Local User object if one is provided.',
			inject([LocalUserService], (_LocalUserService) => {
				// Set the NTCCurrentUser object within local storage
				_LocalUserService.setLocalUserObject(LocalUser);
				// Check if the NTCCurrentUser object has been set
				expect(JSON.parse(localStorage.getItem('NTCCurrentUser'))).toEqual(LocalUser);
			}))
	})

	describe('destroyLocalUserObject()', () => {

		it('Should destroy the LocalUserObject when called.',
			inject([LocalUserService], (_LocalUserService) => {
				// Destroy the NTCCurrentUser object within localStorage
				_LocalUserService.destroyLocalUserObject();
				// Verify that the NTCCurrentUser has been destroyed
				expect(_LocalUserService.getLocalUserObject()).toBeNull();
			}))
	})
})