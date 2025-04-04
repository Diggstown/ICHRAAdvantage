import { 
  users, type User, type InsertUser,
  businesses, type Business, type InsertBusiness,
  ichraPlans, type IchraPlan, type InsertIchraPlan,
  enrollments, type Enrollment, type InsertEnrollment
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// Storage interface definition
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Business methods
  getBusiness(id: number): Promise<Business | undefined>;
  getBusinessByUserId(userId: number): Promise<Business | undefined>;
  getBusinesses(): Promise<Business[]>;
  createBusiness(business: InsertBusiness & { userId: number }): Promise<Business>;
  updateBusiness(id: number, business: Partial<InsertBusiness>): Promise<Business | undefined>;
  
  // ICHRA Plan methods
  getIchraPlan(id: number): Promise<IchraPlan | undefined>;
  getIchraPlans(): Promise<IchraPlan[]>;
  createIchraPlan(plan: InsertIchraPlan): Promise<IchraPlan>;
  
  // Enrollment methods
  getEnrollment(id: number): Promise<Enrollment | undefined>;
  getEnrollmentsByBusinessId(businessId: number): Promise<Enrollment[]>;
  createEnrollment(enrollment: InsertEnrollment): Promise<Enrollment>;
  updateEnrollment(id: number, enrollment: Partial<InsertEnrollment>): Promise<Enrollment | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private businesses: Map<number, Business>;
  private ichraPlans: Map<number, IchraPlan>;
  private enrollments: Map<number, Enrollment>;
  
  private userId: number;
  private businessId: number;
  private planId: number;
  private enrollmentId: number;

  constructor() {
    this.users = new Map();
    this.businesses = new Map();
    this.ichraPlans = new Map();
    this.enrollments = new Map();
    
    this.userId = 1;
    this.businessId = 1;
    this.planId = 1;
    this.enrollmentId = 1;
    
    // Initialize with sample ICHRA plans
    this.initializeIchraPlans();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const createdAt = new Date();
    const user: User = { ...insertUser, id, createdAt };
    this.users.set(id, user);
    return user;
  }

  // Business methods
  async getBusiness(id: number): Promise<Business | undefined> {
    return this.businesses.get(id);
  }

  async getBusinessByUserId(userId: number): Promise<Business | undefined> {
    return Array.from(this.businesses.values()).find(
      (business) => business.userId === userId,
    );
  }

  async getBusinesses(): Promise<Business[]> {
    return Array.from(this.businesses.values());
  }

  async createBusiness(business: InsertBusiness & { userId: number }): Promise<Business> {
    const id = this.businessId++;
    const createdAt = new Date();
    const newBusiness: Business = { ...business, id, createdAt };
    this.businesses.set(id, newBusiness);
    return newBusiness;
  }

  async updateBusiness(id: number, updates: Partial<InsertBusiness>): Promise<Business | undefined> {
    const business = this.businesses.get(id);
    if (!business) return undefined;
    
    const updatedBusiness = { ...business, ...updates };
    this.businesses.set(id, updatedBusiness);
    return updatedBusiness;
  }

  // ICHRA Plan methods
  async getIchraPlan(id: number): Promise<IchraPlan | undefined> {
    return this.ichraPlans.get(id);
  }

  async getIchraPlans(): Promise<IchraPlan[]> {
    return Array.from(this.ichraPlans.values());
  }

  async createIchraPlan(plan: InsertIchraPlan): Promise<IchraPlan> {
    const id = this.planId++;
    const newPlan: IchraPlan = { ...plan, id };
    this.ichraPlans.set(id, newPlan);
    return newPlan;
  }

  // Enrollment methods
  async getEnrollment(id: number): Promise<Enrollment | undefined> {
    return this.enrollments.get(id);
  }

  async getEnrollmentsByBusinessId(businessId: number): Promise<Enrollment[]> {
    return Array.from(this.enrollments.values()).filter(
      (enrollment) => enrollment.businessId === businessId,
    );
  }

  async createEnrollment(enrollment: InsertEnrollment): Promise<Enrollment> {
    const id = this.enrollmentId++;
    const createdAt = new Date();
    const newEnrollment: Enrollment = { ...enrollment, id, createdAt };
    this.enrollments.set(id, newEnrollment);
    return newEnrollment;
  }

  async updateEnrollment(id: number, updates: Partial<InsertEnrollment>): Promise<Enrollment | undefined> {
    const enrollment = this.enrollments.get(id);
    if (!enrollment) return undefined;
    
    const updatedEnrollment = { ...enrollment, ...updates };
    this.enrollments.set(id, updatedEnrollment);
    return updatedEnrollment;
  }

  // Initialize with sample ICHRA plans
  private initializeIchraPlans() {
    const plans: InsertIchraPlan[] = [
      {
        name: "Basic ICHRA",
        description: "Ideal for small businesses starting with ICHRA. Provides essential coverage for your employees.",
        monthlyAmount: 300,
        annualAmount: 3600,
        features: [
          "Fixed monthly allowance",
          "Simple administration",
          "Basic reporting",
          "Email support"
        ],
        isPopular: false
      },
      {
        name: "Standard ICHRA",
        description: "Our most popular plan. Comprehensive coverage with flexible options for medium-sized businesses.",
        monthlyAmount: 500,
        annualAmount: 6000,
        features: [
          "Customizable monthly allowance",
          "Employee class differentiation",
          "Detailed reporting",
          "Priority email and phone support",
          "Compliance assistance"
        ],
        isPopular: true
      },
      {
        name: "Premium ICHRA",
        description: "Enterprise-grade healthcare solution with maximum flexibility and dedicated support.",
        monthlyAmount: 750,
        annualAmount: 9000,
        features: [
          "Premium monthly allowance",
          "Advanced employee classes",
          "Comprehensive reporting dashboard",
          "Dedicated account manager",
          "Compliance guarantee",
          "Employee education resources"
        ],
        isPopular: false
      }
    ];

    plans.forEach(plan => {
      this.createIchraPlan(plan);
    });
  }
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result.length > 0 ? result[0] : undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result.length > 0 ? result[0] : undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.email, email));
    return result.length > 0 ? result[0] : undefined;
  }

  async createUser(user: InsertUser): Promise<User> {
    // Ensure all required fields are properly set with default values if needed
    const insertData = {
      ...user,
      phone: user.phone || null,
      role: user.role || "business"
    };
    const result = await db.insert(users).values(insertData).returning();
    return result[0];
  }

  // Business methods
  async getBusiness(id: number): Promise<Business | undefined> {
    const result = await db.select().from(businesses).where(eq(businesses.id, id));
    return result.length > 0 ? result[0] : undefined;
  }

  async getBusinessByUserId(userId: number): Promise<Business | undefined> {
    const result = await db.select().from(businesses).where(eq(businesses.userId, userId));
    return result.length > 0 ? result[0] : undefined;
  }

  async getBusinesses(): Promise<Business[]> {
    return await db.select().from(businesses);
  }

  async createBusiness(business: InsertBusiness & { userId: number }): Promise<Business> {
    // Ensure all required fields are properly set with default values
    const insertData = {
      ...business,
      status: business.status || "incomplete"
    };
    const result = await db.insert(businesses).values(insertData).returning();
    return result[0];
  }

  async updateBusiness(id: number, updates: Partial<InsertBusiness>): Promise<Business | undefined> {
    const result = await db
      .update(businesses)
      .set(updates)
      .where(eq(businesses.id, id))
      .returning();
    return result.length > 0 ? result[0] : undefined;
  }

  // ICHRA Plan methods
  async getIchraPlan(id: number): Promise<IchraPlan | undefined> {
    const result = await db.select().from(ichraPlans).where(eq(ichraPlans.id, id));
    return result.length > 0 ? result[0] : undefined;
  }

  async getIchraPlans(): Promise<IchraPlan[]> {
    return await db.select().from(ichraPlans);
  }

  async createIchraPlan(plan: InsertIchraPlan): Promise<IchraPlan> {
    // Ensure isPopular is properly set
    const insertData = {
      ...plan,
      isPopular: plan.isPopular === undefined ? false : plan.isPopular
    };
    const result = await db.insert(ichraPlans).values(insertData).returning();
    return result[0];
  }

  // Enrollment methods
  async getEnrollment(id: number): Promise<Enrollment | undefined> {
    const result = await db.select().from(enrollments).where(eq(enrollments.id, id));
    return result.length > 0 ? result[0] : undefined;
  }

  async getEnrollmentsByBusinessId(businessId: number): Promise<Enrollment[]> {
    return await db.select().from(enrollments).where(eq(enrollments.businessId, businessId));
  }

  async createEnrollment(enrollment: InsertEnrollment): Promise<Enrollment> {
    // Ensure required fields are properly set with default values
    const insertData = {
      ...enrollment,
      status: enrollment.status || "pending",
      employeeClasses: enrollment.employeeClasses || [],
      monthlyBudget: enrollment.monthlyBudget || null,
      additionalNotes: enrollment.additionalNotes || null
    };
    const result = await db.insert(enrollments).values(insertData).returning();
    return result[0];
  }

  async updateEnrollment(id: number, updates: Partial<InsertEnrollment>): Promise<Enrollment | undefined> {
    const result = await db
      .update(enrollments)
      .set(updates)
      .where(eq(enrollments.id, id))
      .returning();
    return result.length > 0 ? result[0] : undefined;
  }
  
  // Initialize default plans if none exist
  async initializeDefaultPlans(): Promise<void> {
    const existingPlans = await this.getIchraPlans();
    if (existingPlans.length === 0) {
      const plans: InsertIchraPlan[] = [
        {
          name: "Basic ICHRA",
          description: "Ideal for small businesses starting with ICHRA. Provides essential coverage for your employees.",
          monthlyAmount: "300",
          annualAmount: "3600",
          features: [
            "Fixed monthly allowance",
            "Simple administration",
            "Basic reporting",
            "Email support"
          ],
          isPopular: false
        },
        {
          name: "Standard ICHRA",
          description: "Our most popular plan. Comprehensive coverage with flexible options for medium-sized businesses.",
          monthlyAmount: "500",
          annualAmount: "6000",
          features: [
            "Customizable monthly allowance",
            "Employee class differentiation",
            "Detailed reporting",
            "Priority email and phone support",
            "Compliance assistance"
          ],
          isPopular: true
        },
        {
          name: "Premium ICHRA",
          description: "Enterprise-grade healthcare solution with maximum flexibility and dedicated support.",
          monthlyAmount: "750",
          annualAmount: "9000",
          features: [
            "Premium monthly allowance",
            "Advanced employee classes",
            "Comprehensive reporting dashboard",
            "Dedicated account manager",
            "Compliance guarantee",
            "Employee education resources"
          ],
          isPopular: false
        }
      ];

      for (const plan of plans) {
        await this.createIchraPlan(plan);
      }
    }
  }
}

export const storage = new DatabaseStorage();
