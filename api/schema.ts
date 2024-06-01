import {
  pgTable,
  serial,
  varchar,
  uuid,
  timestamp,
  date,
} from "drizzle-orm/pg-core";
import { InferModel, relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email").notNull(),
  password: varchar("password").notNull(),
  role: varchar("role").notNull(),
});

export const employees = pgTable("employees", {
  id: uuid("id").defaultRandom().primaryKey(),
  gender: varchar("gender"),
  full_name: varchar("full_name").notNull(),
  position: varchar("position").notNull(),
  department: varchar("department").notNull(),
  phone_number: varchar("phone_number"),
  user_id: uuid("user_id")
    .notNull()
    .references(() => users.id),
});

export const attendance = pgTable("attendance", {
  id: uuid("id").defaultRandom().primaryKey(),
  date: date("date").notNull(),
  employee_id: uuid("employee_id")
    .notNull()
    .references(() => employees.id),
  timestamp: timestamp("timestamp").notNull(),
  photo_url: varchar("photo_url").notNull(),
});

export const employeeRelations = relations(employees, ({ many, one }) => ({
  attendances: many(attendance),
  user: one(users, {
    fields: [employees.user_id],
    references: [users.id],
  }),
}));

export const attendanceRelations = relations(attendance, ({ one }) => ({
  employee: one(employees, {
    fields: [attendance.employee_id],
    references: [employees.id],
  }),
}));

export type Employee = InferModel<typeof employees>;
export type Attendance = InferModel<typeof attendance>;
export type User = InferModel<typeof users>;
