import Link from 'next/link'
import React from 'react'

const NotFound = () => {
    return (

        <main className="min-h-screen bg-[#f8f5ef] flex items-center justify-center px-6">
            <div className="max-w-2xl text-center">
                <p className="text-sm uppercase tracking-[0.35em] text-[#c49b47] mb-4">
                    404 Error
                </p>

                <h1 className="text-4xl md:text-6xl font-serif text-[#1a1a1a] leading-tight">
                    This page seems to have moved beyond the map
                </h1>

                <p className="mt-5 text-base md:text-lg text-[#5c5c5c] leading-8 max-w-xl mx-auto">
                    The page you are looking for could not be found. It may have been
                    removed, renamed, or the link may be incorrect.
                </p>

                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center rounded-md bg-[#c49b47] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
                    >
                        Return Home
                    </Link>

                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center rounded-md border border-[#1a1a1a]/15 px-6 py-3 text-sm font-medium text-[#1a1a1a] transition hover:bg-white/70"
                    >
                        Contact Us
                    </Link>
                </div>
            </div>
        </main>

    )
}

export default NotFound