import { Github, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className='mt-auto flex items-center justify-center gap-2 pt-8 pb-4 text-sm text-secondary'>
      <span>Made by Zak</span>
      <span>·</span>
      <a
        href='https://github.com/zekooo0'
        target='_blank'
        rel='noreferrer'
        className='hover:text-accent transition-colors'
        aria-label='GitHub'
      >
        <Github className='w-4 h-4' />
      </a>
      <a
        href='https://www.linkedin.com/in/zekooo0'
        target='_blank'
        rel='noreferrer'
        className='hover:text-accent transition-colors'
        aria-label='LinkedIn'
      >
        <Linkedin className='w-4 h-4' />
      </a>
    </footer>
  );
}
