import * as scrypt from '../src'
import test from 'ava'

test('hash uses a random salt', async t => {
	const hash1 = await scrypt.hash('password')
	const hash2 = await scrypt.hash('password')

	t.false(hash1 == hash2)
})

test('compare returns true for correct plaintext', async t => {
	const hash = await scrypt.hash('password')

	t.true(await scrypt.compare('password', hash))
})

test('compare returns false for correct plaintext', async t => {
	const hash = await scrypt.hash('password')

	t.false(await scrypt.compare('password1', hash))
})
