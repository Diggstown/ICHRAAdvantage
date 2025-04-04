import { pgTable, text, serial, integer, numeric, timestamp, boolean, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table for authentication
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  role: text("role").default("business").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Business entity table
export const businesses = pgTable("businesses", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  name: text("name").notNull(),
  taxId: text("tax_id").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  zip: text("zip").notNull(),
  industry: text("industry").notNull(),
  size: text("size").notNull(),
  status: text("status").default("incomplete").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ICHRA plans table
export const ichraPlans = pgTable("ichra_plans", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  monthlyAmount: numeric("monthly_amount").notNull(),
  annualAmount: numeric("annual_amount").notNull(),
  features: json("features").notNull(),
  isPopular: boolean("is_popular").default(false),
});

// Enrollment table
export const enrollments = pgTable("enrollments", {
  id: serial("id").primaryKey(),
  businessId: integer("business_id").references(() => businesses.id).notNull(),
  planId: integer("plan_id").references(() => ichraPlans.id).notNull(),
  status: text("status").default("pending").notNull(),
  effectiveDate: timestamp("effective_date").notNull(),
  employeeClasses: json("employee_classes"),
  monthlyBudget: numeric("monthly_budget"),
  additionalNotes: text("additional_notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Create schema validation
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertBusinessSchema = createInsertSchema(businesses).omit({
  id: true,
  userId: true,
  createdAt: true,
});

export const insertIchraPlanSchema = createInsertSchema(ichraPlans).omit({
  id: true,
});

export const insertEnrollmentSchema = createInsertSchema(enrollments).omit({
  id: true,
  createdAt: true,
});

// Type definitions
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertBusiness = z.infer<typeof insertBusinessSchema>;
export type Business = typeof businesses.$inferSelect;

export type InsertIchraPlan = z.infer<typeof insertIchraPlanSchema>;
export type IchraPlan = typeof ichraPlans.$inferSelect;

export type InsertEnrollment = z.infer<typeof insertEnrollmentSchema>;
export type Enrollment = typeof enrollments.$inferSelect;

// Specialized schema for enrollment wizard
export const businessRegistrationSchema = z.object({
  name: z.string().min(1, "Company name is required"),
  taxId: z.string().min(1, "Tax ID is required").regex(/^\d{2}-\d{7}$/, "Tax ID must be in XX-XXXXXXX format"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip: z.string().min(1, "ZIP code is required").regex(/^\d{5}(-\d{4})?$/, "ZIP code must be in XXXXX or XXXXX-XXXX format"),
  industry: z.string().min(1, "Industry is required"),
  size: z.string().min(1, "Company size is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  phone: z.string().min(1, "Phone number is required"),
  termsAccepted: z.boolean().refine(val => val === true, "You must accept the terms and conditions"),
});

export const employeeClassSchema = z.object({
  name: z.string().min(1, "Class name is required"),
  allowanceAmount: z.number().min(1, "Allowance amount is required"),
  eligibilityRequirements: z.string().optional(),
});

export const planSelectionSchema = z.object({
  planId: z.number().min(1, "Plan selection is required"),
  effectiveDate: z.date({ required_error: "Effective date is required" }),
  monthlyBudget: z.number().min(1, "Monthly budget is required").or(z.string()),
});

export const employeeClassesSchema = z.object({
  employeeClasses: z.array(employeeClassSchema).min(1, "At least one employee class is required"),
});

export type BusinessRegistration = z.infer<typeof businessRegistrationSchema>;
export type PlanSelection = z.infer<typeof planSelectionSchema>;
export type EmployeeClass = z.infer<typeof employeeClassSchema>;
export type EmployeeClasses = z.infer<typeof employeeClassesSchema>;
