import { createInMemoryCacheService } from '../inMemoryCacheService';
import { ICacheService } from '../ICacheService';

describe('inMemoryCacheService', () => {
	let cacheService: ICacheService<string>;

	beforeEach(() => {
		cacheService = createInMemoryCacheService<string>();
	});

	test('should set and get a value', () => {
		cacheService.set('key1', 'value1');
		expect(cacheService.get('key1')).toBe('value1');
	});

	test('should return undefined for a non-existent key', () => {
		expect(cacheService.get('nonExistentKey')).toBeUndefined();
	});

	test('should check if a key exists', () => {
		cacheService.set('key2', 'value2');
		expect(cacheService.has('key2')).toBe(true);
		expect(cacheService.has('nonExistentKey')).toBe(false);
	});

	test('should delete a key', () => {
		cacheService.set('key3', 'value3');
		cacheService.delete('key3');
		expect(cacheService.get('key3')).toBeUndefined();
		expect(cacheService.has('key3')).toBe(false);
	});
});
