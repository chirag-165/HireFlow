import { motion } from 'framer-motion';
import { pageVariants, containerVariants, itemVariants } from '../utils/motionVariants';
import { CheckCircle2, Zap } from 'lucide-react';

const tiers = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for casual job seekers.',
    features: ['Track up to 20 applications', 'Basic Kanban board', 'Community support'],
    buttonText: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$12',
    period: '/mo',
    description: 'Everything you need to land your dream job.',
    features: ['Unlimited applications', 'AI resume tailored feedback', 'Email template generator', 'Advanced analytics'],
    buttonText: 'Start 7-day free trial',
    popular: true,
  },
  {
    name: 'AutoApply',
    price: '$49',
    period: '/mo',
    description: 'Let our AI apply to jobs while you sleep.',
    features: ['Everything in Pro', 'One-click auto apply', 'Priority AI processing', 'Interview prep mockups'],
    buttonText: 'I\'m Interested',
    popular: false,
  }
];

export default function Pricing() {
  return (
    <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} className="max-w-7xl mx-auto py-12 px-4 sm:px-6">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-text-main">Pricing that scales with you</h1>
        <p className="text-lg text-text-muted">Simple, transparent pricing for every stage of your career journey.</p>
      </div>

      <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {tiers.map((tier) => (
          <motion.div 
            key={tier.name} 
            variants={itemVariants}
            className={`relative rounded-3xl p-8 border ${tier.popular ? 'bg-primary-900/10 border-primary-500 shadow-premium-dark shadow-primary-500/20 md:-mt-8 md:mb-8 scale-[1.02]' : 'bg-surface-light dark:bg-surface-dark border-border-subtle shadow-premium dark:shadow-premium-dark'}`}
          >
            {tier.popular && (
              <div className="absolute top-0 inset-x-0 flex justify-center -mt-4">
                <span className="bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1">
                  <Zap className="w-3 h-3" /> Most Popular
                </span>
              </div>
            )}
            
            <div className="mb-8">
              <h3 className="text-xl font-bold text-text-main">{tier.name}</h3>
              <p className="text-sm text-text-muted mt-2 h-10">{tier.description}</p>
            </div>
            
            <div className="mb-8 flex items-baseline">
              <span className="text-4xl font-extrabold text-text-main">{tier.price}</span>
              {tier.period && <span className="text-text-muted ml-1">{tier.period}</span>}
            </div>

            <ul className="space-y-4 mb-8">
              {tier.features.map(feat => (
                <li key={feat} className="flex gap-3 text-sm text-text-muted items-start">
                  <CheckCircle2 className={`w-5 h-5 shrink-0 ${tier.popular ? 'text-primary-500' : 'text-text-muted'}`} />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            <button className={`w-full py-3 px-6 rounded-xl font-bold transition-all ${tier.popular ? 'bg-primary-600 hover:bg-primary-500 text-white shadow-lg shadow-primary-500/25' : 'bg-surface-dark border border-border-subtle hover:bg-border-subtle text-text-main'}`}>
              {tier.buttonText}
            </button>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
