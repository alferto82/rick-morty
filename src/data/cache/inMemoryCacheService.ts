import { ICacheService } from './ICacheService';

export const createInMemoryCacheService = <T>(): ICacheService<T> => {
	const cache = new Map<string, T>();
	return {
		get: (key: string) => cache.get(key),
		set: (key: string, value: T) => {
			cache.set(key, value);
		},
		has: (key: string) => cache.has(key),
		delete: (key: string) => {
			cache.delete(key);
		}
	};
};
