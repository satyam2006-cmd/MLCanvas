"use client";

export default function TrustSignals() {
    return (
        <section className="py-20 bg-gray-50 border-y border-gray-100/50">
            <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
                <blockquote className="text-xl md:text-2xl font-light text-black/80 italic leading-relaxed">
                    &ldquo;ML Canvas is a personal learning playground—open, simple, and honest.
                    Designed to make machine learning intuitive, not intimidating.&rdquo;
                </blockquote>
                <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-1 bg-black/5 rounded-full" />
                    <p className="text-sm font-medium text-gray-400 uppercase tracking-widest">
                        Built for Learners
                    </p>
                </div>
            </div>
        </section>
    );
}
