import { Star } from "lucide-react";

export default function Testimonials() {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-12">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Testimonials</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Trusted by businesses like yours
          </p>
        </div>

        <div className="mt-10 space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
          <TestimonialCard
            name="Michael Johnson"
            role="CEO, Tech Innovations"
            imageUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&q=80"
          >
            "Switching to ICHRA allowed us to offer better health benefits while keeping our costs predictable. Our employees appreciate having more choices, and we've seen increased satisfaction with our benefits package."
          </TestimonialCard>

          <TestimonialCard
            name="Sarah Reynolds"
            role="HR Director, Retail Solutions"
            imageUrl="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&q=80"
          >
            "The enrollment process was incredibly smooth. The platform guided us through each step, and the support team was always available when we had questions. Now our employees love having personalized healthcare options."
          </TestimonialCard>
        </div>
      </div>
    </div>
  );
}

interface TestimonialCardProps {
  name: string;
  role: string;
  imageUrl: string;
  children: React.ReactNode;
}

function TestimonialCard({ name, role, imageUrl, children }: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <div className="flex-shrink-0 h-12 w-12 rounded-full overflow-hidden bg-gray-200">
          <img className="h-full w-full object-cover" src={imageUrl} alt={`${name}'s profile`} />
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-medium text-gray-900">{name}</h3>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
      <div className="text-gray-700">
        <p className="italic">{children}</p>
      </div>
      <div className="mt-4 flex">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="text-amber-500 h-5 w-5 fill-current" />
        ))}
      </div>
    </div>
  );
}
