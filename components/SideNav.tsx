import React from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';

const items = [
  {
    title: 'Get started',
    links: [{href: '/docs', children: 'Overview'}],    
  },
  {
    title: 'Roots',
    links: [
      { href: '/sage', children: 'Sage' },
      { href: '/acorn', children: 'Acorn' },
      { href: '/trellis', children: 'Trellis' },
      { href: '/vagrant', children: 'Vagrant' },
      { href: '/valet', children: 'Valet' },
    ],    
  },
  {
    title: 'GIT',
    links: [
      { href: '/git', children: 'Git' },
      { href: '/bitbucket', children: 'Bitbucket' },
      { href: '/github', children: 'Github' },
      { href: '/ci-cd', children: 'CI/CD' },
    ],    
  },
  {
    title: 'Hosting',
    links: [
      { href: '/aws', children: 'AWS' },
      { href: '/digital-ocean', children: 'Digital Ocean' },
      { href: '/kinsta', children: 'Kinsta' },
      { href: '/server', children: 'Server' },
    ],    
  },
  {
    title: 'Desarrollo',
    links: [
      { href: '/osx', children: 'OSX' },
      { href: '/composer', children: 'Composer' },
      { href: '/command-line', children: 'Línea de comandos' },
      { href: '/performance', children: 'Rendimiento' },
      { href: '/staging', children: 'Servidor Staging' },
    ],    
  },
  {
    title: 'WordPress',
    links: [
      { href: '/wp-cli', children: 'WP-CLI' },      
    ],    
  },
  {
    title: 'Procesos',
    links: [
      { href: '/migration-backup', children: 'Backup migración' },      
      { href: '/new-project', children: 'Nuevo proyecto' },      
      { href: '/email', children: 'Correo' },      
    ],    
  },
];

export function SideNav() {
  const router = useRouter();

  return (
    <nav className="sidenav">
      {items.map((item) => (
        <div key={item.title}>
          <span>{item.title}</span>
          <ul className="flex column">
            {item.links.map((link) => {
              const active = router.pathname === link.href;
              return (
                <li key={link.href} className={active ? 'active' : ''}>
                  <Link {...link} legacyBehavior>
                    <a href={link.href}>{link.children}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
      <style jsx>
        {`
          nav {
            position: sticky;
            top: var(--top-nav-height);
            height: calc(100vh - var(--top-nav-height));
            flex: 0 0 auto;
            overflow-y: auto;
            padding: 2.5rem 2rem 2rem;
            border-right: 1px solid var(--border-color);
          }
          span {
            font-size: larger;
            font-weight: 500;
            padding: 0.5rem 0 0.5rem;
          }
          ul {
            padding: 0;
          }
          li {
            list-style: none;
            margin: 0;
          }
          li a {
            text-decoration: none;
          }
          li a:hover,
          li.active > a {
            text-decoration: underline;
          }
        `}
      </style>
    </nav>
  );
}
