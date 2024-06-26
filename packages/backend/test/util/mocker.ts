import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { InjectionToken } from '@nestjs/common';
import { SENTRY_TOKEN } from '@travelerdev/nestjs-sentry';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { mockDeep } from 'vitest-mock-extended';

import { PrismaService } from 'src/prisma/prisma.service';

import prismaService from '../__mocks__/prisma';

const moduleMocker = new ModuleMocker(global);

export const tokenMocker = function (token?: InjectionToken) {
	// console.log({ token, typeof: typeof token });
	if (token === PrismaService) {
		// Return the PrismaService defined in __mocks__. This is so we can get a
		// reference to the mock instance during any test. This is useful for
		// spying/mocking on methods.
		// We use a DeepMock for prisma because prisma.c is defined at a later stage.
		return prismaService;
	}

	if (token === CACHE_MANAGER) {
		return {
			get: vi.fn(),
			set: vi.fn(),
			del: vi.fn(),
		};
	}

	if (typeof token === 'function') {
		// default
		// return token;

		// vitest
		// Too limiting, only mocks self/top-level.
		// return vi.fn();

		// vitest-mock-extended
		// Very liberal, everything is a mock, even non-existing methods.
		// return mockDeep();

		// Jest
		// https://docs.nestjs.com/fundamentals/testing#auto-mocking
		// Convenient. Produces a mocks with the same shape as the original.
		type T = typeof token;
		const mockMetadata = moduleMocker.getMetadata(
			token,
		) as MockFunctionMetadata<T>;
		const Mock = moduleMocker.generateFromMetadata(mockMetadata);
		// @ts-expect-error tbd
		return new Mock();
	}

	// Sentry
	if (token === SENTRY_TOKEN) {
		return {
			instance() {
				return mockDeep();
			},
		};
	}

	if (typeof token === 'symbol') {
		return token;
	}

	// NestWinston
	if (typeof token === 'string') {
		return mockDeep();
	}

	return;
};
