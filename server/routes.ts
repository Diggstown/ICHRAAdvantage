import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema, insertBusinessSchema, insertEnrollmentSchema,
  businessRegistrationSchema, planSelectionSchema, employeeClassesSchema
} from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes - prefix all routes with /api
  
  // Get all ICHRA plans
  app.get("/api/plans", async (req: Request, res: Response) => {
    try {
      const plans = await storage.getIchraPlans();
      res.json(plans);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to retrieve plans" });
    }
  });

  // Get a specific ICHRA plan
  app.get("/api/plans/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid plan ID" });
      }
      
      const plan = await storage.getIchraPlan(id);
      if (!plan) {
        return res.status(404).json({ message: "Plan not found" });
      }
      
      res.json(plan);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to retrieve plan" });
    }
  });

  // Business Registration - first step of enrollment
  app.post("/api/business/register", async (req: Request, res: Response) => {
    try {
      const businessData = businessRegistrationSchema.parse(req.body);
      
      // First check if email is already registered or create new user
      let user = await storage.getUserByEmail(businessData.email);
      
      if (!user) {
        // Create user account
        user = await storage.createUser({
          username: businessData.email,
          password: "temppassword", // In a real application, this would be hashed and more secure
          firstName: businessData.firstName,
          lastName: businessData.lastName,
          email: businessData.email,
          phone: businessData.phone,
          role: "business"
        });
      }
      
      // Create business profile
      const business = await storage.createBusiness({
        userId: user.id,
        name: businessData.name,
        taxId: businessData.taxId,
        address: businessData.address,
        city: businessData.city,
        state: businessData.state,
        zip: businessData.zip,
        industry: businessData.industry,
        size: businessData.size,
        status: "registered" // This business has completed registration but not enrollment
      });
      
      res.status(201).json({ 
        businessId: business.id,
        userId: user.id,
        message: "Business registered successfully" 
      });
    } catch (error) {
      console.error(error);
      if (error instanceof ZodError) {
        const formattedError = fromZodError(error);
        return res.status(400).json({ 
          message: "Validation error",
          errors: formattedError.details 
        });
      }
      res.status(500).json({ message: "Failed to register business" });
    }
  });

  // Plan selection - second step of enrollment
  app.post("/api/business/:id/plan", async (req: Request, res: Response) => {
    try {
      const businessId = parseInt(req.params.id);
      if (isNaN(businessId)) {
        return res.status(400).json({ message: "Invalid business ID" });
      }
      
      const business = await storage.getBusiness(businessId);
      if (!business) {
        return res.status(404).json({ message: "Business not found" });
      }
      
      console.log("Received plan data for business ID:", businessId, "Data:", req.body);
      
      // Pre-process the request body to ensure effectiveDate is a Date object
      let processedBody = { ...req.body };
      
      if (processedBody.effectiveDate && typeof processedBody.effectiveDate === 'string') {
        processedBody.effectiveDate = new Date(processedBody.effectiveDate);
        console.log("Converted effectiveDate string to Date object:", processedBody.effectiveDate);
      }
      
      // Parse the processed data
      let planData;
      try {
        planData = planSelectionSchema.parse(processedBody);
        console.log("Validated plan data:", planData);
      } catch (validationError) {
        console.error("Plan data validation error:", validationError);
        if (validationError instanceof ZodError) {
          return res.status(400).json({
            message: "Validation error",
            errors: validationError.errors
          });
        }
        throw validationError;
      }
      
      const plan = await storage.getIchraPlan(planData.planId);
      if (!plan) {
        return res.status(404).json({ message: "Plan not found" });
      }
      
      // Ensure monthlyBudget is a string for storage
      const monthlyBudgetStr = typeof planData.monthlyBudget === 'number' 
        ? planData.monthlyBudget.toString() 
        : planData.monthlyBudget;
      
      // Create initial enrollment record
      const enrollment = await storage.createEnrollment({
        businessId,
        planId: planData.planId,
        status: "plan_selected",
        effectiveDate: planData.effectiveDate,
        monthlyBudget: monthlyBudgetStr
      });
      
      console.log("Created enrollment:", enrollment);
      
      // Update business status
      await storage.updateBusiness(businessId, { status: "plan_selected" });
      
      res.status(201).json({ 
        enrollmentId: enrollment.id,
        message: "Plan selected successfully" 
      });
    } catch (error) {
      console.error("Error in plan selection:", error);
      if (error instanceof ZodError) {
        const formattedError = fromZodError(error);
        return res.status(400).json({ 
          message: "Validation error",
          errors: formattedError.details 
        });
      }
      res.status(500).json({ message: "Failed to select plan" });
    }
  });

  // Employee classes - third step of enrollment
  app.put("/api/enrollment/:id/classes", async (req: Request, res: Response) => {
    try {
      const enrollmentId = parseInt(req.params.id);
      if (isNaN(enrollmentId)) {
        console.error("Invalid enrollment ID:", req.params.id);
        return res.status(400).json({ message: "Invalid enrollment ID" });
      }
      
      console.log("Looking up enrollment with ID:", enrollmentId);
      const enrollment = await storage.getEnrollment(enrollmentId);
      if (!enrollment) {
        console.error("Enrollment not found with ID:", enrollmentId);
        return res.status(404).json({ message: "Enrollment not found" });
      }
      
      console.log("Received employee classes data for enrollment ID:", enrollmentId, "Data:", req.body);
      
      // Validate the class data
      let classData;
      try {
        classData = employeeClassesSchema.parse(req.body);
        console.log("Validated employee classes data:", classData);
      } catch (validationError) {
        console.error("Employee classes validation error:", validationError);
        if (validationError instanceof ZodError) {
          return res.status(400).json({
            message: "Validation error",
            errors: validationError.errors
          });
        }
        throw validationError;
      }
      
      // Update enrollment with employee classes
      const updatedEnrollment = await storage.updateEnrollment(enrollmentId, {
        employeeClasses: classData.employeeClasses,
        status: "classes_defined"
      });
      
      console.log("Updated enrollment with employee classes:", updatedEnrollment);
      
      // Update business status
      await storage.updateBusiness(enrollment.businessId, { status: "classes_defined" });
      
      res.json({ 
        enrollmentId,
        message: "Employee classes added successfully" 
      });
    } catch (error) {
      console.error("Error adding employee classes:", error);
      if (error instanceof ZodError) {
        const formattedError = fromZodError(error);
        return res.status(400).json({ 
          message: "Validation error",
          errors: formattedError.details 
        });
      }
      res.status(500).json({ message: "Failed to add employee classes" });
    }
  });

  // Finalize enrollment - last step
  app.put("/api/enrollment/:id/finalize", async (req: Request, res: Response) => {
    try {
      const enrollmentId = parseInt(req.params.id);
      if (isNaN(enrollmentId)) {
        return res.status(400).json({ message: "Invalid enrollment ID" });
      }
      
      const enrollment = await storage.getEnrollment(enrollmentId);
      if (!enrollment) {
        return res.status(404).json({ message: "Enrollment not found" });
      }
      
      // Additional notes are optional
      const additionalNotes = req.body.additionalNotes || "";
      
      // Finalize the enrollment
      const updatedEnrollment = await storage.updateEnrollment(enrollmentId, {
        status: "completed",
        additionalNotes
      });
      
      // Update business status
      await storage.updateBusiness(enrollment.businessId, { status: "enrolled" });
      
      res.json({ 
        enrollmentId,
        message: "Enrollment completed successfully" 
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to finalize enrollment" });
    }
  });

  // Get business details
  app.get("/api/business/:id", async (req: Request, res: Response) => {
    try {
      const businessId = parseInt(req.params.id);
      if (isNaN(businessId)) {
        return res.status(400).json({ message: "Invalid business ID" });
      }
      
      const business = await storage.getBusiness(businessId);
      if (!business) {
        return res.status(404).json({ message: "Business not found" });
      }
      
      res.json(business);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to retrieve business" });
    }
  });

  // Get business enrollments
  app.get("/api/business/:id/enrollments", async (req: Request, res: Response) => {
    try {
      const businessId = parseInt(req.params.id);
      if (isNaN(businessId)) {
        return res.status(400).json({ message: "Invalid business ID" });
      }
      
      const business = await storage.getBusiness(businessId);
      if (!business) {
        return res.status(404).json({ message: "Business not found" });
      }
      
      const enrollments = await storage.getEnrollmentsByBusinessId(businessId);
      
      // For each enrollment, fetch the associated plan
      const enrollmentsWithPlans = await Promise.all(
        enrollments.map(async (enrollment) => {
          const plan = await storage.getIchraPlan(enrollment.planId);
          return {
            ...enrollment,
            plan
          };
        })
      );
      
      res.json(enrollmentsWithPlans);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to retrieve enrollments" });
    }
  });

  // Get specific enrollment with plan details
  app.get("/api/enrollment/:id", async (req: Request, res: Response) => {
    try {
      const enrollmentId = parseInt(req.params.id);
      if (isNaN(enrollmentId)) {
        return res.status(400).json({ message: "Invalid enrollment ID" });
      }
      
      const enrollment = await storage.getEnrollment(enrollmentId);
      if (!enrollment) {
        return res.status(404).json({ message: "Enrollment not found" });
      }
      
      const plan = await storage.getIchraPlan(enrollment.planId);
      const business = await storage.getBusiness(enrollment.businessId);
      
      res.json({
        ...enrollment,
        plan,
        business
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to retrieve enrollment" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}