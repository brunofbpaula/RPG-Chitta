import logo from '@/assets/icons/samurai.png';
import { Link, useLocation } from 'react-router-dom';
import classnames from 'classnames';

const NavBar = () => {

  const location = useLocation();
  const currentPath = location.pathname

  const links = [
    {label: 'Lore', href: '/lore'},
    {label: 'Personagens',href: '/players'},
    {label: 'Login', href:'/login'}
  ]

  return (
    <nav className='flex space-x-12 mb-5 px-10 h-18 items-center text-white'>
        <Link to={"/"}><img src={logo} alt="logo" className='h-10 w-10' /></Link>
        <ul className='flex space-x-7'>
          {links.map((link) => (
            <li><Link key={link.href} to={link.href}
            className={
              classnames({
                'text-red-800': link.href === currentPath,
                'text-zinc-50': link.href !== currentPath,
                'hover:text-zinc-500 transition-colors': true
              })
            }
            >{link.label}</Link></li>
          ))}
        </ul>
    </nav>
  )
}

export default NavBar