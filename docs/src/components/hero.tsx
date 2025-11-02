'use client'

import { motion as m } from 'motion/react'

export const Hero = () => (
  <section className="absolute fixed top-0 left-0 h-full w-full flex flex-col items-center justify-end overflow-hidden">
    <div className="z-20 flex w-full max-w-4xl flex-col items-center justify-center gap-8 px-4 py-16 text-center">
      <m.div
        animate={{
          filter: 'blur(0)',
          opacity: 1,
          transform: 'translateY(0)',
        }}
        className="h-1.5 w-1.5 animate-ping rounded-full bg-white"
        initial={{
          filter: 'blur(10px)',
          opacity: 0,
          transform: 'translateY(-20px)',
        }}
        transition={{
          delay: 0,
          duration: 0.5,
          ease: 'easeOut',
        }}
      />

      {/* <m.div
        animate={{
          filter: 'blur(0)',
          opacity: 1,
          transform: 'translateY(0)',
        }}
        className="flex items-center rounded-md border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-md"
        initial={{
          filter: 'blur(10px)',
          opacity: 0,
          transform: 'translateY(15px)',
        }}
        transition={{
          delay: 0.3,
          duration: 0.5,
          ease: 'easeOut',
        }}
      >
        Introducing Std
      </m.div> */}

      <m.h1
        animate={{
          filter: 'blur(0)',
          opacity: 1,
          transform: 'translateY(0)',
        }}
        className="text-3xl text-black dark:text-white md:text-4xl lg:text-5xl"
        initial={{
          filter: 'blur(10px)',
          opacity: 0,
          transform: 'translateY(15px)',
        }}
        transition={{
          delay: 0.6,
          duration: 0.5,
          ease: 'easeOut',
        }}
      >
        <span className="font-bold italic">Standard</span>
        {' '}
        of
        {' '}
        Moeru
        {' '}
        AI
      </m.h1>
    </div>

    {/* Pattern overlay */}
    <div className="absolute top-1/5 left-1/2 aspect-square w-[200%] -translate-x-1/2 rounded-full bg-teal-200 dark:bg-teal-950 blur-[200px] md:top-1/3" />

    <div className="absolute top-1/5 left-1/2 aspect-square w-[200%] -translate-x-1/2 overflow-hidden rounded-full mask-[radial-gradient(circle,_white_10%,_transparent_73%)] md:top-1/3">
      <svg
        aria-hidden="true"
        className="inset-0 z-10 size-full stroke-white/20 stroke-2"
      >
        <defs>
          <pattern
            height={200}
            id="grid-pattern"
            patternUnits="userSpaceOnUse"
            width={15}
            x="50%"
            y={-1}
          >
            <path d="M.5 200V.5" fill="none" />
          </pattern>
        </defs>
        <rect
          fill="url(#grid-pattern)"
          height="100%"
          strokeWidth={0}
          width="100%"
        />
      </svg>
    </div>
  </section>
)
