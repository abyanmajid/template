// eslint-disable ts/ban-ts-comment
import { testClient } from 'hono/testing'
import * as HttpCode from 'stoker/http-status-codes'
import {
  describe,
  expect,
  expectTypeOf,
  it,
} from 'vitest'
import { initApp } from '@/lib/init'
import { tasksRouter } from '@/routes'

const tc = testClient(initApp().route('/', tasksRouter)).api

describe('tasks list', () => {
  it('responds with an array of tasks', async () => {
    const response = await tc.tasks.$get()
    const json = await response.json()
    expectTypeOf(json).toBeArray()
  })

  it('validates the id param', async () => {
    const response = await tc.tasks[':id'].$get({
      param: {
        id: 'invalid',
      },
    })
    expect(response.status).toBe(HttpCode.UNPROCESSABLE_ENTITY)
  })

  it('validates the body when inserting', async () => {
    const response = await tc.tasks.$post({
      // @ts-expect-error - invalid body
      json: {
        title: 'Learn Bun',
      },
    })
    expect(response.status).toBe(HttpCode.UNPROCESSABLE_ENTITY)
  })
})
