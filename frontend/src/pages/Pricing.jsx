import { m, motion } from 'framer-motion';
import { pageVariants, containerVariants, itemVariants } from '../utils/motionVariants';
import { CheckCircle2, Zap } from 'lucide-react';
import { useState } from 'react';

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
    buttonText: 'Enroll Now',
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
  const [model, setModel] = useState(null);

  
  const handlePlan = (tier) => () => {
    if (tier.name === 'Free') {
      window.location.href = '/dashboard';
    }else{
      setModel(tier);
    } }
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
              <div className="absolute top-0 inset-x-0 flex justify-center -mt-6">
                <span className="bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1">
                  <Zap className="w-3 h-4" /> Most Popular
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

            <button onClick={handlePlan(tier)} className={'w-full py-3 px-6 rounded-xl font-bold transition-all bg-surface-dark border border-border-subtle hover:bg-border-subtle text-text-main'}>
              {tier.buttonText}
            </button>
              {model && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                  <div className="bg-black p-8 rounded-2xl w-96 relative border border-border-subtle">
                    <button onClick={() => setModel(null)} className="absolute text-2xl top-4 right-4 text-gray-500 hover:text-gray-700">
                      &times;
                    </button>
                    <h2 className="text-2xl font-bold mb-4">Interested in the {model.name} plan?</h2>
                    <p className="mb-6 text-gray-600">Please enter your email, and we'll get in touch with you shortly.</p>
                    <form action="onsubmit">
                      <input type="email" placeholder="Enter your email" className="bg-surface-light dark:bg-surface-dark border border-border-subtle focus:ring-primary-500 focus:border-primary-500" />
                      <input type="text" value={model.name || ''} onChange={(e) => setModel({...model, name: e.target.value})} placeholder="Full Name" className="bg-surface-light dark:bg-surface-dark border border-border-subtle focus:ring-primary-500 focus:border-primary-500" />
                      <button type="submit" className="bg-primary-500 text-white py-2 px-4 rounded-lg hover:bg-primary-600">
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              )}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
