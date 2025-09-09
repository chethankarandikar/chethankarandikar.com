'use client'
import { motion } from 'motion/react'
import { XIcon } from 'lucide-react'
import { Spotlight } from '@/components/ui/spotlight'
import { Magnetic } from '@/components/ui/magnetic'
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogClose,
  MorphingDialogContainer,
} from '@/components/ui/morphing-dialog'
import Link from 'next/link'
import Image from 'next/image'
import { AnimatedBackground } from '@/components/ui/animated-background'
import {
  PROJECTS,
  PHOTOS,
  SOCIAL_LINKS,
} from './data'

const VARIANTS_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const VARIANTS_SECTION = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

const TRANSITION_SECTION = {
  duration: 0.3,
}

type ProjectVideoProps = {
  project: {
    thumbnail?: string
    youtube?: string
    name: string
  }
}

function ProjectVideo({ project }: ProjectVideoProps) {
  if (project.youtube) {
    return (
      <MorphingDialog
        transition={{
          type: 'spring',
          bounce: 0,
          duration: 0.15,
        }}
      >
        <MorphingDialogTrigger className="block w-full">
          <div className="aspect-video w-full cursor-pointer rounded-xl overflow-hidden relative">
            {project.thumbnail && (
              <Image
                src={project.thumbnail}
                alt={project.name}
                className="w-full h-full object-cover"
                priority={true}
                width={400}
                height={225}
                quality={85}
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            )}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-150 ease-out flex items-center justify-center rounded-xl will-change-transform">
              <div className="opacity-0 group-hover:opacity-100 bg-white/90 text-black px-3 py-2 rounded-lg text-sm font-medium backdrop-blur-sm transform scale-95 group-hover:scale-100 transition-all duration-150 ease-out will-change-transform" style={{transform: 'translate3d(0,0,0)'}}>
                See more
              </div>
            </div>
          </div>
        </MorphingDialogTrigger>
        <MorphingDialogContainer>
          <MorphingDialogContent className="relative rounded-2xl bg-zinc-50 p-4 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950 dark:ring-zinc-800/50 max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                  {project.name}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4">
                  {project.description}
                </p>
              </div>
              <iframe
                src={`https://www.youtube.com/embed/${project.youtube}`}
                className="aspect-video w-full rounded-xl"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              {project.note && (
                <p className="text-sm text-zinc-600 dark:text-zinc-400 italic mt-2">
                  {project.note}
                </p>
              )}
              {project.images && project.images.length > 0 && (
                <div className="grid grid-cols-3 gap-4">
                  {project.images.map((image, index) => (
                    <div key={index} className="space-y-2">
                      <Image
                        src={image.src}
                        alt={image.caption}
                        className="w-full aspect-video object-cover rounded-lg"
                        width={400}
                        height={225}
                        quality={85}
                        sizes="33vw"
                      />
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 text-center">
                        {image.caption}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div> 
          </MorphingDialogContent>
          <MorphingDialogClose
            className="fixed top-6 right-6 h-fit w-fit rounded-full bg-white p-1"
            variants={{
              initial: { opacity: 0 },
              animate: {
                opacity: 1,
                transition: { delay: 0.3, duration: 0.1 },
              },
              exit: { opacity: 0, transition: { duration: 0 } },
            }}
          >
            <XIcon className="h-5 w-5 text-zinc-500" />
          </MorphingDialogClose>
        </MorphingDialogContainer>
      </MorphingDialog>
    )
  }

  return (
    <div className="aspect-video w-full rounded-xl overflow-hidden">
      {project.thumbnail && (
        <img
          src={project.thumbnail}
          alt={project.name}
          className="w-full h-full object-cover"
        />
      )}
    </div>
  )
}

function MagneticSocialLink({
  children,
  link,
}: {
  children: React.ReactNode
  link: string
}) {
  return (
    <Magnetic springOptions={{ bounce: 0 }} intensity={0.3}>
      <a
        href={link}
        className="group relative inline-flex shrink-0 items-center gap-[1px] rounded-full bg-zinc-100 px-2.5 py-1 text-sm text-black transition-colors duration-200 hover:bg-zinc-950 hover:text-zinc-50 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
      >
        {children}
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
        >
          <path
            d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
      </a>
    </Magnetic>
  )
}

export default function Personal() {
  return (
    <motion.main
      className="space-y-24"
      variants={VARIANTS_CONTAINER}
      initial="hidden"
      animate="visible"
    >
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <div className="flex-1">
          <p className="text-zinc-600 dark:text-zinc-400">
            I'm a computer engineering student interested in building systems that will make humans a spacefaring species.
          </p>
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-5 text-lg font-medium">Projects</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {PROJECTS.filter(project => project.id !== 'project3').map((project) => (
            <div key={project.name} className="space-y-2 group cursor-pointer">
              <div className="relative rounded-2xl overflow-hidden">
                <ProjectVideo project={project} />
              </div>
              <div className="px-1">
                {project.link ? (
                  <a
                    className="font-base group relative inline-block font-[450] text-zinc-900 dark:text-zinc-50"
                    href={project.link}
                    target="_blank"
                  >
                    {project.name}
                    <span className="absolute bottom-0.5 left-0 block h-[1px] w-full max-w-0 bg-zinc-900 dark:bg-zinc-50 transition-all duration-200 group-hover:max-w-full"></span>
                  </a>
                ) : (
                  <h4 className="font-base font-[450] text-zinc-900 dark:text-zinc-50 group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-colors duration-200">
                    {project.name}
                  </h4>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-5 text-lg font-medium">Photos</h3>
        {/* Aggressive preloading for instant modal opening */}
        <div style={{ position: 'absolute', top: '-9999px', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}>
          {PHOTOS.map((photo) => (
            <img
              key={`preload-${photo.id}`}
              src={photo.url}
              alt=""
              width="1"
              height="1"
              loading="eager"
              decoding="sync"
              fetchPriority="high"
              style={{ display: 'block' }}
            />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {PHOTOS.map((photo, index) => (
            <MorphingDialog
              key={photo.id}
              transition={{
                type: 'spring',
                bounce: 0,
                duration: 0.15,
              }}
            >
              <MorphingDialogTrigger>
                <div className="aspect-square w-full cursor-zoom-in rounded-xl overflow-hidden">
                  <Image
                    src={photo.url}
                    alt={photo.location}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-200 ease-out will-change-transform"
                    priority={index < 4}
                    width={300}
                    height={300}
                    quality={85}
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                  />
                </div>
              </MorphingDialogTrigger>
              <MorphingDialogContainer>
                <MorphingDialogContent className="relative flex flex-col items-center max-w-fit max-h-[90vh] overflow-auto bg-transparent border-0 shadow-none p-0">
                  <div className="relative">
                    <Image
                      src={photo.url}
                      alt={photo.location}
                      className="rounded-xl"
                      width={0}
                      height={0}
                      quality={100}
                      sizes="100vw"
                      style={{ width: 'auto', height: 'auto', maxWidth: '90vw', maxHeight: '70vh' }}
                      priority={index < 8}
                      unoptimized={false}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent rounded-b-xl">
                      <div className="p-4 text-white">
                        <h4 className="font-medium text-lg">
                          {photo.location}
                        </h4>
                        <p className="text-sm opacity-90">
                          {photo.date}
                        </p>
                      </div>
                    </div>
                  </div>
                </MorphingDialogContent>
                <MorphingDialogClose
                  className="fixed top-6 right-6 h-fit w-fit rounded-full bg-white p-1"
                  variants={{
                    initial: { opacity: 0 },
                    animate: {
                      opacity: 1,
                      transition: { delay: 0.3, duration: 0.1 },
                    },
                    exit: { opacity: 0, transition: { duration: 0 } },
                  }}
                >
                  <XIcon className="h-5 w-5 text-zinc-500" />
                </MorphingDialogClose>
              </MorphingDialogContainer>
            </MorphingDialog>
          ))}
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <div className="flex items-center justify-start space-x-3">
          {SOCIAL_LINKS.map((link) => (
            <MagneticSocialLink key={link.label} link={link.link}>
              {link.label}
            </MagneticSocialLink>
          ))}
        </div>
      </motion.section>
    </motion.main>
  )
}
