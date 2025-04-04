import { 
  users, type User, type InsertUser,
  businesses, type Business, type InsertBusiness,
  ichraPlans, type IchraPlan, type InsertIchraPlan,
  enrollments, type Enrollment, type InsertEnrollment
} from "@shared/schema";

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

export const storage = new MemStorage();
