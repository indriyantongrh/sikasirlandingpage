'use client';

import React from 'react';
import Image from 'next/image';
import { testimonials } from '@/data/testimonials';

const TestimonialCard: React.FC<{ testimonial: typeof testimonials[0] }> = ({ testimonial }) => (
    <div className="flex-shrink-0 w-[340px] bg-white rounded-2xl shadow-md p-6 mx-3 border border-gray-100">
        <div className="flex items-center mb-4">
            <Image
                src={testimonial.avatar}
                alt={`${testimonial.name} avatar`}
                width={48}
                height={48}
                className="rounded-full"
            />
            <div className="ml-3">
                <h3 className="text-base font-semibold text-foreground">{testimonial.name}</h3>
                <p className="text-sm text-foreground-accent">{testimonial.role}</p>
            </div>
        </div>
        <p className="text-foreground-accent text-sm leading-relaxed">&quot;{testimonial.message}&quot;</p>
    </div>
);

const Testimonials: React.FC = () => {
    // Duplicate items for seamless infinite scroll
    const items = [...testimonials, ...testimonials];

    return (
        <div className="relative overflow-hidden">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            {/* Marquee track */}
            <div className="flex animate-marquee hover:[animation-play-state:paused]">
                {items.map((testimonial, index) => (
                    <TestimonialCard key={index} testimonial={testimonial} />
                ))}
            </div>
        </div>
    );
};

export default Testimonials;
