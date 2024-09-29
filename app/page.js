import Button from "../components/Button";
import Input from "../components/Input";
import {
  ArrowRight,
  CheckCircle,
  Heart,
  Lightbulb,
  MessageCircle,
  Smile,
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-orange-600 dark:from-orange-50 dark:to-green-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-[200px] overflow-hidden">
        {/* Multi-layer background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-blue-800 opacity-70 dark:bg-blue-800 dark:opacity-80"></div>
          <div className="absolute inset-0 bg-green-400 opacity-30 rotate-45 transform scale-150 dark:bg-green-800 dark:opacity-20"></div>
          <div className="absolute inset-0 bg-yellow-100 opacity-20 -rotate-45 transform scale-150 dark:bg-yellow-800 dark:opacity-10"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white dark:text-white mb-6">
              Transform Your Mind with Lumina
            </h1>
            <p className="text-xl text-white mb-8">
              Your personal guide to cognitive behavioral therapy, anytime,
              anywhere.
            </p>
            <a href="/signup" passHref legacyBehavior>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg">
                Start Your Journey
                <ArrowRight className="ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-blue-800 dark:text-blue-200 mb-12">
            Empowering Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Lightbulb className="w-12 h-12 text-yellow-500" />}
              title="Personalized Insights"
              description="Gain deep understanding of your thought patterns and behaviors."
            />
            <FeatureCard
              icon={<MessageCircle className="w-12 h-12 text-green-500" />}
              title="24/7 Support"
              description="Access therapeutic guidance whenever you need it most."
            />
            <FeatureCard
              icon={<Heart className="w-12 h-12 text-red-500" />}
              title="Self-Care Tools"
              description="Discover a variety of exercises to improve your mental well-being."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-blue-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-blue-800 dark:text-blue-200 mb-12">
            How Lumina Works
          </h2>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8">
            <StepCard
              number={1}
              title="Sign Up"
              description="Create your account and set your goals."
            />
            <StepCard
              number={2}
              title="Daily Check-ins"
              description="Record your thoughts and emotions regularly."
            />
            <StepCard
              number={3}
              title="Receive Insights"
              description="Get personalized feedback and coping strategies."
            />
            <StepCard
              number={4}
              title="Track Progress"
              description="Monitor your growth and celebrate improvements."
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {/* <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-blue-800 dark:text-blue-200 mb-12">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <TestimonialCard
              quote="Lumina has been a game-changer for my mental health. I feel more in control of my thoughts than ever before."
              author="Sarah K."
            />
            <TestimonialCard
              quote="The daily exercises and insights have helped me develop a more positive outlook on life. Highly recommended!"
              author="Michael R."
            />
          </div>
        </div>
      </section> */}

      {/* Call to Action Section */}
      <section className="py-20 bg-blue-600 dark:bg-blue-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Start Your Mental Wellness Journey Today
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of others who have transformed their lives with
            Lumina.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            {/* <Input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-64 bg-white text-blue-800 placeholder-blue-400 dark:bg-gray-700 dark:text-blue-200 dark:placeholder-blue-400"
            /> */}
            <a href="/sign-up" passHref legacyBehavior>
              <Button className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-500 text-blue-800 font-bold py-3 px-6 rounded-full text-lg dark:bg-yellow-500 dark:hover:bg-yellow-600 dark:text-blue-900">
                Get Started Free
                <ArrowRight className="ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-800 dark:bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-2xl font-bold mb-4 md:mb-0">Lumina</div>
            <nav className="flex space-x-4">
              <a
                href="#"
                className="hover:text-blue-300"
                passHref
                legacyBehavior
              >
                About
              </a>
              <a
                href="#"
                className="hover:text-blue-300"
                passHref
                legacyBehavior
              >
                Features
              </a>
              <a
                href="#"
                className="hover:text-blue-300"
                passHref
                legacyBehavior
              >
                Pricing
              </a>
              <a
                href="#"
                className="hover:text-blue-300"
                passHref
                legacyBehavior
              >
                Contact
              </a>
            </nav>
          </div>
          <div className="mt-8 text-center text-sm">
            © {new Date().getFullYear()} Lumina. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-blue-50 dark:bg-gray-800 rounded-lg p-6 text-center transition-transform hover:scale-105">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-2">
        {title}
      </h3>
      <p className="text-blue-600 dark:text-blue-300">{description}</p>
    </div>
  );
}

function StepCard({ number, title, description }) {
  return (
    <div className="bg-white dark:bg-gray-700 rounded-lg p-6 text-center shadow-md transition-transform hover:scale-105">
      <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 mx-auto">
        {number}
      </div>
      <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-2">
        {title}
      </h3>
      <p className="text-blue-600 dark:text-blue-300">{description}</p>
    </div>
  );
}

function TestimonialCard({ quote, author }) {
  return (
    <div className="bg-blue-50 dark:bg-gray-800 rounded-lg p-6 shadow-md">
      <Smile className="w-12 h-12 text-yellow-500 mb-4" />
      <p className="text-blue-800 dark:text-blue-200 italic mb-4">"{quote}"</p>
      <p className="text-blue-600 dark:text-blue-300 font-semibold">
        - {author}
      </p>
    </div>
  );
}
