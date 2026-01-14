import { boolean, pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

export const priorityEnum = pgEnum('priority', ['low', 'medium', 'high'])

export const tasks = pgTable('task', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  description: text('description'),
  completed: boolean('completed').notNull().default(false),
  priority: priorityEnum('priority'),
  dueDate: timestamp('due_date', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
})

// Zod schema for API responses
export const SelectTaskSchema = createSelectSchema(tasks)

export const InsertTaskSchema = createInsertSchema(tasks)
  .required({
    title: true,
    completed: true,
  })
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })

export const UpdateTaskSchema = InsertTaskSchema.partial()

// TypeScript types
export type ISelecttasks = z.infer<typeof SelectTaskSchema>
export type IInserttasks = z.infer<typeof InsertTaskSchema>
export type IUpdatetasks = z.infer<typeof UpdateTaskSchema>
