import { 
  DollarSign, 
  Users, 
  ShieldCheck, 
  Zap 
} from "lucide-react";

export default function ICHRABenefits() {
  return (
    <div className="mt-10">
      <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
        <BenefitItem 
          icon={<DollarSign className="h-6 w-6" />}
          title="Cost Control & Predictability"
        >
          Set your budget with fixed contributions while removing the unpredictability of traditional group plans.
        </BenefitItem>

        <BenefitItem 
          icon={<Users className="h-6 w-6" />}
          title="Employee Choice & Satisfaction"
        >
          Employees choose the plan that best fits their needs from the open market rather than a one-size-fits-all approach.
        </BenefitItem>

        <BenefitItem 
          icon={<ShieldCheck className="h-6 w-6" />}
          title="Tax Advantages"
        >
          Contributions are tax-deductible for employers and tax-free for employees, maximizing the value of your benefit spend.
        </BenefitItem>

        <BenefitItem 
          icon={<Zap className="h-6 w-6" />}
          title="Simplified Administration"
        >
          Our platform streamlines the entire process from setup to ongoing management, reducing your administrative burden.
        </BenefitItem>
      </dl>
    </div>
  );
}

interface BenefitItemProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

function BenefitItem({ icon, title, children }: BenefitItemProps) {
  return (
    <div className="relative">
      <dt>
        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
          {icon}
        </div>
        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{title}</p>
      </dt>
      <dd className="mt-2 ml-16 text-base text-gray-500">
        {children}
      </dd>
    </div>
  );
}
